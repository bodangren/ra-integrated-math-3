import { internalQuery, type QueryCtx } from "./_generated/server";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";
import { aggregateCardsToEvidence } from "../lib/practice/srs-proficiency";
import {
  computeObjectiveProficiency,
  type ObjectivePriority,
} from "../lib/practice/objective-proficiency";
import type {
  SrsCardState as ProficiencyCardState,
  TimingBaselines,
} from "../lib/practice/srs-proficiency";

export async function getObjectiveProficiencyHandler(
  ctx: QueryCtx,
  args: { studentId: string; objectiveId?: string }
) {
  // 1. Fetch all cards for the student
  const cards = await ctx.db
    .query("srs_cards")
    .withIndex("by_student", (q) =>
      q.eq("studentId", args.studentId as Id<"profiles">)
    )
    .collect();

  // 2. Filter by objective's problem families if objectiveId provided
  let filteredCards = cards;
  if (args.objectiveId) {
    const families = await ctx.db
      .query("problem_families")
      .withIndex("by_objectiveId", (q) =>
        q.eq("objectiveIds", args.objectiveId! as unknown as string[])
      )
      .collect();
    const familyIds = new Set(families.map((f) => f.problemFamilyId));
    filteredCards = cards.filter((c) => familyIds.has(c.problemFamilyId));
  }

  // 3. Fetch review logs for the student's cards
  const cardDocIds = new Set(filteredCards.map((c) => c._id));
  const allReviews = await ctx.db
    .query("srs_review_log")
    .withIndex("by_student", (q) =>
      q.eq("studentId", args.studentId as Id<"profiles">)
    )
    .collect();
  const relevantReviews = allReviews.filter((r) => cardDocIds.has(r.cardId));

  // 4. Fetch submission timings for review logs
  const uniqueActivityIds = new Set<string>();
  for (const review of relevantReviews) {
    if (review.submissionId) {
      const lastDash = review.submissionId.lastIndexOf("-");
      if (lastDash > 0) {
        uniqueActivityIds.add(review.submissionId.slice(0, lastDash));
      }
    }
  }

  const submissionTimings = new Map<string, number>();
  for (const activityId of uniqueActivityIds) {
    const submissions = await ctx.db
      .query("activity_submissions")
      .withIndex("by_user_and_activity", (q) =>
        q
          .eq("userId", args.studentId as Id<"profiles">)
          .eq("activityId", activityId as Id<"activities">)
      )
      .collect();
    for (const sub of submissions) {
      const submissionData = sub.submissionData as
        | {
            attemptNumber?: number;
            timing?: { activeMs?: number };
          }
        | undefined;
      const attemptNumber = submissionData?.attemptNumber ?? 1;
      const sid = `${activityId}-${attemptNumber}`;
      const activeMs = submissionData?.timing?.activeMs;
      if (activeMs !== undefined) {
        submissionTimings.set(sid, activeMs);
      }
    }
  }

  // 5. Fetch timing baselines for problem families
  const baselines: TimingBaselines = {};
  const familyIds = new Set(filteredCards.map((c) => c.problemFamilyId));
  for (const pfId of familyIds) {
    const baseline = await ctx.db
      .query("timing_baselines")
      .withIndex("by_problem_family", (q) =>
        q.eq("problemFamilyId", pfId)
      )
      .first();
    if (baseline) {
      baselines[pfId] = {
        problemFamilyId: baseline.problemFamilyId,
        sampleCount: baseline.sampleCount,
        medianActiveMs: baseline.medianActiveMs,
        p25ActiveMs: baseline.p25ActiveMs,
        p75ActiveMs: baseline.p75ActiveMs,
        p90ActiveMs: baseline.p90ActiveMs,
        lastComputedAt: baseline.lastComputedAt,
        minSamplesMet: baseline.minSamplesMet,
      };
    }
  }

  // 6. Build card states for aggregation
  const cardStates: ProficiencyCardState[] = [];
  for (const card of filteredCards) {
    const cardReviews = relevantReviews.filter((r) => r.cardId === card._id);
    if (cardReviews.length === 0) {
      cardStates.push({
        stability: card.stability,
        difficulty: card.difficulty,
        reps: card.reps,
        lapses: card.lapses,
        problemFamilyId: card.problemFamilyId,
      });
    } else {
      for (const review of cardReviews) {
        const reviewDurationMs = review.submissionId
          ? submissionTimings.get(review.submissionId)
          : undefined;
        cardStates.push({
          stability: card.stability,
          difficulty: card.difficulty,
          reps: card.reps,
          lapses: card.lapses,
          problemFamilyId: card.problemFamilyId,
          lastReviewMs: review.reviewedAt,
          reviewDurationMs,
        });
      }
    }
  }

  // 7. Determine priority
  let priority: ObjectivePriority = "essential";
  if (args.objectiveId) {
    const standard = await ctx.db
      .query("competency_standards")
      .withIndex("by_code", (q) => q.eq("code", args.objectiveId!))
      .first();
    if (standard) {
      const policy = await ctx.db
        .query("objective_policies")
        .withIndex("by_standardId", (q) => q.eq("standardId", standard._id))
        .first();
      if (policy) {
        priority = policy.policy as ObjectivePriority;
      }
    }
  }

  // 8. Aggregate and compute
  const evidence = aggregateCardsToEvidence(cardStates, baselines);
  return computeObjectiveProficiency({
    objectiveId: args.objectiveId ?? "",
    priority,
    problemFamilyEvidences: evidence,
  });
}

export const getObjectiveProficiency = internalQuery({
  args: {
    studentId: v.string(),
    objectiveId: v.optional(v.string()),
  },
  handler: getObjectiveProficiencyHandler,
});

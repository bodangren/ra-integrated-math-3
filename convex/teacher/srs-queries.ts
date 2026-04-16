import { internalQuery, type QueryCtx } from "../_generated/server";
import { v } from "convex/values";
import { Id, type Doc } from "../_generated/dataModel";

async function getAuthorizedTeacher(
  ctx: QueryCtx,
  userId: Id<"profiles">,
): Promise<Doc<"profiles"> | null> {
  const teacher = await ctx.db.get(userId);
  if (!teacher || (teacher.role !== "teacher" && teacher.role !== "admin")) {
    return null;
  }
  return teacher;
}

export const getClassSrsHealth = internalQuery({
  args: {
    userId: v.id("profiles"),
    classId: v.id("classes"),
  },
  handler: async (ctx, args) => {
    const teacher = await getAuthorizedTeacher(ctx, args.userId);
    if (!teacher) {
      return null;
    }

    const classDoc = await ctx.db.get(args.classId);
    if (!classDoc) {
      return null;
    }

    if (classDoc.teacherId !== teacher._id) {
      return null;
    }

    const enrollments = await ctx.db
      .query("class_enrollments")
      .withIndex("by_class", (q) => q.eq("classId", args.classId))
      .collect();

    const activeStudents = enrollments.filter((e) => e.status === "active");

    const now = Date.now();
    const todayStart = new Date(now);
    todayStart.setUTCHours(0, 0, 0, 0);
    const todayStartMs = todayStart.getTime();

    let totalActiveStudents = 0;
    let practicedToday = 0;
    let totalRetention = 0;
    let cardCount = 0;

    for (const studentId of activeStudents.map((e) => e.studentId)) {
      const cards = await ctx.db
        .query("srs_cards")
        .withIndex("by_student", (q) => q.eq("studentId", studentId))
        .collect();

      if (cards.length > 0) {
        totalActiveStudents++;
        for (const card of cards) {
          totalRetention += card.stability;
          cardCount++;
        }
      }

      const sessions = await ctx.db
        .query("srs_sessions")
        .withIndex("by_student", (q) => q.eq("studentId", studentId))
        .collect();

      const completedToday = sessions.some(
        (s) => s.completedAt && s.completedAt >= todayStartMs
      );
      if (completedToday) {
        practicedToday++;
      }
    }

    const avgRetention = cardCount > 0 ? totalRetention / cardCount : 0;

    return {
      totalActiveStudents,
      practicedToday,
      avgRetention,
      totalCards: cardCount,
    };
  },
});

export const getOverdueLoad = internalQuery({
  args: {
    userId: v.id("profiles"),
    classId: v.id("classes"),
  },
  handler: async (ctx, args) => {
    const teacher = await getAuthorizedTeacher(ctx, args.userId);
    if (!teacher) {
      return null;
    }

    const classDoc = await ctx.db.get(args.classId);
    if (!classDoc) {
      return null;
    }

    if (classDoc.teacherId !== teacher._id) {
      return null;
    }

    const enrollments = await ctx.db
      .query("class_enrollments")
      .withIndex("by_class", (q) => q.eq("classId", args.classId))
      .collect();

    const activeStudents = enrollments.filter((e) => e.status === "active");

    const now = new Date().toISOString();

    const perStudent: Array<{ studentId: string; overdueCount: number }> = [];
    let totalOverdue = 0;

    for (const enrollment of activeStudents) {
      const cards = await ctx.db
        .query("srs_cards")
        .withIndex("by_student", (q) => q.eq("studentId", enrollment.studentId))
        .collect();

      const overdueCards = cards.filter((c) => c.dueDate < now);
      const overdueCount = overdueCards.length;
      totalOverdue += overdueCount;
      perStudent.push({ studentId: enrollment.studentId, overdueCount });
    }

    return {
      totalOverdue,
      perStudent,
    };
  },
});

export const getPracticeStreaks = internalQuery({
  args: {
    userId: v.id("profiles"),
    classId: v.id("classes"),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const teacher = await getAuthorizedTeacher(ctx, args.userId);
    if (!teacher) {
      return [];
    }

    const classDoc = await ctx.db.get(args.classId);
    if (!classDoc) {
      return [];
    }

    if (classDoc.teacherId !== teacher._id) {
      return [];
    }

    const limit = args.limit ?? 5;

    const enrollments = await ctx.db
      .query("class_enrollments")
      .withIndex("by_class", (q) => q.eq("classId", args.classId))
      .collect();

    const activeStudents = enrollments.filter((e) => e.status === "active");

    const now = Date.now();
    const todayStart = new Date(now);
    todayStart.setUTCHours(0, 0, 0, 0);
    const todayMs = todayStart.getTime();
    const yesterdayMs = todayMs - 24 * 60 * 60 * 1000;

    const studentStreaks: Array<{
      studentId: string;
      displayName: string;
      streak: number;
    }> = [];

    for (const enrollment of activeStudents) {
      const profile = await ctx.db.get("profiles", enrollment.studentId);
      if (!profile) continue;

      const sessions = await ctx.db
        .query("srs_sessions")
        .withIndex("by_student", (q) => q.eq("studentId", enrollment.studentId))
        .collect();

      const completedSessions = sessions.filter((s) => s.completedAt !== undefined);

      if (completedSessions.length === 0) continue;

      const uniqueDays = Array.from(
        new Set(
          completedSessions.map((s) => {
            const d = new Date(s.completedAt!);
            return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
          })
        )
      ).sort((a, b) => b - a);

      const mostRecent = uniqueDays[0];
      let streak = 0;

      if (mostRecent === todayMs || mostRecent === yesterdayMs) {
        streak = 1;
        let checkDay = mostRecent;
        for (let i = 1; i < uniqueDays.length; i++) {
          const expected = checkDay - 24 * 60 * 60 * 1000;
          if (uniqueDays[i] === expected) {
            streak++;
            checkDay = uniqueDays[i];
          } else if (uniqueDays[i] < expected) {
            break;
          }
        }
      }

      if (streak > 0) {
        studentStreaks.push({
          studentId: enrollment.studentId,
          displayName: profile.displayName ?? profile.username,
          streak,
        });
      }
    }

    studentStreaks.sort((a, b) => b.streak - a.streak);
    return studentStreaks.slice(0, limit);
  },
});
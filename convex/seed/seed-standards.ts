import { internalMutation } from "../_generated/server";
import type { SeedCompetencyStandard } from "./types";

export const seedStandards = internalMutation({
  args: {},
  handler: async (ctx) => {
    const standards: SeedCompetencyStandard[] = [
      {
        code: "HSA-SSE.B.3",
        description: "Choosing and producing equivalent forms of expressions",
        studentFriendlyDescription: "I can rewrite expressions in different forms.",
        category: "Algebra",
        isActive: true,
      },
      {
        code: "HSA-REI.B.4",
        description: "Solving quadratic equations in one variable",
        studentFriendlyDescription: "I can solve quadratic equations.",
        category: "Algebra",
        isActive: true,
      },
      {
        code: "HSA-APR.B.3",
        description: "Identifying zeros of polynomials",
        studentFriendlyDescription: "I can find where polynomials equal zero.",
        category: "Algebra",
        isActive: true,
      },
      {
        code: "HSA-CED.A.1",
        description: "Creating equations in one variable",
        studentFriendlyDescription: "I can create equations to solve problems.",
        category: "Algebra",
        isActive: true,
      },
      {
        code: "N-CN.A.1",
        description: "Knowing the definition of complex numbers",
        studentFriendlyDescription: "I know what imaginary numbers are.",
        category: "Number",
        isActive: true,
      },
      {
        code: "N-CN.C.7",
        description: "Solving quadratics with complex solutions",
        studentFriendlyDescription: "I can solve equations with complex answers.",
        category: "Number",
        isActive: true,
      },
    ];

    const results: { code: string; id: string }[] = [];

    for (const standard of standards) {
      const existing = await ctx.db
        .query("competency_standards")
        .withIndex("by_code", (q) => q.eq("code", standard.code))
        .unique();

      if (existing) {
        results.push({ code: standard.code, id: existing._id });
      } else {
        const id = await ctx.db.insert("competency_standards", {
          code: standard.code,
          description: standard.description,
          studentFriendlyDescription: standard.studentFriendlyDescription,
          category: standard.category,
          isActive: standard.isActive,
          createdAt: Date.now(),
        });
        results.push({ code: standard.code, id });
      }
    }

    return results;
  },
});

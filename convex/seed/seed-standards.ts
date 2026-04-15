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
        code: "HSA-APR.A.1",
        description: "Adding, subtracting, and multiplying polynomials",
        studentFriendlyDescription: "I can add, subtract, and multiply polynomial expressions.",
        category: "Algebra",
        isActive: true,
      },
      {
        code: "HSA-APR.B.2",
        description: "Polynomial identities and the Binomial Theorem",
        studentFriendlyDescription: "I can use the Binomial Theorem to expand powers of binomials.",
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
      {
        code: "N-RN.A.1",
        description: "Understanding nth roots and rational exponents",
        studentFriendlyDescription: "I can convert between radical and exponential forms.",
        category: "Number",
        isActive: true,
      },
      {
        code: "N-RN.A.2",
        description: "Rewriting expressions involving radicals and rational exponents",
        studentFriendlyDescription: "I can simplify expressions with radicals and exponents.",
        category: "Number",
        isActive: true,
      },
      {
        code: "HSF-IF.B.4",
        description: "Interpreting key features of functions from graphs and tables",
        studentFriendlyDescription: "I can describe what a function graph tells us.",
        category: "Functions",
        isActive: true,
      },
      {
        code: "HSF-BF.A.1",
        description: "Building functions that describe relationships between quantities",
        studentFriendlyDescription: "I can write functions that model real situations.",
        category: "Functions",
        isActive: true,
      },
      {
        code: "HSF-BF.B.3",
        description: "Effects of transformations on function graphs",
        studentFriendlyDescription: "I can describe how changing a function changes its graph.",
        category: "Functions",
        isActive: true,
      },
      {
        code: "HSF-BF.B.4",
        description: "Finding inverse functions",
        studentFriendlyDescription: "I can find and verify inverse functions.",
        category: "Functions",
        isActive: true,
      },
      {
        code: "HSF-BF.B.5",
        description: "Understanding the inverse relationship between exponents and logarithms",
        studentFriendlyDescription: "I can use the relationship between exponents and logarithms to solve problems.",
        category: "Functions",
        isActive: true,
      },
      {
        code: "HSF-LE.A.4",
        description: "Expressing solutions to exponential models as logarithms",
        studentFriendlyDescription: "I can solve exponential equations using logarithms and technology.",
        category: "Functions",
        isActive: true,
      },
      {
        code: "HSF-IF.C.7e",
        description: "Graphing exponential and logarithmic functions, showing intercepts and end behavior",
        studentFriendlyDescription: "I can graph exponential and logarithmic functions and identify their key features.",
        category: "Functions",
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

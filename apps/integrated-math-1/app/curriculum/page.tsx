const units = [
  {
    number: 1,
    title: "Expressions",
    description: "Numerical and algebraic expressions, real number properties, and absolute value.",
    lessons: [
      "1-1 Numerical Expressions",
      "1-2 Algebraic Expressions",
      "1-3 Properties of Real Numbers",
      "1-4 Distributive Property",
      "1-5 Expressions Involving Absolute Value",
      "1-6 Descriptive Modeling and Accuracy",
    ],
  },
  {
    number: 2,
    title: "Equations in One Variable",
    description: "Writing, solving, and applying one-step, multi-step, and absolute value equations.",
    lessons: [
      "2-1 Writing and Interpreting Equations",
      "2-2 Solving One-Step Equations",
      "2-3 Solving Multi-Step Equations",
      "2-4 Solving Equations with the Variable on Each Side",
      "2-5 Solving Equations Involving Absolute Value",
      "2-6 Solving Proportions",
      "2-7 Using Formulas",
    ],
  },
  {
    number: 3,
    title: "Relations and Functions",
    description: "Relations, functions, graphs, intercepts, shapes, and function comparisons.",
    lessons: [
      "3-1 Representing Relations",
      "3-2 Functions",
      "3-3 Linearity and Continuity of Graphs",
      "3-4 Intercepts of Graphs",
      "3-5 Shapes of Graphs",
      "3-6 Sketching Graphs and Comparing Functions",
    ],
  },
  {
    number: 4,
    title: "Linear and Nonlinear Functions",
    description: "Graphing linear functions, slope, slope-intercept form, sequences, and piecewise functions.",
    lessons: [
      "4-1 Graphing Linear Functions",
      "4-2 Rate of Change and Slope",
      "4-3 Slope-Intercept Form",
      "4-4 Transformations of Linear Functions",
      "4-5 Arithmetic Sequences",
      "4-6 Piecewise and Step Functions",
      "4-7 Absolute Value Functions",
    ],
  },
  {
    number: 5,
    title: "Creating Linear Equations",
    description: "Writing linear equations, scatter plots, correlation, regression, and inverses.",
    lessons: [
      "5-1 Writing Equations in Slope-Intercept Form",
      "5-2 Writing Equations in Standard and Point-Slope Forms",
      "5-3 Scatter Plots and Lines of Fit",
      "5-4 Correlation and Causation",
      "5-5 Linear Regression",
      "5-6 Inverses of Linear Functions",
    ],
  },
  {
    number: 6,
    title: "Linear Inequalities",
    description: "Solving and graphing one-step, multi-step, compound, and absolute value inequalities.",
    lessons: [
      "6-1 Solving One-Step Inequalities",
      "6-2 Solving Multi-Step Inequalities",
      "6-3 Solving Compound Inequalities",
      "6-4 Solving Absolute Value Inequalities",
      "6-5 Graphing Inequalities in Two Variables",
    ],
  },
  {
    number: 7,
    title: "Systems of Linear Equations and Inequalities",
    description: "Solving systems by graphing, substitution, and elimination; systems of inequalities.",
    lessons: [
      "7-1 Graphing Systems of Equations",
      "7-2 Substitution",
      "7-3 Elimination Using Addition and Subtraction",
      "7-4 Elimination Using Multiplication",
      "7-5 Systems of Inequalities",
    ],
  },
  {
    number: 8,
    title: "Exponential Functions",
    description: "Exponential functions, transformations, writing expressions, geometric sequences, and recursive formulas.",
    lessons: [
      "8-1 Exponential Functions",
      "8-2 Transformations of Exponential Functions",
      "8-3 Writing Exponential Functions",
      "8-4 Transforming Exponential Expressions",
      "8-5 Geometric Sequences",
      "8-6 Recursive Formulas",
    ],
  },
  {
    number: 9,
    title: "Statistics",
    description: "Measures of center, data representation, distributions, comparing data, and normal distributions.",
    lessons: [
      "9-1 Measures of Center",
      "9-2 Representing Data",
      "9-3 Using Data",
      "9-4 Measures of Spread",
      "9-5 Distributions of Data",
      "9-6 Comparing Sets of Data",
      "9-7 Summarizing Categorical Data",
      "9-8 Normal Distributions",
    ],
  },
  {
    number: 10,
    title: "Tools of Geometry",
    description: "Points, lines, planes, segments, distance, coordinate plane, midpoints, and bisectors.",
    lessons: [
      "10-1 The Geometric System",
      "10-2 Points, Lines, and Planes",
      "10-3 Line Segments",
      "10-4 Distance",
      "10-5 Locating Points on a Number Line",
      "10-6 Locating Points on a Coordinate Plane",
      "10-7 Midpoints and Bisectors",
    ],
  },
  {
    number: 11,
    title: "Angles and Geometric Figures",
    description: "Angles, 2D and 3D figures, transformations in the plane, and measurement.",
    lessons: [
      "11-1 Angles and Congruence",
      "11-2 Angle Relationships",
      "11-3 Two-Dimensional Figures",
      "11-4 Transformations in the Plane",
      "11-5 Three-Dimensional Figures",
      "11-6 Two-Dimensional Representations of Three-Dimensional Figures",
      "11-7 Precision and Accuracy",
      "11-8 Representing Measurements",
    ],
  },
  {
    number: 12,
    title: "Logical Arguments and Line Relationships",
    description: "Conjectures, conditionals, deductive reasoning, proofs, parallel lines, and perpendiculars.",
    lessons: [
      "12-1 Conjectures and Counterexamples",
      "12-2 Statements, Conditionals, and Biconditionals",
      "12-3 Deductive Reasoning",
      "12-4 Writing Proofs",
      "12-5 Proving Segment Relationships",
      "12-6 Proving Angle Relationships",
      "12-7 Parallel Lines and Transversals",
      "12-8 Slope and Equations of Lines",
      "12-9 Proving Lines Parallel",
      "12-10 Perpendiculars and Distance",
    ],
  },
  {
    number: 13,
    title: "Transformations and Symmetry",
    description: "Reflections, translations, rotations, compositions, tessellations, and symmetry.",
    lessons: [
      "13-1 Reflections",
      "13-2 Translations",
      "13-3 Rotations",
      "13-4 Compositions of Transformations",
      "13-5 Tessellations",
      "13-6 Symmetry",
    ],
  },
  {
    number: 14,
    title: "Triangles and Congruence",
    description: "Triangle angles, congruence criteria, proofs, right triangles, and isosceles/equilateral properties.",
    lessons: [
      "14-1 Angles of Triangles",
      "14-2 Congruent Triangles",
      "14-3 Proving Triangles Congruent: SSS, SAS",
      "14-4 Proving Triangles Congruent: ASA, AAS",
      "14-5 Proving Right Triangles Congruent",
      "14-6 Isosceles and Equilateral Triangles",
      "14-7 Triangles and Coordinate Proofs",
    ],
  },
];

export default function CurriculumPage() {
  return (
    <div className="max-w-content mx-auto px-6 py-16">
      <div className="mb-12">
        <span className="section-label mb-4 inline-block">Curriculum</span>
        <h1
          className="text-primary-text mb-4 font-display"
          style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, lineHeight: 1.10, letterSpacing: '-1px' }}
        >
          Integrated Math 1 Curriculum
        </h1>
        <p className="text-secondary-text text-lg max-w-2xl">
          14 modules, 99 lessons covering algebra foundations, functions, statistics, and geometry.
        </p>
      </div>

      <div className="space-y-8">
        {units.map((unit) => (
          <div key={unit.number} className="card-surface p-6">
            <div className="flex items-center gap-3 mb-4">
              <span
                className="flex items-center justify-center w-8 h-8 rounded-md text-sm font-bold text-white shrink-0"
                style={{ backgroundColor: "#B14C00" }}
              >
                {unit.number}
              </span>
              <h2 className="text-primary-text font-display" style={{ fontSize: '20px', fontWeight: 600 }}>
                {unit.title}
              </h2>
              <span className="text-muted-text text-sm font-mono-num ml-auto">
                {unit.lessons.length} lessons
              </span>
            </div>
            <p className="text-secondary-text text-sm mb-4 leading-relaxed">
              {unit.description}
            </p>
            <div className="grid gap-1 sm:grid-cols-2 lg:grid-cols-3">
              {unit.lessons.map((lesson, i) => (
                <div
                  key={i}
                  className="text-sm text-muted-text py-1.5 px-2 rounded-md hover:bg-surface-light transition-colors"
                >
                  {lesson}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const units = [
  {
    number: 1,
    title: "Polynomial and Rational Functions",
    description: "Analyze rates of change across function types, polynomial structure, rational functions, and build function models from real-world contexts.",
    lessons: [
      "1.1 Change in Tandem",
      "1.2 Rates of Change",
      "1.3 Rates of Change in Linear and Quadratic Functions",
      "1.4 Polynomial Functions and Rates of Change",
      "1.5 Polynomial Functions and Complex Zeros",
      "1.6 Polynomial Functions and End Behavior",
      "1.7 Rational Functions and End Behavior",
      "1.8 Rational Functions and Zeros",
      "1.9 Rational Functions and Vertical Asymptotes",
      "1.10 Rational Functions and Holes",
      "1.11 Equivalent Representations of Polynomial and Rational Expressions",
      "1.12 Transformations of Functions",
      "1.13 Function Model Selection and Assumption Articulation",
      "1.14 Function Model Construction and Application",
    ],
  },
  {
    number: 2,
    title: "Exponential and Logarithmic Functions",
    description: "Distinguish linear vs exponential growth, work with logarithmic expressions, and model data with exponential and logarithmic functions.",
    lessons: [
      "2.1 Arithmetic vs. Geometric Sequences",
      "2.2 Linear vs. Exponential Change",
      "2.3 Exponential Functions",
      "2.4 Exponential Function Manipulation",
      "2.5 Exponential Modeling",
      "2.6 Model Validation",
      "2.7 Composition of Functions",
      "2.8 Inverse Functions",
      "2.9 Logarithmic Expressions",
      "2.10 Logarithmic Functions",
      "2.11 Logarithmic Properties",
      "2.12 Logarithmic Equations",
      "2.13 Exponential/Logarithmic Equations & Inequalities",
      "2.14 Logarithmic Modeling",
      "2.15 Semi-log Plots",
    ],
  },
  {
    number: 3,
    title: "Trigonometric and Polar Functions",
    description: "Understand periodic behavior, graph and transform sinusoidal functions, solve trigonometric equations, and explore polar coordinates.",
    lessons: [
      "3.1 Periodic Phenomena",
      "3.2 Basic Trigonometric Functions",
      "3.3 Trigonometric Functions and the Unit Circle",
      "3.4 Graphs of Trigonometric Functions",
      "3.5 Sinusoidal Transformations",
      "3.6 Sinusoidal Applications",
      "3.7 Sinusoidal Modeling",
      "3.8 Tangent Function",
      "3.9 Inverse Trigonometric Functions",
      "3.10 Trigonometric Equations and Inequalities",
      "3.11 Other Trigonometric Functions",
      "3.12 Equivalent Trigonometric Representations",
      "3.13 Polar Coordinates",
      "3.14 Polar Functions",
      "3.15 Polar Representations",
    ],
  },
  {
    number: 4,
    title: "Functions with Parameters, Vectors, and Matrices",
    description: "Represent motion with parametric equations, analyze conic sections, perform vector operations, and use matrices for transformations.",
    lessons: [
      "4.1 Parametric Functions",
      "4.2 Parametric Motion Modeling",
      "4.3 Rates of Change (Parametric)",
      "4.4 Parametric Circles and Lines",
      "4.5 Implicit Functions",
      "4.6 Conic Sections",
      "4.7 Parametrization",
      "4.8 Vectors",
      "4.9 Vector-Valued Functions",
      "4.10 Matrix Operations",
      "4.11 Matrix Transformations",
      "4.12 Matrices for Systems of Equations",
      "4.13 Matrix Applications",
      "4.14 Matrix Inverses",
    ],
  },
];

export default function CurriculumPage() {
  return (
    <div className="max-w-content mx-auto px-6 py-16">
      <div className="mb-12">
        <span className="section-label mb-4 inline-block">Curriculum</span>
        <h1
          className="text-primary-text mb-4"
          style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 510, lineHeight: 1.10, letterSpacing: '-1.5px' }}
        >
          AP Precalculus Curriculum
        </h1>
        <p className="text-secondary-text text-lg max-w-2xl">
          4 units, 58 lessons covering the complete AP Precalculus curriculum aligned with
          College Board standards.
        </p>
      </div>

      <div className="space-y-8">
        {units.map((unit) => (
          <div key={unit.number} className="card-surface p-6">
            <div className="flex items-center gap-3 mb-4">
              <span
                className="flex items-center justify-center w-8 h-8 rounded-standard text-sm font-semibold text-white shrink-0"
                style={{ backgroundColor: "#5e6ad2" }}
              >
                {unit.number}
              </span>
              <h2 className="text-primary-text" style={{ fontSize: '20px', fontWeight: 510 }}>
                {unit.title}
              </h2>
              <span className="text-muted-text text-sm font-mono ml-auto">
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
                  className="text-sm text-muted-text py-1.5 px-2 rounded-standard hover:bg-surface-light transition-colors"
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

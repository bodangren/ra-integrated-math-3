// @math-platform/activity-components
// Shared activity components for cross-app reuse (IM3, IM2, PreCalc)

export type { ActivityComponentProps, ActivityRegistration } from './types/index';
export { registerActivity, getActivityComponent, getRegisteredActivityKeys, clearActivityRegistry } from './registry/index';
export { SCHEMA_REGISTRY, getPropsSchema } from './schemas/index';
export type {
  ActivityComponentKey,
  ComprehensionQuizProps,
  QuestionType,
  FillInTheBlankProps,
  GraphingExplorerSchemaProps,
  StepByStepSolverProps,
  RateOfChangeCalculatorProps,
  DiscriminantAnalyzerProps,
  GraphingSubmissionInput,
  ProblemType,
  AlgebraicSubmissionInput,
  SourceType,
} from './schemas/index';

export interface CompletePhaseRequest {
  lessonId: string;
  phaseNumber: number;
  timeSpent: number;
  idempotencyKey: string;
  linkedStandardId?: string;
}

export interface CompletePhaseResponse {
  success: boolean;
  alreadyCompleted?: boolean;
  nextPhaseUnlocked?: boolean;
}

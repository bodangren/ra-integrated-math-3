'use client';

import { useState } from 'react';
import type { SubmissionEvidence, DeterministicErrorSummary } from '@/lib/practice/error-analysis';
import { ActivityRenderer } from '@/components/lesson/ActivityRenderer';

interface SubmissionReviewPanelProps {
  evidence: SubmissionEvidence | null;
  errorSummary: DeterministicErrorSummary | null;
  onOpenReview?: (evidence: SubmissionEvidence) => void;
  isOpen?: boolean;
}

export function SubmissionReviewPanel({
  evidence,
  errorSummary,
  onOpenReview,
  isOpen = false,
}: SubmissionReviewPanelProps) {
  const [expanded, setExpanded] = useState(isOpen);

  if (!evidence) {
    return null;
  }

  const handleReviewClick = () => {
    if (onOpenReview) {
      onOpenReview(evidence);
    }
    setExpanded(!expanded);
  };

  const renderScore = () => {
    if (evidence.score !== null && evidence.maxScore !== null) {
      return (
        <span className="font-mono-num text-sm">
          Score: {evidence.score}/{evidence.maxScore}
        </span>
      );
    }
    return null;
  };

  const renderStudentAnswers = () => {
    if (evidence.kind === 'practice' && evidence.submissionData) {
      const data = evidence.submissionData as {
        parts?: Array<{
          partId: string;
          rawAnswer: unknown;
          isCorrect?: boolean;
          hintsUsed?: number;
          misconceptionTags?: string[];
        }>;
      };
      if (data.parts) {
        return (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-foreground">Student Answers</h4>
            {data.parts.map((part, index) => (
              <div
                key={part.partId}
                className={[
                  'p-3 rounded-lg border',
                  part.isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50',
                ].join(' ')}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Part {index + 1}</span>
                  <div className="flex items-center gap-2">
                    {part.hintsUsed !== undefined && part.hintsUsed > 0 && (
                      <span className="text-xs text-muted-foreground">
                        Hints used: {part.hintsUsed}
                      </span>
                    )}
                    <span
                      className={[
                        'px-2 py-0.5 rounded text-xs font-medium',
                        part.isCorrect ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800',
                      ].join(' ')}
                    >
                      {part.isCorrect ? 'Correct' : 'Incorrect'}
                    </span>
                  </div>
                </div>
                <p className="text-sm mt-1 font-mono-num">
                  {String(part.rawAnswer)}
                </p>
                {part.misconceptionTags && part.misconceptionTags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {part.misconceptionTags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 bg-orange-100 text-orange-800 rounded text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        );
      }
    }
    return null;
  };

  const renderErrorSummary = () => {
    if (!errorSummary) return null;

    return (
      <div className="mt-4 p-4 bg-muted/50 rounded-lg space-y-3">
        <h4 className="text-sm font-semibold text-foreground">Error Analysis</h4>

        <div className="text-sm">
          <span className="text-muted-foreground">Class Average: </span>
          <span className="font-mono-num font-medium">
            {Math.round(errorSummary.averageAccuracy * 100)}% accuracy
          </span>
        </div>

        {errorSummary.topMisconceptions.length > 0 && (
          <div>
            <span className="text-sm text-muted-foreground">Top Misconceptions: </span>
            <div className="flex flex-wrap gap-1 mt-1">
              {errorSummary.topMisconceptions.slice(0, 5).map((m) => (
                <span
                  key={m.tag}
                  className="px-2 py-0.5 bg-orange-100 text-orange-800 rounded text-xs"
                  title={`Affects ${m.affectedStudents.length} students`}
                >
                  {m.tag} ({m.count})
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-2">
      <button
        onClick={handleReviewClick}
        className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
      >
        <span>Review</span>
        <svg
          className={`w-4 h-4 transition-transform ${expanded ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {expanded && (
        <div className="border rounded-lg p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-foreground">{evidence.activityTitle}</h3>
              <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                <span>Attempt {evidence.attemptNumber ?? 1}</span>
                {renderScore()}
                <span>
                  {new Date(evidence.submittedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h4 className="text-sm font-medium text-foreground mb-3">Correct Solution</h4>
            <ActivityRenderer
              componentKey={evidence.componentKey}
              activityId={evidence.activityId}
              mode="teaching"
            />
          </div>

          {renderStudentAnswers()}
          {renderErrorSummary()}
        </div>
      )}
    </div>
  );
}
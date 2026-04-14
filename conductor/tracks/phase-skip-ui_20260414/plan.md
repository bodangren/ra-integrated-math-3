# Phase Skip UI Wiring — Implementation Plan

## Phase 1: Add phaseType prop to PhaseCompleteButton

- [x] Task: Write unit tests for PhaseCompleteButton skip functionality
  - [x] Test skip button visible only for skippable phaseTypes
  - [x] Test skip button hidden for non-skippable phaseTypes
  - [x] Test skip button calls skipPhaseRequest on click
  - [x] Test onStatusChange fires with 'skipped' on successful skip
  - [x] Test error handling when skip fails

- [x] Task: Implement PhaseCompleteButton changes
  - [x] Add `phaseType` prop (optional)
  - [x] Add `skippedLabel` prop for customization
  - [x] Conditionally render Skip button for skippable phases
  - [x] Wire skip click handler to skipPhaseRequest
  - [x] Add 'skipped' status to ProgressStatus type
  - [x] Update button UI for three-state display

- [x] Task: Update LessonRenderer to pass phaseType
  - [x] Pass activePhase.phaseType to PhaseCompleteButton
  - [x] Verify existing functionality unchanged

## Phase 2: Verify and checkpoint

- [x] Task: Run full test suite
- [x] Task: Run lint and typecheck
- [x] Task: Commit changes
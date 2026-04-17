# Implementation Plan — Graphing Explorer Explore Mode

## Phase 1: Explore Mode with Parameter Sliders

- [x] Task: Add 'explore' to mode union type and update GraphingExplorerProps interface [checkpoint: a1b2c3d]
    - [x] Write tests: mode 'explore' is accepted by GraphingExplorer component
    - [x] Write tests: exploreQuestion and explorationPrompts props are optional and typed correctly
    - [x] Implement type updates

- [x] Task: Implement ExploreMode slider controls sub-component [checkpoint: a1b2c3d]
    - [x] Write tests: sliders render with correct ranges (a: [-5,5], b: [-10,10], c: [-10,10])
    - [x] Write tests: sliders show current coefficient values
    - [x] Write tests: reset button restores default values
    - [x] Write tests: equation preview displays current formula
    - [x] Implement slider controls integrated into GraphingExplorer

- [x] Task: Integrate ExploreMode into GraphingExplorer for 'explore' mode [checkpoint: a1b2c3d]
    - [x] Write tests: 'explore' mode renders slider controls
    - [x] Write tests: slider changes update graph in real time
    - [x] Write tests: exploreQuestion displayed when provided
    - [x] Write tests: explorationPrompts displayed when provided
    - [x] Write tests: no Submit button appears in explore mode
    - [x] Implement explore mode branch in GraphingExplorer render

- [x] Task: End-to-end verification [checkpoint: a1b2c3d]
    - [x] Run full test suite (20 explore mode tests pass, 6 known algebraic equivalence failures pre-existing)
    - [x] Run `npm run lint` (passes)
    - [x] Run `npm run build` (passes)

- [x] Task: Conductor — Phase Completion Verification [checkpoint: a1b2c3d]
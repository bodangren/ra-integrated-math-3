# Specification: Curriculum Content Authoring — AP Precalculus

## Overview

Author the complete curriculum content for AP Precalculus: 4 units, ~54 lessons. PreCalc has a curriculum overview with unit/lesson titles but no module directories or lesson content.

## Context

PreCalc covers Polynomial & Rational Functions, Exponential & Logarithmic Functions, Trigonometric & Polar Functions, and Functions with Parameters/Vectors/Matrices. Each lesson needs phase structure, section content, worked examples, and activity configurations.

## Functional Requirements

1. **Create module directories** under `apps/pre-calculus/curriculum/modules/` for all 4 units
2. **Create lesson directories** for all ~54 lessons with `lesson.md` files
3. **Author lesson content** following IM3's phase-based structure:
   - Explore, Vocabulary, Learn, Worked Example, Guided Practice, Independent Practice, Discourse, Reflection phases
   - Each phase has sections: text, callout, activity, video, image
4. **Configure activities** using shared activity component keys
5. **Write worked examples** with step-by-step solutions for each lesson
6. **Create module overview files** (`module.md`) for each unit
7. **Reference IM3's curriculum** as the template for structure and formatting

## Non-Functional Requirements

- Content must be pedagogically sound and aligned to AP Precalculus standards
- Each lesson must have at least 4 phases
- Worked examples must include distractors for step-by-step-solver activities
- Activity configurations must use valid component keys from the shared activity package
- Markdown content must follow IM3's formatting conventions

## Acceptance Criteria

- [ ] 4 module directories exist under `curriculum/modules/`
- [ ] ~54 lesson directories exist with `lesson.md` files
- [ ] Each lesson has a valid phase structure (minimum 4 phases)
- [ ] Each phase has appropriate section types
- [ ] Activities reference valid component keys
- [ ] Worked examples include step-by-step solutions
- [ ] Module overview files exist for all 4 units
- [ ] Content is pedagogically reviewed

## Out of Scope

- Seeding content into Convex database (Track 6)
- Standards mapping (Track 5)
- Problem family definitions (Track 7)
- Activity component implementation (Track 1)

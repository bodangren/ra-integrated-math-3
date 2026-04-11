# ALEKS Module Exports

Generated from `curriculum/ALEKS-practice-problems.htm` by rendering the ALEKS syllabus export and extracting visible module, lesson, and topic text.

Each listed topic now has a stable ALEKS practice ID:

- `ALEKS M1-L1-1.01`

The ID format is:

- `M#`: ALEKS module export file
- `L#-#`: ALEKS lesson group
- `.##`: topic number within that lesson group

These IDs are referenced from the audited `curriculum/module-*-class-period-plan.md` files. Each listed ALEKS topic should be treated as an SRS-tracked practice item with its own student proficiency state.

## Extraction Coverage Notes

The ALEKS export sometimes declares a higher total topic count than the visible topics extracted into these markdown files. The class-period plans map every listed ALEKS topic. Any declared-but-unlisted topics are documented source limitations in `curriculum/implementation/exceptions.json`; affected class periods use worked-example-derived SRS substitutes until a richer ALEKS export is available.

| Module Export | Declared Topics | Listed Topics | Status |
|---------------|----------------:|--------------:|--------|
| Module 1 | 59 | 59 | Complete |
| Module 2 | 23 | 13 | Documented source limitation |
| Module 3 | 30 | 4 | Documented source limitation |
| Module 4 | 92 | 88 | Documented source limitation |
| Module 5 | 59 | 43 | Documented source limitation |
| Module 6 | 29 | 21 | Documented source limitation |
| Module 7 | 86 | 82 | Documented source limitation |
| Module 8 | 31 | 31 | Complete |
| Module 9 | 45 | 31 | Documented source limitation |

Run `npm run curriculum:audit` to verify that ALEKS mismatches are either complete or explicitly documented.

- [Course Readiness](./course-readiness.md)
- [Module 1: Quadratic Functions](./module-1-quadratic-functions.md)
- [Module 2: Polynomials and Polynomial Functions](./module-2-polynomials-and-polynomial-functions.md)
- [Module 3: Polynomial Equations](./module-3-polynomial-equations.md)
- [Module 4: Inverse and Radical Functions](./module-4-inverse-and-radical-functions.md)
- [Module 5: Exponential Functions](./module-5-exponential-functions.md)
- [Module 6: Logarithmic Functions](./module-6-logarithmic-functions.md)
- [Module 7: Rational Functions](./module-7-rational-functions.md)
- [Module 8: Inferential Statistics](./module-8-inferential-statistics.md)
- [Module 9: Trigonometric Functions](./module-9-trigonometric-functions.md)

# CCSS Standards M6-M9 Reconciliation Notes

**Audit Date:** 2026-04-17
**Track:** ccss-standards-seeding-m6-m9_20260417

## Phase 1: Coverage Audit Results

### M6 Standard Codes (from module6LessonStandards)
| Standard Code | In seed-standards.ts? | Notes |
|--------------|----------------------|-------|
| HSF-BF.B.5 | YES | Lines 107-112 in seed-standards.ts |
| HSF-IF.C.7e | YES | Lines 121-126 in seed-standards.ts |
| HSF-LE.A.4 | YES | Lines 113-119 in seed-standards.ts |

### M7 Standard Codes (from module7LessonStandards)
| Standard Code | In seed-standards.ts? | Notes |
|--------------|----------------------|-------|
| HSA-APR.D.6 | YES | Lines 142-147 in seed-standards.ts |
| HSF-IF.C.7d | YES | Lines 149-154 in seed-standards.ts |
| HSF-LE.A.1 | YES | Lines 128-133 in seed-standards.ts |
| HSF-IF.C.7e | YES | Already verified above |
| HSA-REI.A.2 | YES | Lines 156-161 in seed-standards.ts |
| HSA-CED.A.1 | YES | Lines 44-49 in seed-standards.ts |

### M8 Standard Codes (from module8LessonStandards)
| Standard Code | In seed-standards.ts? | Notes |
|--------------|----------------------|-------|
| HSS-IC.A.1 | YES | Lines 191-196 in seed-standards.ts |
| HSS-IC.B.3 | YES | Lines 198-203 in seed-standards.ts |
| HSS-IC.B.5 | YES | Lines 212-217 in seed-standards.ts |
| HSS-IC.B.6 | YES | Lines 219-224 in seed-standards.ts |
| HSS-ID.A.1 | YES | Lines 163-168 in seed-standards.ts |
| HSS-ID.A.2 | YES | Lines 170-175 in seed-standards.ts |
| HSS-ID.B.6 | YES | Lines 184-189 in seed-standards.ts |
| HSS-ID.A.3 | YES | Lines 177-182 in seed-standards.ts |
| HSS-IC.B.4 | YES | Lines 205-210 in seed-standards.ts |

### M9 Standard Codes (from module9LessonStandards)
| Standard Code | In seed-standards.ts? | Notes |
|--------------|----------------------|-------|
| HSF-TF.A.1 | YES | Lines 226-231 in seed-standards.ts |
| HSF-TF.A.2 | YES | Lines 233-238 in seed-standards.ts |
| HSF-TF.A.4 | YES | Lines 240-245 in seed-standards.ts |
| HSF-TF.B.5 | YES | Lines 247-252 in seed-standards.ts |

## Seed.ts Wiring Verification

All four M6-M9 lesson-standard seed mutations are wired in seed.ts:
- `seedModule6LessonStandards` - Line 307
- `seedModule7LessonStandards` - Line 326
- `seedModule8LessonStandards` - Line 345
- `seedModule9LessonStandards` - Line 364

## Schema Index Verification

The `competency_standards` table has `by_code` index defined in schema.ts:136.

## Conclusion

**All M6-M9 standards ARE present in seed-standards.ts.** The lesson_standards linking mutations should work correctly.

No missing standards found. No description quality gaps detected (all have studentFriendlyDescription).

## Verdict

The "missing standards" concern was unfounded - all required standards for modules 6-9 are properly seeded. The lesson_standards linking should work correctly when `npx convex run seed` is executed.

**Recommendation:** Proceed to Phase 2 to verify the seeders actually work at runtime.
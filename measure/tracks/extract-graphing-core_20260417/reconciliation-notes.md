# Reconciliation Notes: extract-graphing-core_20260417

> Document created during Phase 2: Reconcile Deltas
> Date: 2026-04-18

## Summary

Phase 1 extracted IM3 graphing utilities into `packages/graphing-core`. Phase 2 reconciles with BM2 equivalents.

## BM2 Canonical Inputs Analyzed

| File | Location |
|------|----------|
| linear-parser.ts | `/Users/daniel.bodanske/Desktop/bus-math-v2/lib/activities/graphing/linear-parser.ts` |
| quadratic-parser.ts | `/Users/daniel.bodanske/Desktop/bus-math-v2/lib/activities/graphing/quadratic-parser.ts` |
| canvas-utils.ts | `/Users/daniel.bodanske/Desktop/bus-math-v2/lib/activities/graphing/canvas-utils.ts` |
| exploration-configs.ts | `/Users/daniel.bodanske/Desktop/bus-math-v2/lib/activities/graphing/exploration-configs.ts` |

## Delta Classification

### 1. linear-parser.ts — NO DELTA

**Package vs BM2**: IDENTICAL

The linear-parser implementation is byte-for-byte identical between the extracted package and BM2.

- `LinearCoefficients` interface: `{ m: number; b: number }` — same
- `parseLinear()` regex and logic — same

**Conclusion**: No reconciliation needed. Package version is canonical.

### 2. quadratic-parser.ts — NO DELTA

**Package vs BM2**: IDENTICAL

The quadratic-parser implementation is byte-for-byte identical between the extracted package and BM2.

- `QuadraticCoefficients` interface: `{ a: number; b: number; c: number }` — same
- `parseQuadratic()` regex and logic — same

**Conclusion**: No reconciliation needed. Package version is canonical.

### 3. canvas-utils.ts — FUNCTIONAL DELTA (Different Use Cases)

**Package vs BM2**: Different `generateFunctionPath` signatures and behavior

| Aspect | Package (graphing-core) | BM2 |
|--------|------------------------|-----|
| Return value | Data coordinates: `"x,y"` | Canvas coordinates: `"canvasX,canvasY"` |
| Parameters | `expression, domain, width` | `expression, domain, range, width, height` |
| Internals | Direct y calculation via `evaluateFunction` | Calls `transformDataToCanvas` for each point |
| Use case | SVG path generation (data space) | Canvas 2D rendering (screen space) |

**Key functions comparison**:
- `transformDataToCanvas`: IDENTICAL — both versions use same formula
- `transformCanvasToData`: IDENTICAL
- `snapToGridValue`: IDENTICAL
- `evaluateQuadratic`: IDENTICAL
- `evaluateLinear`: IDENTICAL
- `evaluateFunction`: IDENTICAL
- `generateFunctionPath`: **FUNCTIONAL DELTA**

**Conclusion**: These serve different use cases. Package provides SVG-oriented path generation (data coordinates). BM2 provides canvas-oriented path generation (screen coordinates). The package version is appropriate for SVG-based graphing components. BM2 would need its own canvas-oriented wrapper if adopted. No merge needed — different coordinate systems are appropriate for different rendering targets.

### 4. exploration-configs.ts — BM2 ONLY (Domain Config)

**BM2**: Contains business-domain exploration configurations:
- `CVP_CONFIG` — Cost-Volume-Profit Explorer (business math)
- `SUPPLY_DEMAND_CONFIG` — Supply & Demand Explorer (economics)
- `DEPRECIATION_CONFIG` — Depreciation Explorer (accounting)

**Classification**: DOMAIN CONFIG (explicitly out of scope per spec)

These configs are business-specific and must remain app-local. They are NOT utility primitives — they are lesson content configurations that use the generic graphing sliders interface.

**Conclusion**: Keep in BM2 app-local. Document that `ExplorationSlider` and `ExplorationConfig` interfaces in BM2 are for local config data only, not for package inclusion.

## App-Local Files to Retain

Per spec: "Keep business and lesson-specific exploration configs in apps."

| App | File | Reason |
|-----|------|--------|
| IM3 | `lib/activities/graphing/*.ts` | Phase 3 migration target — will import from package |
| BM2 | `lib/activities/graphing/exploration-configs.ts` | Business-domain config — stays local |

## Package Integration Boundary

```
packages/graphing-core/
├── linear-parser.ts     ← Generic linear equation parsing
├── quadratic-parser.ts  ← Generic quadratic equation parsing
└── canvas-utils.ts      ← Generic coordinate transforms, SVG path generation
                            (NOT canvas 2D path generation)

apps/
├── integrated-math-3/
│   └── lib/activities/graphing/
│       └── [components use package imports]     ← Phase 3
└── bus-math-v2/
    └── lib/activities/graphing/
        ├── exploration-configs.ts  ← Business domain, stays local
        └── [components import from package for primitives]
```

## Notes for BM2 Runtime Adoption Track

When `bm2-consume-runtime-packages_20260417` executes:

1. BM2 graphing components can import `parseLinear`, `parseQuadratic`, and canvas utility functions from `@math-platform/graphing-core` — these are identical to what BM2 currently has.

2. BM2 will likely need to retain its own `generateFunctionPathForCanvas()` variant that returns canvas coordinates. This can be implemented as a thin wrapper around package primitives or kept local if it depends on BM2-specific rendering assumptions.

3. The `ExplorationSlider` and `ExplorationConfig` interfaces in BM2's `exploration-configs.ts` are data shapes for lesson content, not shared utility types. Do NOT extract these interfaces to the package.

## Verification

- [x] Package parsers match BM2 parsers byte-for-byte
- [x] Package canvas-utils differ only in coordinate system approach (intentional)
- [x] BM2 exploration configs are domain-specific and should not be in package
- [x] Package has generic math/parser/geometry primitives only

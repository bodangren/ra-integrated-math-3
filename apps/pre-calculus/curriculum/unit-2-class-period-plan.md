# Unit 2 Class-Period Plan

This is the source-backed class-period plan for AP Precalculus Unit 2: Exponential and Logarithmic Functions.

## Planning Source Hierarchy

1. CED topic and competency identity from `source/college-board/ced-topic-index.json`.
2. CED clarification/guidance errata from `source/college-board/clarification-guidance.md`.
3. Passwater local instructional evidence from `source/passwater/unit-2.md`.

## Pacing Rationale

Unit 2 has 15 CED topics (2.1–2.15). The course budget allocates 41 instruction days per unit. Pacing is driven by Passwater content depth (notes pages and worksheet counts):

| Topic | Notes Pages | Worksheets | Instruction Days | Rationale |
|-------|------------|------------|:----------------:|-----------|
| 2.1 | 4 (incl. Part II) | A, B | 2 | Two worksheets, arithmetic + geometric |
| 2.2 | 2 | A, B | 2 | Classification + model construction |
| 2.3 | 2 | A, B | 2 | Limits, concavity, and graphing |
| 2.4 | 2 | A | 1 | Single worksheet; compact conversion skill |
| 2.5 | 3 | A | 2 | Hidden proportionality, regression, time conversion |
| 2.6 | 4 | A, B | 2 | Residual analysis + model validation |
| 2.7 | 3 | A, B | 2 | Composition computation + domain |
| 2.8 | 5 | A, B | 3 | Rich inverse content: analytical, graphical, verification |
| 2.9 | 6 | A, B | 3 | Conversion, evaluation, change of base |
| 2.10 | 2 | A | 1 | Compact: inverse of exponential, table classification |
| 2.11 | 2 | A | 1 | Compact: log function properties and domain |
| 2.12 | 5 | A, B | 2 | Expand/condense, change of base connections |
| 2.13 | 3 | A, B | 4 | Exponential eqs, log eqs, extraneous, inverses |
| 2.14 | 7 | A | 4 | Richest topic: two-point, LnReg, multi-context, AP-style |
| 2.15 | 2 | A | 3 | Semi-log concept, model building, cumulative application |

**Topic instruction subtotal: 37 days**
**Practice/review subtotal: 4 days (practice after 2.4, after 2.13, and 2-day review at end)**
**Instruction grand total: 41 days**

## Budget

| Day Type | Count |
|----------|------:|
| `instruction` | 41 |
| `quiz` | 1 |
| `test` | 3 |
| `review` | 1 |
| `ap_task_model` | 1 |
| **Total** | **47** |

## Assessment Map

| Assessment | Day Type | After Topics | Period |
|------------|----------|-------------|--------|
| Quiz 1 | `quiz` | 2.1–2.4 | 10 |
| Test 1 | `test` | 2.5–2.8 | 20 |
| Test 2 | `test` | 2.9–2.13 | 34 |
| Review | `review` | 2.1–2.15 | 45 |
| AP Task Model | `ap_task_model` | 2.1–2.15 | 46 |
| Final Test | `test` | 2.1–2.15 | 47 |

## Period-by-Period Plan

### Block 1: Sequences and Exponential Basics (2.1–2.4) — 9 instruction + 1 quiz

| Period | Day Type | CED Topic | Passwater Source | Competency Target | Instructional Evidence | Independent Practice Shape | Notes |
|--------|----------|-----------|------------------|-------------------|------------------------|----------------------------|-------|
| 1 | `instruction` | `2.1` Arithmetic Sequences | `source/passwater/unit-2.md` | `2.1.A` / `2.1.A.*` | Passwater notes: sequence as function from natural→real numbers. Arithmetic: constant difference d. Formula a_n = a_k + d(n−k). Examples 1–4. | Worksheet A: classify sequences, find arithmetic formulas given d and a term. | Day 1 of 2. Focus: arithmetic sequences. |
| 2 | `instruction` | `2.1` Geometric Sequences | `source/passwater/unit-2.md` | `2.1.A` / `2.1.A.*` | Passwater notes Part II: geometric: constant ratio r. Two-term procedure: g_n = g_k · r^(n−k). Examples 6–7, Part II Examples 3–4. | Worksheet A remaining + Worksheet B: geometric classification, find g_n from two terms. | Day 2 of 2. Focus: geometric sequences, two-term procedure. |
| 3 | `instruction` | `2.2` Classification from Tables | `source/passwater/unit-2.md` | `2.2.A` / `2.2.A.*` | Passwater notes: arithmetic↔linear (constant additive change), geometric↔exponential (constant multiplicative change). Example 1: classify four functions. | Worksheet A: classify tables as linear/exponential/neither, cite constant difference or ratio. | Day 1 of 2. Focus: classification. |
| 4 | `instruction` | `2.2` Model Construction from Data | `source/passwater/unit-2.md` | `2.2.A` / `2.2.A.*` | Passwater notes: linear model from slope, exponential from ratio. Real-world: theater seats, rumor spread, bald eagle nesting. | Worksheet B: construct model from two data points, predict, real-world contexts. | Day 2 of 2. Focus: building models. |
| 5 | `instruction` | `2.3` Exponential Form and Growth/Decay | `source/passwater/unit-2.md` | `2.3.A` / `2.3.A.*` | Passwater notes: f(x) = a·b^x. Growth (b > 1) vs decay (0 < b < 1). Domain all reals, range (0,∞). Always monotonic, one concavity. | Worksheet A: sketch exponential graphs, identify growth/decay and initial value. | Day 1 of 2. Focus: definition, growth/decay. |
| 6 | `instruction` | `2.3` End Behavior and Negative Coefficients | `source/passwater/unit-2.md` | `2.3.A` / `2.3.A.*` | Passwater notes: limit statements. Negative a reflects over x-axis, flips direction and concavity. Examples 2–3: g(x) = −3(1/2)^x, h(x) = (2/5)^(3x). | Worksheet B: write limit statements, interpret graph properties, negative coefficients. | Day 2 of 2. Focus: limits, reflection. |
| 7 | `instruction` | `2.4` Exponential Function Manipulation | `source/passwater/unit-2.md` | `2.4.A` / `2.4.A.*` | Passwater notes: b^(x+h) = b^h · b^x (translation → dilation). b^(cx) = (b^c)^x (dilation → base change). Unique to exponential functions. Examples 1–3. | Worksheet A: rewrite in a·b^x form, convert including e-base. | Single day. Key equivalence. |
| 8 | `instruction` | `2.1–2.4` Cumulative Practice | `source/passwater/unit-2.md` | `2.1.A–2.4.A` | Mixed practice: sequence classification, finding formulas, exponential properties, form conversion. FRQ 4 connections (no calculator). | AP-style mixed problems across 2.1–2.4. | Practice day 1 of 2. |
| 9 | `instruction` | `2.1–2.4` Error Analysis | `source/passwater/unit-2.md` | `2.1.A–2.4.A` | Targeted review: arithmetic vs geometric confusion, growth/decay misidentification, exponent rule mistakes. | Error analysis: find and correct mistakes. | Practice day 2 of 2. |
| 10 | `quiz` | `2.1–2.4` | `source/passwater/unit-2.md` | `2.1.A–2.4.A.*` | Quiz covering sequences, classification, exponential properties, form conversion. | — | Quiz 1. |

### Block 2: Modeling, Composition, Inverses (2.5–2.8) — 9 instruction + 1 test

| Period | Day Type | CED Topic | Passwater Source | Competency Target | Instructional Evidence | Independent Practice Shape | Notes |
|--------|----------|-----------|------------------|-------------------|------------------------|----------------------------|-------|
| 11 | `instruction` | `2.5` Hidden Proportionality and Models | `source/passwater/unit-2.md` | `2.5.A` / `2.5.A.*` | Passwater notes: vertical translations mask exponential growth. Example 1: h(x) = 63,31,15,7,3 → add 1 → ratio 1/2. Two-point model construction. | Worksheet A: find the constant revealing proportional growth, construct a·b^x from two points. | Day 1 of 2. Focus: hidden proportionality. |
| 12 | `instruction` | `2.5` Regression and Time Conversion | `source/passwater/unit-2.md` | `2.5.A` / `2.5.A.*` | Passwater notes: TI-84 ExpReg. Time-unit conversion: b^(1/12) not ÷12. Natural base e. Examples 2–3: bacteria, deer population. | Worksheet A remaining: ExpReg, predict, interpret parameters. | Day 2 of 2. Focus: regression, time conversion. |
| 13 | `instruction` | `2.6` Residuals and Model Selection | `source/passwater/unit-2.md` | `2.6.A` / `2.6.A.*` | Passwater notes: residual = actual − predicted. Residual plot interpretation. Constant diff → linear, constant ratio → exponential. Examples 1–2. | Worksheet A: compute residuals, classify data, interpret residual plots. | Day 1 of 2. Focus: residuals, selection. |
| 14 | `instruction` | `2.6` Context-Driven Validation | `source/passwater/unit-2.md` | `2.6.A` / `2.6.A.*` | Passwater notes: U-shaped residual → quadratic. Cost of over/under-estimation in context. | Worksheet B: justify model choice in context, compare competing models. | Day 2 of 2. Focus: validation, justification. |
| 15 | `instruction` | `2.7` Composition Computation | `source/passwater/unit-2.md` | `2.7.A` / `2.7.A.*` | Passwater notes: (f∘g)(x) = f(g(x)), inside-out rule. Order matters. Examples 1–3: f(g(3)), (f∘g)(x) vs (g∘f)(x), triple composition. | Worksheet A: compute compositions numerically and algebraically. | Day 1 of 2. Focus: computation, non-commutativity. |
| 16 | `instruction` | `2.7` Domain and Multi-Representation | `source/passwater/unit-2.md` | `2.7.A` / `2.7.A.*` | Passwater notes: domain of composite — output of g must be in domain of f. Example 4: (k∘p)(x) with radical. Real-world: temperature → wind chill. | Worksheet B: domain restrictions, composition from tables/graphs, real-world. | Day 2 of 2. Focus: domain, representations. |
| 17 | `instruction` | `2.8` Finding and Verifying Inverses | `source/passwater/unit-2.md` | `2.8.A` / `2.8.A.*` | Passwater notes: 3-step procedure (y, swap, solve). Verification: f(f⁻¹(x)) = x AND f⁻¹(f(x)) = x. Examples 1–3. | Worksheet A: find inverses, verify by composition. | Day 1 of 3. Focus: analytical procedure. |
| 18 | `instruction` | `2.8` Graphical Inverses | `source/passwater/unit-2.md` | `2.8.A` / `2.8.A.*` | Passwater notes: reflection over y = x, horizontal line test, domain-range swap. | Worksheet B: graph inverse from graph of f, determine domain/range of f⁻¹. | Day 2 of 3. Focus: graphical interpretation. |
| 19 | `instruction` | `2.8` Inverse Functions Integration | `source/passwater/unit-2.md` | `2.8.A` / `2.8.A.*` | Cumulative practice: analytical, graphical, verification, domain/range swap. FRQ 1 connections. | AP-style problems: interpret inverse from table/graph, verify, domain/range. | Day 3 of 3. Focus: integration, AP-style. |
| 20 | `test` | `2.5–2.8` | `source/passwater/unit-2.md` | `2.5.A–2.8.A.*` | Test: exponential modeling, residuals, composition, inverse functions. | — | Test 1. |

### Block 3: Logarithms (2.9–2.13) — 13 instruction + 1 test

| Period | Day Type | CED Topic | Passwater Source | Competency Target | Instructional Evidence | Independent Practice Shape | Notes |
|--------|----------|-----------|------------------|-------------------|------------------------|----------------------------|-------|
| 21 | `instruction` | `2.9` Log Definition and Conversion | `source/passwater/unit-2.md` | `2.9.A` / `2.9.A.*` | Passwater notes: log_b(x) = y means b^y = x. Converting exponential↔logarithmic forms. Common log, natural log. Examples 1–2. | Worksheet A: convert between exponential and logarithmic forms. | Day 1 of 3. Focus: definition, conversion. |
| 22 | `instruction` | `2.9` Evaluating Logarithms | `source/passwater/unit-2.md` | `2.9.A` / `2.9.A.*` | Passwater notes: "what exponent gives this result?" Fractional: log₉(3) = 1/2. Negative: log₂(1/32) = −5. Example 3. | Worksheet A–B: evaluate logs without calculator. | Day 2 of 3. Focus: mental evaluation. |
| 23 | `instruction` | `2.9` Change of Base | `source/passwater/unit-2.md` | `2.9.A` / `2.9.A.*` | Passwater notes: change of base log_b(x) = log(x)/log(b). Example 4: log₇(135) ≈ 2.4957, ln(50) ≈ 3.9120. | Worksheet B: evaluate with calculator, mixed problems. | Day 3 of 3. Focus: change of base. |
| 24 | `instruction` | `2.10` Inverses of Exponential Functions | `source/passwater/unit-2.md` | `2.10.A` / `2.10.A.*` | Passwater notes: inverse of b^x is log_b(x). Table classification — inputs multiply, outputs add → logarithmic. Composition verification: b^(log_b(x)) = x. | Worksheet A: classify tables, graph inverse, verify by composition. | Single day. Builds on 2.8–2.9. |
| 25 | `instruction` | `2.11` Logarithmic Functions | `source/passwater/unit-2.md` | `2.11.A` / `2.11.A.*` | Passwater notes: domain (0,∞), range all reals, VA at x = 0. End behavior x → 0⁺ (NOT x → −∞). Monotonicity, concavity. Examples 1–4. | Worksheet A: limit statements, domain/range, increasing/decreasing, concavity. | Single day. Critical: x → 0⁺. |
| 26 | `instruction` | `2.12` Expanding Log Expressions | `source/passwater/unit-2.md` | `2.12.A` / `2.12.A.*` | Passwater notes: Product, Quotient, Power properties. Expand log₂(8x³/y) = 3 + 3log₂(x) − log₂(y). Key error: log(a+b) ≠ log(a)+log(b). | Worksheet A: expand using all three properties. | Day 1 of 2. Focus: expanding. |
| 27 | `instruction` | `2.12` Condensing and Connections | `source/passwater/unit-2.md` | `2.12.A` / `2.12.A.*` | Passwater notes: condense to single log. Change of base as vertical dilation. log(6x) = log(6) + log(x) — horizontal dilation = vertical translation. | Worksheet B: condense, equivalence MC, change of base interpretation. | Day 2 of 2. Focus: condensing, connections. |
| 28 | `instruction` | `2.13` Exponential Equations | `source/passwater/unit-2.md` | `2.13.A` / `2.13.A.*` | Passwater notes: 4-step process (isolate, convert, solve, simplify). Common bases: rewrite with same base, set exponents equal. Examples 1, 4a–b. | Worksheet A: solve exponential equations using logs and common bases. | Day 1 of 4. Focus: exponential equations. |
| 29 | `instruction` | `2.13` Single-Log Equations | `source/passwater/unit-2.md` | `2.13.A` / `2.13.A.*` | Passwater notes: isolate log, convert to exponential. Example 2: 2log₃(x+3)+4=10 → x=24. ln(2-x)/5=1 → x=2−e^5. | Worksheet A–B: solve single-log equations. | Day 2 of 4. Focus: single-log equations. |
| 30 | `instruction` | `2.13` Multi-Log Equations and Extraneous | `source/passwater/unit-2.md` | `2.13.A` / `2.13.A.*` | Passwater notes: combine logs, convert, check extraneous. Example 3: log₃(x+2)+log₃(x−3)=log₃(14) → x=5 or x=−4 (extraneous). | Worksheet A–B: solve multi-log equations, check extraneous. | Day 3 of 4. Focus: extraneous solutions. |
| 31 | `instruction` | `2.13` Inverses of Exp/Log Functions | `source/passwater/unit-2.md` | `2.13.A` / `2.13.A.*` | Passwater notes: inverse of f(x)=4^(3x+2)−15 (Example 5). Swap, isolate exponential, convert to log. FRQ 1 connections. | Worksheet B: find inverses of exponential and log functions. | Day 4 of 4. Focus: inverses. |
| 32 | `instruction` | `2.9–2.13` Cumulative Practice | `source/passwater/unit-2.md` | `2.9.A–2.13.A.*` | Mixed practice: evaluate logs, expand/condense, solve equations, find inverses. FRQ 4 (no calculator) and FRQ 1 connections. | AP-style mixed problems across 2.9–2.13. | Practice day 1 of 2. |
| 33 | `instruction` | `2.9–2.13` Error Analysis | `source/passwater/unit-2.md` | `2.9.A–2.13.A.*` | Targeted review: log(a+b) misconception, extraneous solution neglect, inverse procedure mistakes. | Error analysis problems from across 2.9–2.13. | Practice day 2 of 2. |
| 34 | `test` | `2.9–2.13` | `source/passwater/unit-2.md` | `2.9.A–2.13.A.*` | Test: log expressions, log functions, log properties, equation solving. | — | Test 2. |

### Block 4: Logarithmic Modeling and Semi-log (2.14–2.15) — 10 instruction + 1 review + 1 ap_task_model + 1 test

| Period | Day Type | CED Topic | Passwater Source | Competency Target | Instructional Evidence | Independent Practice Shape | Notes |
|--------|----------|-----------|------------------|-------------------|------------------------|----------------------------|-------|
| 35 | `instruction` | `2.14` Two-Point Logarithmic Models | `source/passwater/unit-2.md` | `2.14.A` / `2.14.A.*` | Passwater notes: L(x) = a + b ln(x). Construct from two points: write equations, subtract to eliminate a. Example 1: x=2→L=3, x=5→L=7 → b≈4.366. | Worksheet A: write system from two data points, solve for a and b. | Day 1 of 4. Focus: two-point construction. |
| 36 | `instruction` | `2.14` Regression and Multi-Context Modeling | `source/passwater/unit-2.md` | `2.14.A` / `2.14.A.*` | Passwater notes: TI-84 LnReg. Sound (decibels), Richter (Lillie Formula), pH, salary vs experience. Examples 2–3. | Worksheet A remaining: LnReg, interpret a and b in context, predict. | Day 2 of 4. Focus: regression, contexts. |
| 37 | `instruction` | `2.14` Application and Interpretation | `source/passwater/unit-2.md` | `2.14.A` / `2.14.A.*` | Passwater notes: log growth (rapid start → levels off) vs exp growth (slow start → accelerates). Learning curves, earthquake data. | AP-style problems: build model, predict, interpret parameters. | Day 3 of 4. Focus: interpretation. |
| 38 | `instruction` | `2.14` Log vs Exponential Model Selection | `source/passwater/unit-2.md` | `2.14.A` / `2.14.A.*` | Cumulative 2.14 practice: given data, justify log vs exponential model choice. FRQ 2 connections (modeling non-periodic context). | AP FRQ 2-style: justify model type, build, apply, interpret. | Day 4 of 4. Focus: model selection, FRQ 2. |
| 39 | `instruction` | `2.15` Semi-log Linearization Concept | `source/passwater/unit-2.md` | `2.15.A` / `2.15.A.*` | Passwater notes: log(a·b^x) = log(a) + x·log(b) is linear. Semi-log: exp data → straight line. Log axis: equal spacing = multiplicative steps. Example 1. | Worksheet A: identify exponential datasets, plot on semi-log axes. | Day 1 of 3. Focus: concept, identification. |
| 40 | `instruction` | `2.15` Building Models from Semi-log | `source/passwater/unit-2.md` | `2.15.A` / `2.15.A.*` | Passwater notes: slope = log(b), intercept = log(a). Convert: b = 10^slope, a = 10^intercept. Examples 2–3. | Worksheet A remaining: write log-linear model, convert to exponential. | Day 2 of 3. Focus: model building. |
| 41 | `instruction` | `2.15` Semi-log Cumulative Application | `source/passwater/unit-2.md` | `2.15.A` / `2.15.A.*` | Cumulative: connect semi-log to exponential modeling (2.5), log modeling (2.14), model validation (2.6). FRQ 2 connections. | AP-style: use semi-log to validate exponential model, interpret slope as growth rate. | Day 3 of 3. Focus: cumulative connections. |
| 42 | `instruction` | `2.1–2.15` Comprehensive Review | `source/passwater/unit-2.md` | `2.1.A–2.15.A.*` | Full unit review: sequences, exponential functions, modeling, composition, inverses, logarithms, equations, semi-log. All FRQ types. | Mixed AP-style problems across all Unit 2 topics. | Review day 1 of 2. |
| 43 | `instruction` | `2.1–2.15` Targeted Review | `source/passwater/unit-2.md` | `2.1.A–2.15.A.*` | Targeted review: address common errors from day 42. Focus on FRQ task models. | AP FRQ practice: one FRQ 1, one FRQ 2, one FRQ 4 part. | Review day 2 of 2. |
| 44 | `instruction` | `2.1–2.15` Final Review | `source/passwater/unit-2.md` | `2.1.A–2.15.A.*` | Quick-reference summary: all formulas, properties, procedures. Student-selected weak areas. | Mixed review, student-directed practice. | Review day 3 of 3. |
| 45 | `review` | `2.1–2.15` | `source/passwater/unit-2.md` | `2.1.A–2.15.A.*` | Final review session before test. | Final review problems. | Review day. |
| 46 | `ap_task_model` | `2.1–2.15` | `source/passwater/unit-2.md` | `2.1.A–2.15.A.*` | FRQ task-model transfer. FRQ 1: composed/inverse functions. FRQ 2: exponential/log modeling. FRQ 4: symbolic manipulations (no calc). | AP FRQ practice with written reasoning. | AP task model day. |
| 47 | `test` | `2.1–2.15` | `source/passwater/unit-2.md` | `2.1.A–2.15.A.*` | Final unit test: all 15 CED topics. | — | Final Unit 2 test. |

import { expect, test } from "vitest";
import { computeComponentContentHash } from "@/lib/activities/content-hash";

test("hash is stable for equivalent content with different key order", async () => {
  const component1 = {
    componentKind: "activity" as const,
    componentKey: "graphing-explorer",
    props: { a: 1, b: 2 },
  };
  const component2 = {
    componentKind: "activity" as const,
    componentKey: "graphing-explorer",
    props: { b: 2, a: 1 },
  };
  await expect(computeComponentContentHash(component1)).resolves.toBe(
    await computeComponentContentHash(component2)
  );
});

test("hash changes when props change", async () => {
  const component1 = {
    componentKind: "practice" as const,
    props: { a: 1 },
  };
  const component2 = {
    componentKind: "practice" as const,
    props: { a: 2 },
  };
  await expect(computeComponentContentHash(component1)).resolves.not.toBe(
    await computeComponentContentHash(component2)
  );
});

test("hash changes when componentKind changes", async () => {
  const component1 = {
    componentKind: "example" as const,
    componentKey: "test",
  };
  const component2 = {
    componentKind: "activity" as const,
    componentKey: "test",
  };
  await expect(computeComponentContentHash(component1)).resolves.not.toBe(
    await computeComponentContentHash(component2)
  );
});

test("hash changes when gradingConfig changes", async () => {
  const component1 = {
    componentKind: "activity" as const,
    gradingConfig: { maxScore: 10 },
  };
  const component2 = {
    componentKind: "activity" as const,
    gradingConfig: { maxScore: 20 },
  };
  await expect(computeComponentContentHash(component1)).resolves.not.toBe(
    await computeComponentContentHash(component2)
  );
});

test("hash ignores approval metadata and timestamps", async () => {
  const componentBase = {
    componentKind: "activity" as const,
    componentKey: "graphing-explorer",
    props: { equation: "y = 2x + 3" },
  };
  const componentWithApproval = {
    ...componentBase,
    approval: {
      status: "approved",
      contentHash: "some-old-hash",
      reviewedAt: Date.now(),
      reviewedBy: "some-profile-id",
    },
  };
  const componentWithTimestamps = {
    ...componentBase,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  await expect(computeComponentContentHash(componentBase)).resolves.toBe(
    await computeComponentContentHash(componentWithApproval)
  );
  await expect(computeComponentContentHash(componentBase)).resolves.toBe(
    await computeComponentContentHash(componentWithTimestamps)
  );
});

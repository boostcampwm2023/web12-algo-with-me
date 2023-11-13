import { expect, it } from "vitest";

const sum = (a: number, b: number) => a + b;

it("should be sum two values", () => {
  expect(sum(1, 2)).toBe(3);
});

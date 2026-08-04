import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import test from "node:test";

const evaluateCareerYearsInUtc = (date) => {
  const output = execFileSync(process.execPath, [
    "--experimental-strip-types",
    "--input-type=module",
    "-e",
    `import { getCareerYear, getCompletedCareerYears } from "./src/data/resume.shared.ts";
const date = new Date("${date}");
console.log(JSON.stringify([getCompletedCareerYears(date), getCareerYear(date)]));`,
  ], {
    cwd: process.cwd(),
    env: { ...process.env, TZ: "UTC" },
    encoding: "utf8",
  });

  return JSON.parse(output);
};

test("calculates career anniversaries in Korea time on UTC runners", () => {
  assert.deepEqual(evaluateCareerYearsInUtc("2026-06-30T14:59:59.999Z"), [12, 13]);
  assert.deepEqual(evaluateCareerYearsInUtc("2026-06-30T15:00:00.000Z"), [13, 14]);
});

import assert from "node:assert/strict";
import test from "node:test";
import { pdfTargets } from "../scripts/pdf-targets.mjs";

test("defines one PDF target per locale route", () => {
  assert.deepEqual(pdfTargets, [
    { path: "/", output: "resume.pdf" },
    { path: "/en/", output: "resume-en.pdf" },
  ]);
});

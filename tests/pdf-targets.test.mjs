import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { pdfTargets } from "../scripts/pdf-targets.mjs";

test("defines one PDF target per locale route", () => {
  assert.deepEqual(pdfTargets, [
    { path: "/", output: "resume.pdf" },
    { path: "/en/", output: "resume-en.pdf" },
  ]);
});

test("passes the installed Chrome path to the PDF build", () => {
  const workflow = readFileSync(new URL("../.github/workflows/deploy.yml", import.meta.url), "utf8");

  assert.match(workflow, /id: setup-chrome/);
  assert.match(workflow, /CHROME_PATH: \$\{\{ steps\.setup-chrome\.outputs\.chrome-path \}\}/);
});

test("makes standard builds produce localized PDFs and development print locally", () => {
  const packageJson = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8"));
  const printButton = readFileSync(new URL("../src/components/PrintButton.astro", import.meta.url), "utf8");

  assert.equal(packageJson.scripts.build, "astro build && node scripts/generate-pdfs.mjs");
  assert.match(printButton, /import\.meta\.env\.DEV/);
  assert.match(printButton, /window\.print\(\)/);
});

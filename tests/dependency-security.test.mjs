import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("pins PostCSS to a non-vulnerable version", () => {
  const packageJson = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8"));
  const lockfile = readFileSync(new URL("../pnpm-lock.yaml", import.meta.url), "utf8");

  assert.equal(packageJson.pnpm?.overrides?.postcss, "8.5.25");
  assert.match(lockfile, /^  postcss@8\.5\.25:/m);
});

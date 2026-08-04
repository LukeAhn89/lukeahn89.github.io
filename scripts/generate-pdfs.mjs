import { spawn, spawnSync } from "node:child_process";
import { access, rm, stat } from "node:fs/promises";
import { constants } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { pdfTargets } from "./pdf-targets.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const distDir = resolve(root, "dist");
const host = "127.0.0.1";
const port = 4327;
const baseUrl = `http://${host}:${port}`;

async function isExecutable(filePath) {
  if (!filePath) return false;

  try {
    await access(filePath, constants.X_OK);
    return true;
  } catch {
    return false;
  }
}

async function findChrome() {
  const paths = [
    process.env.CHROME_PATH,
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing",
  ];

  for (const filePath of paths) {
    if (await isExecutable(filePath)) return filePath;
  }

  for (const command of ["chrome", "google-chrome", "chromium", "chromium-browser"]) {
    const result = spawnSync("which", [command], { encoding: "utf8" });
    const filePath = result.status === 0 ? result.stdout.trim() : "";
    if (await isExecutable(filePath)) return filePath;
  }

  throw new Error("Chrome was not found. Install Chrome or set CHROME_PATH.");
}

async function requireBuiltPages() {
  for (const target of pdfTargets) {
    const htmlPath = target.path === "/"
      ? resolve(distDir, "index.html")
      : resolve(distDir, target.path.slice(1), "index.html");
    await access(htmlPath, constants.R_OK);
  }
}

async function waitForPreview(processHandle) {
  const deadline = Date.now() + 15_000;

  while (Date.now() < deadline) {
    if (processHandle.exitCode !== null) {
      throw new Error(`Astro preview exited early with code ${processHandle.exitCode}.`);
    }

    try {
      const response = await fetch(baseUrl);
      if (response.ok) return;
    } catch {
      // The preview server may still be starting.
    }

    await new Promise((done) => setTimeout(done, 100));
  }

  throw new Error(`Astro preview did not start within 15 seconds at ${baseUrl}.`);
}

function stopPreview(processHandle) {
  if (processHandle.exitCode === null) processHandle.kill("SIGTERM");
}

async function generatePdf(chromePath, target) {
  const outputPath = resolve(distDir, target.output);
  await rm(outputPath, { force: true });

  const chromeArguments = [
    "--headless=new",
    "--disable-gpu",
    "--no-first-run",
    "--no-default-browser-check",
    "--no-pdf-header-footer",
    "--run-all-compositor-stages-before-draw",
    "--virtual-time-budget=3000",
    `--print-to-pdf=${outputPath}`,
    `${baseUrl}${target.path}`,
  ];

  if (process.env.CHROME_NO_SANDBOX === "true") chromeArguments.push("--no-sandbox");

  const result = spawnSync(chromePath, chromeArguments, { encoding: "utf8" });

  if (result.error || result.status !== 0) {
    const detail = result.error?.message || result.stderr.trim() || `exit code ${result.status}`;
    throw new Error(`Failed to generate ${target.output}: ${detail}`);
  }

  const output = await stat(outputPath);
  if (output.size === 0) throw new Error(`Generated ${target.output} is empty.`);
  console.log(`Generated ${target.output} (${output.size} bytes)`);
}

await requireBuiltPages();
const chromePath = await findChrome();
const astroCli = resolve(root, "node_modules/astro/bin/astro.mjs");
const preview = spawn(process.execPath, [
  astroCli,
  "preview",
  "--host",
  host,
  "--port",
  String(port),
], {
  cwd: root,
  env: { ...process.env, ASTRO_TELEMETRY_DISABLED: "1" },
  stdio: ["ignore", "pipe", "pipe"],
});

let previewError = "";
preview.stderr.on("data", (chunk) => {
  previewError += chunk.toString();
});

try {
  await waitForPreview(preview);
  for (const target of pdfTargets) await generatePdf(chromePath, target);
} catch (error) {
  if (previewError.trim()) console.error(previewError.trim());
  throw error;
} finally {
  stopPreview(preview);
}

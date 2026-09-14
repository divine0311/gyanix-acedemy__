import { spawn } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const apiDir = path.join(root, "artifacts", "api-server");
const frontendDir = path.join(root, "artifacts", "gyanix-academy");
const envFile = path.join(root, ".env");

const isWin = process.platform === "win32";
const pnpmCmd = isWin ? "pnpm.cmd" : "pnpm";
const nodeCmd = isWin ? "node.exe" : "node";

const children = new Set();

function envFromDotenv(file, extra = {}) {
  const parsed = { ...extra };
  if (existsSync(file)) {
    for (const line of readFileSync(file, "utf8").split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
      if (!m) continue;
      parsed[m[1]] = m[2].replace(/^"|"$/g, "");
    }
  }
  return parsed;
}

function start(label, command, args, opts) {
  const child = spawn(command, args, {
    stdio: "inherit",
    shell: isWin,
    ...opts,
  });
  children.add(child);
  child.on("exit", (code) => {
    children.delete(child);
    if (code && code !== 0) {
      console.error(`[${label}] exited with code ${code}`);
    }
  });
  return child;
}

function killAll() {
  for (const child of children) {
    if (!child.killed) {
      try {
        child.kill();
      } catch {
        // ignore
      }
    }
  }
}

process.on("SIGINT", () => {
  killAll();
  process.exit(0);
});
process.on("SIGTERM", () => {
  killAll();
  process.exit(0);
});

const apiPort = (envFromDotenv(envFile).PORT || "3001").trim();

async function main() {
  console.log("═══ Gyanix Academy Dev ═══");
  console.log(`  Frontend : http://localhost:5000`);
  console.log(`  API      : http://localhost:${apiPort}`);
  console.log("────────────────────────────");

  const needsBuild = !existsSync(path.join(apiDir, "dist", "index.mjs"));
  if (needsBuild) {
    console.log("Building API server (first run)…");
    await new Promise((resolve) => {
      const build = start("build", pnpmCmd, ["--filter", "@workspace/api-server", "run", "build"], {
        cwd: root,
      });
      build.on("exit", resolve);
    });
  }

  const apiEnv = { ...process.env };
  start("api", nodeCmd, ["--enable-source-maps", "--env-file=" + envFile, "dist/index.mjs"], {
    cwd: apiDir,
    env: apiEnv,
  });

  const frontendEnv = {
    ...process.env,
    ...envFromDotenv(envFile, { PORT: "5000", BASE_PATH: "/" }),
  };
  start("frontend", pnpmCmd, ["run", "dev"], {
    cwd: frontendDir,
    env: frontendEnv,
  });
}

main();
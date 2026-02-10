import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";

const pnpmDir = join(process.cwd(), "node_modules", ".pnpm");

if (!existsSync(pnpmDir)) {
  console.error("node_modules/.pnpm not found. Run pnpm install first.");
  process.exit(1);
}

const tamaguiDirs = readdirSync(pnpmDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && entry.name.startsWith("tamagui@"))
  .map((entry) => entry.name);

if (tamaguiDirs.length !== 1) {
  console.error(`Expected 1 Tamagui instance, found ${tamaguiDirs.length}.`);
  console.error(tamaguiDirs.join("\n"));
  process.exit(1);
}

console.log(`OK: single Tamagui instance (${tamaguiDirs[0]}).`);

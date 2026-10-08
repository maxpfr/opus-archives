// Lists every unresolved {{PLACEHOLDER}} in site.config.ts. Runs before each build (warning only).
import { readFileSync } from 'node:fs';

const src = readFileSync(new URL('../site.config.ts', import.meta.url), 'utf8');
const found = [...new Set(src.match(/'\{\{[A-Z_]+\}\}'/g) ?? [])].map((s) => s.slice(1, -1));

if (found.length === 0) {
  console.log('✓ No placeholder left in site.config.ts');
} else {
  console.warn(`⚠ ${found.length} placeholder(s) still to fill in site.config.ts (TODO):`);
  for (const p of found) console.warn(`  - ${p}`);
  if (process.argv.includes('--strict')) process.exit(1);
}

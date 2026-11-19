import { readFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const configPath = join(homedir(), '.config/k-assist/mobile-runner.json');
let config;
try {
  config = JSON.parse(readFileSync(configPath, 'utf8'));
} catch {
  console.error('Create private ~/.config/k-assist/mobile-runner.json with sshAlias and remoteRoot.');
  process.exit(1);
}
if (!/^[\w.-]+$/.test(config.sshAlias ?? '') ||
    !/^[\w./-]+$/.test(config.remoteRoot ?? '') ||
    config.remoteRoot.startsWith('-')) {
  console.error('Use an SSH config alias and a plain directory path for the mobile runner.');
  process.exit(1);
}
const root = fileURLToPath(new URL('../', import.meta.url));
const excludes = [
  '.git', 'node_modules', '.env', '.env.*', 'notes.md', '.artifacts', '.npmrc',
  '/docs/local',
  '.expo', '.svelte-kit', '.wrangler', 'bin',
  '/apps/mobile/ios', '/apps/mobile/android', '/apps/mobile/dist',
  '/apps/marketing/build', '/supabase/.temp', '/supabase/.branches',
];
const child = spawnSync('rsync', [
  '--archive', '--compress',
  ...excludes.flatMap((pattern) => ['--exclude', pattern]),
  root, `${config.sshAlias}:${config.remoteRoot.replace(/\/$/, '')}/`,
], { stdio: 'inherit' });
if (child.error) throw child.error;
process.exit(child.status ?? 1);

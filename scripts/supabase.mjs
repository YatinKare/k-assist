import { readFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

const env = { ...process.env };
try {
  const config = JSON.parse(readFileSync(join(homedir(), '.config/k-assist/supabase.json'), 'utf8'));
  env.SUPABASE_ACCESS_TOKEN ??= config.accessToken;
  env.SUPABASE_DB_PASSWORD ??= config.databasePassword;
} catch (error) {
  if (error.code !== 'ENOENT') throw error;
}
const child = spawnSync('supabase', process.argv.slice(2), { env, stdio: 'inherit' });
if (child.error) throw child.error;
process.exit(child.status ?? 1);

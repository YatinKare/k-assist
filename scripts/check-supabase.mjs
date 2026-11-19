import { readFileSync, existsSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

if (existsSync('.env')) process.loadEnvFile('.env');
let config = {};
const privateConfig = join(homedir(), '.config/k-assist/supabase.json');
if (existsSync(privateConfig)) config = JSON.parse(readFileSync(privateConfig, 'utf8'));
const url = process.env.SUPABASE_URL || config.url;
const key = process.env.SUPABASE_PUBLISHABLE_KEY || config.publishableKey;
if (!url || !key) throw new Error('Set SUPABASE_URL and SUPABASE_PUBLISHABLE_KEY in an ignored .env file.');

for (const path of ['/auth/v1/health']) {
  const response = await fetch(new URL(path, url), {
    headers: { apikey: key }, signal: AbortSignal.timeout(20_000)
  });
  if (!response.ok) throw new Error(`${path}: HTTP ${response.status}`);
  console.log(`${path}: HTTP ${response.status}`);
  await response.body?.cancel();
}
const result = spawnSync(process.execPath, [
  'scripts/supabase.mjs', 'db', 'query', '--remote', '--read-only',
  'select 1 as connection_ok;', '--output', 'json'
], { stdio: 'inherit' });
if (result.error) throw result.error;
process.exit(result.status ?? 1);

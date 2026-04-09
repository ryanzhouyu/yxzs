const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const args = new Set(process.argv.slice(2));
const envOnly = args.has('--env-only');

const envPairs = [
  ['manager-api/.env.example', 'manager-api/.env'],
  ['manager-main/.env.example', 'manager-main/.env'],
];

function parseEnvFile(content) {
  const entries = new Map();

  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) {
      continue;
    }

    const separatorIndex = line.indexOf('=');
    if (separatorIndex === -1) {
      continue;
    }

    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1);
    entries.set(key, value);
  }

  return entries;
}

function syncEnvFile(sourcePath, targetPath, targetLabel) {
  const sourceContent = fs.readFileSync(sourcePath, 'utf8');

  if (!fs.existsSync(targetPath)) {
    fs.copyFileSync(sourcePath, targetPath);
    console.log(`Created ${targetLabel} from example`);
    return;
  }

  const targetContent = fs.readFileSync(targetPath, 'utf8');
  const sourceEntries = parseEnvFile(sourceContent);
  const targetEntries = parseEnvFile(targetContent);
  const missingEntries = [];

  for (const [key, value] of sourceEntries.entries()) {
    if (!targetEntries.has(key)) {
      missingEntries.push(`${key}=${value}`);
    }
  }

  if (missingEntries.length === 0) {
    return;
  }

  const separator = targetContent.endsWith('\n') || targetContent.length === 0 ? '' : '\n';
  const mergedContent = `${targetContent}${separator}${missingEntries.join('\n')}\n`;
  fs.writeFileSync(targetPath, mergedContent, 'utf8');
  console.log(`Updated ${targetLabel} with ${missingEntries.length} missing variable(s)`);
}

for (const [source, target] of envPairs) {
  const sourcePath = path.join(__dirname, '..', source);
  const targetPath = path.join(__dirname, '..', target);
  syncEnvFile(sourcePath, targetPath, target);
}

if (envOnly) {
  console.log('Environment files are ready.');
  process.exit(0);
}

const steps = [
  ['Install API dependencies', 'npm', ['--prefix', 'manager-api', 'install']],
  ['Install web dependencies', 'npm', ['--prefix', 'manager-main', 'install']],
  ['Start MySQL container', 'npm', ['--prefix', 'manager-api', 'run', 'db:start']],
  ['Initialize database', 'npm', ['--prefix', 'manager-api', 'run', 'db:init']],
];

for (const [label, command, args] of steps) {
  console.log(`\n== ${label} ==`);
  const result = spawnSync(command, args, {
    stdio: 'inherit',
    shell: true,
  });

  if (result.status !== 0) {
    process.exit(result.status || 1);
  }
}

console.log('\nSetup completed. Run `npm run dev` from the repo root to start both apps.');

const { execSync } = require('child_process');

const ports = [3000, 4000];

function stopPort(port) {
  try {
    const output = execSync(`netstat -ano | findstr :${port}`, {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    });

    const pids = [...new Set(
      output
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line) => line.split(/\s+/).pop())
        .filter(Boolean)
    )];

    for (const pid of pids) {
      try {
        execSync(`taskkill /PID ${pid} /T /F`, { stdio: 'ignore' });
        console.log(`Stopped process on port ${port}: PID ${pid}`);
      } catch {}
    }
  } catch {
    console.log(`No process found on port ${port}`);
  }
}

for (const port of ports) {
  stopPort(port);
}

try {
  execSync('docker compose down', {
    cwd: process.cwd(),
    stdio: 'inherit',
    shell: true,
  });
} catch {
  console.log('Docker services were not stopped.');
}

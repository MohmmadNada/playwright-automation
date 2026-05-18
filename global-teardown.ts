async function globalTeardown(): Promise<void> {
  // stderr bypasses the reporter's ANSI cursor rewrites, keeping logs visible in the terminal
  process.stderr.write(`[SUITE END] ${new Date().toISOString()}\n\n`);
}

export default globalTeardown;

async function globalTeardown(): Promise<void> {
  console.log(`[SUITE END] ${new Date().toISOString()}`);
}

export default globalTeardown;

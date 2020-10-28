export async function sleep(
  ms: number,
  verbose: boolean = false
): Promise<void> {
  if (verbose) {
    console.log(`Sleeping for ${ms} ms`);
  }

  return new Promise((res) => {
    setTimeout(() => {
      if (verbose) {
        console.log(`Slept for ${ms} ms`);
      }

      res();
    }, ms);
  });
}

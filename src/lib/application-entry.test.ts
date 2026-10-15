import assert from "node:assert/strict";

function withEnv(
  patch: Record<string, string | undefined>,
  fn: () => void | Promise<void>,
): Promise<void> {
  const previous: Record<string, string | undefined> = {};
  for (const key of Object.keys(patch)) {
    previous[key] = process.env[key];
    const value = patch[key];
    if (value === undefined) {
      delete process.env[key];
    } else {
      process.env[key] = value;
    }
  }
  return Promise.resolve(fn()).finally(() => {
    for (const key of Object.keys(patch)) {
      if (previous[key] === undefined) {
        delete process.env[key];
      } else {
        process.env[key] = previous[key];
      }
    }
  });
}

async function runTests(): Promise<void> {
  await withEnv(
    { NODE_ENV: "development", NEXT_PUBLIC_APPLICATION_URL: undefined },
    async () => {
      const mod = await import("./application-entry");
      assert.equal(mod.resolveApplicationOrigin(), "http://localhost:4200");
      assert.equal(mod.applicationEntryHref(), "http://localhost:4200/dashboard");
    },
  );

  await withEnv(
    {
      NODE_ENV: "production",
      NEXT_PUBLIC_APPLICATION_URL: "https://app.ekklesianexus.com",
    },
    async () => {
      const mod = await import("./application-entry");
      assert.equal(mod.applicationEntryHref(), "https://app.ekklesianexus.com/dashboard");
    },
  );

  await withEnv(
    {
      NODE_ENV: "production",
      NEXT_PUBLIC_APPLICATION_URL: "https://evil.example",
    },
    async () => {
      const mod = await import("./application-entry");
      assert.equal(mod.applicationEntryHref(), "https://app.ekklesianexus.com/dashboard");
    },
  );

  console.log("application-entry.test.ts: ok");
}

runTests().catch((err) => {
  console.error(err);
  process.exit(1);
});

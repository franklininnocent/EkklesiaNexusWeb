"use client";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main className="flex min-h-[50vh] flex-col items-center justify-center gap-3 px-4 py-16 text-center">
      <h1 className="text-xl font-semibold">Something went wrong</h1>
      <p className="text-slate-600">Please try again in a moment.</p>
      <button type="button" className="rounded-md border px-3 py-2" onClick={() => reset()}>
        Try again
      </button>
    </main>
  );
}

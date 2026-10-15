"use client";

export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <html lang="en">
      <body>
        <main style={{ fontFamily: "system-ui, sans-serif", padding: "3rem 1.5rem", textAlign: "center" }}>
          <h1 style={{ fontSize: "1.25rem" }}>Something went wrong</h1>
          <p style={{ color: "#475569" }}>Please try again in a moment.</p>
          <button type="button" onClick={() => reset()}>
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}

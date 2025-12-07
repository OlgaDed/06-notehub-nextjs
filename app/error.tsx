'use client';

export default function GlobalError({ error }: { error: Error }) {
  return (
    <html>
      <body>
        <p>Something went wrong: {error.message}</p>
      </body>
    </html>
  );
}

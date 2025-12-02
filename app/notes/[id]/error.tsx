'use client';

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return (
    <div style={{ textAlign: 'center', padding: '3rem' }}>
      <p style={{ color: '#e74c3c', fontSize: '1.125rem' }}>
        Could not fetch note details. {error.message}
      </p>
    </div>
  );
}

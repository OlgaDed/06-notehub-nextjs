// app/notes/page.tsx
import { QueryClient, dehydrate } from '@tanstack/react-query';
import NotesPageClient from './NotesPage.client';
import { fetchNotes } from '../../lib/api';

export default async function NotesPage() {
  const qc = new QueryClient();

  // prefetch notes on the server
  await qc.prefetchQuery({
    queryKey: ['notes'],
    queryFn: () => fetchNotes(), // fetchNotes should return Note[] or {notes,...} depending on your API
  });

  const dehydrated = dehydrate(qc);

  // Pass dehydrated state to client component for hydration
  return <NotesPageClient dehydratedState={dehydrated} />;
}

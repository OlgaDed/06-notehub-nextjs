// app/notes/[id]/page.tsx
import { QueryClient, dehydrate } from '@tanstack/react-query';
import NoteDetailsClient from './NoteDetails.client';
import { fetchNoteById } from '../../../lib/api';

interface Props {
  params: { id: string };
}

export default async function NoteDetailsPage({ params }: Props) {
  const { id } = params;
  const qc = new QueryClient();

  await qc.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  const dehydrated = dehydrate(qc);

  return <NoteDetailsClient id={id} dehydratedState={dehydrated} />;
}

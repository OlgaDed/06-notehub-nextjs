export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;

  category?: string;
}

export interface NotePayload {
  title: string;
  content: string;
  category?: string;
}

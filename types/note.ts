export interface Note {
  id: string;
  title: string;
  content: string;
  category?: string;
  createdAt: string;
  updatedAt: string;
}

export interface NoteCreatePayload {
  title: string;
  content: string;
  category?: string;
}

export interface NoteUpdatePayload {
  title?: string;
  content?: string;
  category?: string;
}

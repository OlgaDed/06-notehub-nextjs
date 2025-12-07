// types/note.ts

export interface Note {
  id: string;
  title: string;
  content: string;

  category: 'personal' | 'work' | 'education';

  priority?: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt?: string;
}

export interface NoteInput {
  title: string;
  content: string;
  category: 'personal' | 'work' | 'education';

  priority?: 'low' | 'medium' | 'high';
}

export interface Note {
  id: string;
  title: string;
  content: string;
  priority: 'low' | 'medium' | 'high';
  category: 'personal' | 'work' | 'education';
  createdAt: string;
}

export interface NoteInput {
  title: string;
  content: string;
}

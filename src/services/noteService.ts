export interface CreateNotePayload {
  title: string;
  content: string;
  tag: NoteTag;
}

export const fetchNotes = async (
  params: FetchNotesParams = {}
): Promise<FetchNotesResponse> => {
  const { page = 1, perPage = 12, search = '' } = params;

  const { data } = await axiosInstance.get<FetchNotesResponse>('/notes', {
    params: {
      page,
      perPage,
      ...(search && { search }),
    },
  });

  return data;
};

export const createNote = async (
  noteData: CreateNotePayload
): Promise<Note> => {
  const { data } = await axiosInstance.post<Note>('/notes', noteData);
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await axiosInstance.delete<Note>(`/notes/${id}`);
  return data;
};

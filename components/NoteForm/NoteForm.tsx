'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '@/lib/api';
import css from './NoteForm.module.css';

const validationSchema = Yup.object({
  title: Yup.string()
    .min(3, 'Title must be at least 3 characters')
    .max(50, 'Title must be at most 50 characters')
    .required('Title is required'),
  content: Yup.string()
    .min(10, 'Content must be at least 10 characters')
    .required('Content is required'),
});

export default function NoteForm() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  return (
    <div className={css.formWrapper}>
      <h2 className={css.formTitle}>Create New Note</h2>
      <Formik
        initialValues={{ title: '', content: '' }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          mutation.mutate(values, {
            onSuccess: () => resetForm(),
          });
        }}
      >
        {({ isSubmitting }) => (
          <Form className={css.form}>
            <div className={css.field}>
              <label htmlFor="title" className={css.label}>
                Title
              </label>
              <Field
                type="text"
                id="title"
                name="title"
                className={css.input}
                placeholder="Enter note title"
              />
              <ErrorMessage
                name="title"
                component="div"
                className={css.error}
              />
            </div>

            <div className={css.field}>
              <label htmlFor="content" className={css.label}>
                Content
              </label>
              <Field
                as="textarea"
                id="content"
                name="content"
                className={css.textarea}
                placeholder="Enter note content"
                rows={5}
              />
              <ErrorMessage
                name="content"
                component="div"
                className={css.error}
              />
            </div>

            <button
              type="submit"
              className={css.submitButton}
              disabled={isSubmitting || mutation.isPending}
            >
              {mutation.isPending ? 'Creating...' : 'Create Note'}
            </button>

            {mutation.isError && (
              <div className={css.errorMessage}>
                Error creating note. Please try again.
              </div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
}

// components/Modal/Modal.tsx
'use client';

import React from 'react';
import css from './Modal.module.css';

type Props = {
  children: React.ReactNode;
  onClose: () => void;
};

export default function Modal({ children, onClose }: Props) {
  return (
    <div className={css.backdrop} onClick={onClose}>
      <div className={css.modal} onClick={e => e.stopPropagation()}>
        <button
          aria-label="Close"
          style={{
            position: 'absolute',
            right: 8,
            top: 8,
            border: 'none',
            background: 'transparent',
            fontSize: 20,
            cursor: 'pointer',
          }}
          onClick={onClose}
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
}

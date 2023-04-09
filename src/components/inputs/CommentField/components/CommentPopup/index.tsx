import React, { useState } from 'react';

import styles from './CommentPopup.module.css';

interface CommentPopupProps {
  onSubmit: (comment: string) => void;
  onClose: () => void;
}

const CommentPopup: React.FC<CommentPopupProps> = ({ onSubmit, onClose }) => {
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    onSubmit(comment);
    onClose();
  };

  return (
    <div className={styles.popup}>
      <div className={styles.inputWrapper}>
        <input value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Введите комментарий" />
      </div>
      <div className={styles.buttonWrapper}>
        <button onClick={handleSubmit}>Добавить</button>
        <button onClick={onClose}>Отмена</button>
      </div>
    </div>
  );
};

export default CommentPopup;

import React, { useState } from 'react';
import { Field, FieldRenderProps } from 'react-final-form';

import TextField from '../TextField';

import styles from './CommentField.module.css';
import CommentPopup from './components/CommentPopup';

interface CommentFieldProps {
  isQrLoaded: boolean;
}

const CommentField: React.FC<CommentFieldProps> = ({ isQrLoaded }) => {
  const [showPopup, setShowPopup] = useState(false);

  const addComment = (input: FieldRenderProps<string, HTMLElement>['input'], comment: string) => {
    input.onChange(`${input.value}\n${comment}`);
  };

  return (
    <div className={styles.container}>
      <Field name="comment">
        {(props: FieldRenderProps<string, HTMLElement>) => (
          <>
            <TextField {...props} label="Комментарий:" inputType="textarea" disabled={isQrLoaded} />
            {isQrLoaded && !showPopup && (
              <button
                className={styles.addButton}
                onClick={(e) => {
                  e.preventDefault();
                  setShowPopup(true);
                }}
              >
                Добавить комментарий
              </button>
            )}
            {showPopup && (
              <CommentPopup
                onSubmit={(comment) => addComment(props.input, comment)}
                onClose={() => setShowPopup(false)}
              />
            )}
          </>
        )}
      </Field>
    </div>
  );
};

export default CommentField;

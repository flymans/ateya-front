import React, { useState, useEffect, useRef } from 'react';
import { FieldRenderProps } from 'react-final-form';

import EditIcon from '../../../assets/icons/edit.svg';

import styles from './TextField.module.css';

interface TextFieldProps extends FieldRenderProps<string, HTMLElement> {
  label: string;
  disabled?: boolean;
  inputType?: 'input' | 'textarea';
  edit?: { show: boolean; onClick: () => void };
}

const TextField: React.ComponentType<TextFieldProps> = ({
  input,
  meta,
  label,
  disabled,
  inputType = 'input',
  edit,
}) => {
  const [shouldFocus, setShouldFocus] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const inputClassName = inputType === 'textarea' ? `${styles.input} ${styles.inputTextarea}` : styles.input;
  const InputElement =
    inputType === 'textarea' ? (
      <textarea ref={textareaRef} className={inputClassName} disabled={disabled} {...input} />
    ) : (
      <input ref={inputRef} className={inputClassName} type="text" disabled={disabled} {...input} />
    );

  useEffect(() => {
    if (shouldFocus) {
      if (inputType === 'input' && inputRef.current) {
        inputRef.current.focus();
      } else if (inputType === 'textarea' && textareaRef.current) {
        textareaRef.current.focus();
      }
      setShouldFocus(false);
    }
  }, [shouldFocus, inputType]);

  const handleEditClick = () => {
    edit?.onClick();
    setShouldFocus(true);
  };

  return (
    <div className={styles.container}>
      <label className={styles.label}>{label}</label>
      <div className={styles.inputWrapper}>
        {InputElement}
        {edit?.show && <img src={EditIcon} alt="Edit" className={styles.editIcon} onClick={handleEditClick} />}
      </div>
      {meta.error && meta.touched && <span className={styles.error}>{meta.error}</span>}
    </div>
  );
};

export default TextField;

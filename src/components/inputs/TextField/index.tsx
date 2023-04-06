import React from 'react';
import { FieldRenderProps } from 'react-final-form';

import styles from './TextField.module.css';

interface TextFieldProps extends FieldRenderProps<string, HTMLElement> {
  label: string;
  disabled?: boolean;
  inputType?: 'input' | 'textarea';
}

const TextField: React.ComponentType<TextFieldProps> = ({ input, meta, label, disabled, inputType = 'input' }) => {
  const inputClassName = inputType === 'textarea' ? `${styles.input} ${styles.inputTextarea}` : styles.input;
  const InputElement =
    inputType === 'textarea' ? (
      <textarea className={inputClassName} disabled={disabled} {...input} />
    ) : (
      <input className={inputClassName} type="text" disabled={disabled} {...input} />
    );

  return (
    <div className={styles.textField}>
      <label className={styles.label}>{label}</label>
      {InputElement}
      {meta.error && meta.touched && <span className={styles.error}>{meta.error}</span>}
    </div>
  );
};

export default TextField;

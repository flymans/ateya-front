import { Field } from 'react-final-form';

import styles from './FieldWithPreviousValue.module.css';

const FieldWithPreviousValue = ({ previousValue, ...props }) => {
  return (
    <>
      <Field {...props} />
      {previousValue && (
        <span className={styles.previousValue}>
          <b>Предыдущее значение: </b>
          {previousValue}
        </span>
      )}
    </>
  );
};

export default FieldWithPreviousValue;

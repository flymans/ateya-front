import { Field, FieldProps, FieldRenderProps } from 'react-final-form';

import styles from './FieldWithPreviousValue.module.css';

interface FieldWithPreviousValueProps<FieldValue, RenderProps extends FieldRenderProps<FieldValue, HTMLElement>>
  extends FieldProps<FieldValue, RenderProps> {
  previousValue?: string;
}

function FieldWithPreviousValue<FieldValue, RenderProps extends FieldRenderProps<FieldValue, HTMLElement>>({
  previousValue,
  ...props
}: FieldWithPreviousValueProps<FieldValue, RenderProps>) {
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
}

export default FieldWithPreviousValue;

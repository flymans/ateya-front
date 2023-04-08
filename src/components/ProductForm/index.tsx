import React, { useState, useEffect } from 'react';
import { Form, Field } from 'react-final-form';
import { useParams } from 'react-router-dom';

import { useFetchFormData, useSubmitData } from '../../hooks/useProductForm';
import TextField from '../inputs/TextField';

import styles from './ProductForm.module.css';

const ProductForm: React.FC = () => {
  const { qrCodeId = null } = useParams<{ qrCodeId: string }>();
  const initialValues = useFetchFormData(qrCodeId);
  const { handleSubmit, qrCode } = useSubmitData();
  const isQrLoaded = !!qrCodeId;
  const [isPavilionDisabled, setIsPavilionDisabled] = useState(isQrLoaded);

  useEffect(() => {
    setIsPavilionDisabled(isQrLoaded);
  }, [isQrLoaded]);

  return (
    <div className={styles.container}>
      <Form initialValues={initialValues} onSubmit={handleSubmit}>
        {({ handleSubmit, submitting, pristine }) => (
          <form className={styles.form} onSubmit={handleSubmit}>
            <Field
              component={TextField}
              label="Павильон:"
              name="pavilion"
              edit={{
                show: isQrLoaded,
                onClick: () => {
                  setIsPavilionDisabled(false);
                },
              }}
              disabled={isPavilionDisabled}
            />
            <Field component={TextField} label="Тип оборудования:" name="equipmentType" disabled={isQrLoaded} />
            <Field
              label="Комментарий:"
              name="comment"
              component={TextField}
              inputType="textarea"
              disabled={isQrLoaded}
            />
            <Field component={TextField} label="Ответственный:" name="responsible" disabled={isQrLoaded} />
            <button className={styles.button} type="submit" disabled={submitting || pristine}>
              Сохранить
            </button>
          </form>
        )}
      </Form>

      {qrCode && (
        <div className={styles.qr}>
          <hr className={styles.hr} />
          <img src={qrCode} alt={'QR code'} />
        </div>
      )}
    </div>
  );
};

export default ProductForm;

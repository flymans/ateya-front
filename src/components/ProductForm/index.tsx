import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import { useParams } from 'react-router-dom';

import { useFetchFormData, useSubmitData } from '../../hooks/useProductForm';
import FieldWithPreviousValue from '../inputs/FieldWithPreviousValue';
import TextField from '../inputs/TextField';

import styles from './ProductForm.module.css';

const ProductForm: React.FC = () => {
  const { qrCodeId = null } = useParams<{ qrCodeId: string }>();
  const formData = useFetchFormData(qrCodeId);
  const { handleSubmit, qrCode } = useSubmitData();

  const isQrLoaded = !!qrCodeId;
  const [isPavilionDisabled, setIsPavilionDisabled] = useState(isQrLoaded);
  const [isResponsibleDisabled, setIsResponsibleDisabled] = useState(isQrLoaded);

  return (
    <div className={styles.container}>
      <Form initialValues={formData} onSubmit={handleSubmit}>
        {({ handleSubmit, submitting, pristine }) => (
          <form className={styles.form} onSubmit={handleSubmit}>
            <FieldWithPreviousValue
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
              previousValue={formData?.previousValues?.pavilion}
            />

            <Field component={TextField} label="Тип оборудования:" name="equipmentType" disabled={isQrLoaded} />

            <Field
              label="Комментарий:"
              name="comment"
              component={TextField}
              inputType="textarea"
              disabled={isQrLoaded}
            />

            <FieldWithPreviousValue
              component={TextField}
              label="Ответственный:"
              name="responsible"
              edit={{
                show: isQrLoaded,
                onClick: () => {
                  setIsResponsibleDisabled(false);
                },
              }}
              disabled={isResponsibleDisabled}
              previousValue={formData?.previousValues?.responsible}
            />
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

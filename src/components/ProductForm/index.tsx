import React, { useState, useEffect } from 'react';
import { saveDataToPostgreSQL } from '../../utils/api';
import QRCode from 'qrcode';
import { useParams } from 'react-router-dom';
import { Form, Field } from 'react-final-form';
import styles from './ProductForm.module.css';
import { toast } from 'react-toastify';
import TextField from '../inputs/TextField';

interface FormValues {
  pavilion: string;
  equipmentType: string;
  comment: string;
  responsible: string;
}

const ProductForm: React.FC = () => {
  const [qrCode, setQRCode] = useState<string>('');
  const { qrCodeId } = useParams<{ qrCodeId: string }>();
  const [initialValues, setInitialValues] = useState<FormValues>({
    pavilion: '',
    equipmentType: '',
    comment: '',
    responsible: '',
  });

  useEffect(() => {
    if (!qrCodeId) return;
    const fetchFormData = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}products/${qrCodeId}`);
      const data = await response.json();
      setInitialValues(data);
    };
    fetchFormData();
  }, [qrCodeId]);

  const handleSubmit = async (formValues: FormValues) => {
    try {
      const databaseId = await saveDataToPostgreSQL(formValues);

      if (!databaseId) return;

      const qrLink = `${process.env.REACT_APP_FRONT_URL}${databaseId}`;
      const qrCode = await QRCode.toDataURL(qrLink);

      setQRCode(qrCode);
      toast.success('QR успешно сгенерирован', { position: 'bottom-right' });
    } catch (error) {
      toast.error('Ошибка сохранения данных', { position: 'bottom-right' });
    }
  };

  const isFormDisabled = !!qrCodeId;

  return (
    <div className={styles.container}>
      <Form initialValues={initialValues} onSubmit={handleSubmit}>
        {({ handleSubmit, submitting }) => (
          <form className={styles.form} onSubmit={handleSubmit}>
            <Field component={TextField} label="Павильон:" name="pavilion" disabled={isFormDisabled} />
            <Field component={TextField} label="Тип оборудования:" name="equipmentType" disabled={isFormDisabled} />
            <Field
              label="Комментарий"
              name="comment"
              component={TextField}
              inputType="textarea"
              disabled={isFormDisabled}
            />
            <Field component={TextField} label="Ответственный:" name="responsible" disabled={isFormDisabled} />
            <button className={styles.submitBtn} type="submit" disabled={submitting || isFormDisabled}>
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

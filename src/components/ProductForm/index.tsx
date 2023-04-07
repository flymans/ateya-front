import QRCode from 'qrcode';
import React, { useState, useEffect } from 'react';
import { Form, Field } from 'react-final-form';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { saveProductData, getProductData } from '../../services/productService';
import TextField from '../inputs/TextField';

import styles from './ProductForm.module.css';

interface FormValues {
  pavilion: string;
  equipmentType: string;
  comment: string;
  responsible: string;
}

const ProductForm: React.FC = () => {
  const [qrCode, setQRCode] = useState<string>('');
  const [isPavilionDisabled, setIsPavilionDisabled] = useState(true);
  const { qrCodeId } = useParams<{ qrCodeId: string }>();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState<FormValues>({
    pavilion: '',
    equipmentType: '',
    comment: '',
    responsible: '',
  });

  const isQrLoaded = !!qrCodeId;

  useEffect(() => {
    if (!qrCodeId) return;
    const fetchFormData = async () => {
      try {
        const data = await getProductData(qrCodeId);
        setInitialValues(data);

        const qrLink = `${process.env.REACT_APP_FRONT_URL}${qrCodeId}`;
        const qrCode = await QRCode.toDataURL(qrLink);

        setQRCode(qrCode);
      } catch (error) {
        toast.error('QR код не найден');
        navigate('/');
      }
    };
    fetchFormData();
  }, [qrCodeId, navigate]);

  useEffect(() => {
    setIsPavilionDisabled(isQrLoaded);
  }, [isQrLoaded]);

  const handleSubmit = async (formValues: FormValues) => {
    try {
      const databaseId = await saveProductData(formValues);

      if (!databaseId) return;

      const qrLink = `${process.env.REACT_APP_FRONT_URL}${databaseId}`;
      const qrCode = await QRCode.toDataURL(qrLink);

      setQRCode(qrCode);
      toast.success('QR успешно сгенерирован');
    } catch (error) {
      toast.error('Ошибка сохранения данных');
    }
  };

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
            <button className={styles.submitBtn} type="submit" disabled={submitting || pristine}>
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

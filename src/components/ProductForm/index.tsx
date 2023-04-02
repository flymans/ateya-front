import React, { useState, useEffect } from 'react';
import { saveDataToPostgreSQL } from '../../services/postgres.api';
import QRCode from 'qrcode';
import { useParams } from 'react-router-dom';
import { Form, Field } from 'react-final-form';
import './styles.css';

interface FormValues {
  pavilion: string;
  equipmentType: string;
  comment: string;
  responsible: string;
}

const ProductForm: React.FC = () => {
  const [qrCode, setQRCode] = useState<string>('');
  const { id } = useParams<{ id: string }>();
  const [initialValues, setInitialValues] = useState<FormValues>({
    pavilion: '',
    equipmentType: '',
    comment: '',
    responsible: '',
  });

  useEffect(() => {
    const fetchFormData = async () => {
      if (!id) return;
      const response = await fetch(`${process.env.REACT_APP_API_URL}products/${id}`);
      const data = await response.json();
      setInitialValues({
        pavilion: data.pavilion,
        equipmentType: data.equipmentType,
        comment: data.comment,
        responsible: data.responsible,
      });
    };
    fetchFormData();
  }, [id]);

  const handleSubmit = async (formValues: FormValues) => {
    const id = await saveDataToPostgreSQL(formValues);

    const qrLink = `${process.env.REACT_APP_FRONT_URL}${id}`;
    const qrCode = await QRCode.toDataURL(qrLink);

    setQRCode(qrCode);
  };

  const isFormDisabled = !!id;

  return (
    <div className="container">
      <Form initialValues={initialValues} onSubmit={handleSubmit}>
        {({ handleSubmit, submitting }) => (
          <form onSubmit={handleSubmit}>
            <label>
              Павильон:
              <Field<string> name="pavilion" component="input" type="text" disabled={isFormDisabled} />
            </label>
            <label>
              Тип оборудования:
              <Field<string> name="equipmentType" component="input" type="text" disabled={isFormDisabled} />
            </label>
            <label>
              Комментарий:
              <Field<string> name="comment" component="textarea" disabled={isFormDisabled} />
            </label>
            <label>
              Ответственный:
              <Field<string> name="responsible" component="input" type="text" disabled={isFormDisabled} />
            </label>
            <button type="submit" disabled={submitting || isFormDisabled}>
              Сохранить
            </button>
          </form>
        )}
      </Form>

      {qrCode && (
        <div className="qr">
          <hr />
          <img src={qrCode} alt={`QR code: ${id}`} />
        </div>
      )}
    </div>
  );
};

export default ProductForm;
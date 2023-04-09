import React, { useState, useEffect } from 'react';
import { Form, Field } from 'react-final-form';
import { useParams } from 'react-router-dom';

import { ProductData } from '../../common/interfaces';
import { useFetchFormData, useSubmitData } from '../../hooks/useProductForm';
import { dataURLToBlobURL } from '../../utils/dataToBlob';
import { required } from '../../utils/validations';
import Header from '../Header';
import CommentField from '../inputs/CommentField';
import FieldWithPreviousValue from '../inputs/FieldWithPreviousValue';
import TextField from '../inputs/TextField';

import styles from './ProductForm.module.css';

const ProductForm: React.FC = () => {
  const { qrCodeId = null } = useParams<{ qrCodeId: string }>();
  const [qrCode, setQrCode] = useState<string>('');
  const { initialValues, loadData } = useFetchFormData(qrCodeId, setQrCode);
  const { handleSubmit } = useSubmitData(setQrCode);

  const isQrLoaded = !!qrCodeId;
  const [isPavilionDisabled, setIsPavilionDisabled] = useState(isQrLoaded);
  const [isResponsibleDisabled, setIsResponsibleDisabled] = useState(isQrLoaded);

  const onSubmit = async (values: ProductData) => {
    await handleSubmit(values);
    if (isQrLoaded) await loadData();
  };

  useEffect(() => {
    if (isQrLoaded) {
      setIsPavilionDisabled(true);
      setIsResponsibleDisabled(true);
    } else {
      setIsPavilionDisabled(false);
      setIsResponsibleDisabled(false);
    }
  }, [isQrLoaded]);

  return (
    <>
      {isQrLoaded && <Header />}
      <div className={styles.container}>
        <Form initialValues={initialValues} onSubmit={onSubmit}>
          {({ handleSubmit, submitting, pristine, dirtySinceLastSubmit, submitSucceeded }) => {
            const isSubmitDisabled = submitting || pristine || (!dirtySinceLastSubmit && submitSucceeded);
            return (
              <form className={styles.form} onSubmit={handleSubmit}>
                <FieldWithPreviousValue
                  component={TextField}
                  validate={required}
                  label="Павильон:"
                  name="pavilion"
                  edit={{
                    show: isQrLoaded,
                    onClick: () => {
                      setIsPavilionDisabled(false);
                    },
                  }}
                  disabled={isPavilionDisabled}
                  previousValue={initialValues?.previousValues?.pavilion}
                />

                <Field
                  component={TextField}
                  label="Тип оборудования:"
                  name="equipmentType"
                  disabled={isQrLoaded}
                  validate={required}
                />

                <CommentField isQrLoaded={isQrLoaded} />

                <FieldWithPreviousValue
                  component={TextField}
                  label="Ответственный:"
                  name="responsible"
                  validate={required}
                  edit={{
                    show: isQrLoaded,
                    onClick: () => {
                      setIsResponsibleDisabled(false);
                    },
                  }}
                  disabled={isResponsibleDisabled}
                  previousValue={initialValues?.previousValues?.responsible}
                />
                <button className={styles.button} type="submit" disabled={isSubmitDisabled}>
                  Сохранить
                </button>
              </form>
            );
          }}
        </Form>

        {qrCode && (
          <div className={styles.qr}>
            <img src={qrCode} alt={'QR code'} />
            <a href={dataURLToBlobURL(qrCode)} download="qr.png" className={styles.downloadLink}>
              Скачать QR-код
            </a>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductForm;

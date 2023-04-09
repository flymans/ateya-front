import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { ProductData } from '../common/interfaces';
import { createProductData, getProductData, updateProductData } from '../services/productService';

import { generateQrCode } from './utils';

export const useFetchFormData = (qrCodeId: string | null, setQrCode: (qrCode: string) => void) => {
  const [initialValues, setInitialValues] = useState<ProductData>({
    pavilion: '',
    equipmentType: '',
    comment: '',
    responsible: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!qrCodeId) return;
    const fetchFormData = async () => {
      try {
        const data = await getProductData(qrCodeId);
        setInitialValues(data);

        const generatedQrCode = await generateQrCode(qrCodeId);
        setQrCode(generatedQrCode);
      } catch (error) {
        toast.error('QR код не найден');
        navigate('/');
      }
    };
    fetchFormData();
  }, [qrCodeId, navigate, setQrCode]);

  return { initialValues };
};

export const useSubmitData = (setQrCode: (qrCode: string) => void) => {
  const handleSubmit = async ({ id, ...formValues }: ProductData) => {
    try {
      const databaseId = id ? await updateProductData(id, formValues) : await createProductData(formValues);

      if (!databaseId) return;

      const generatedQrCode = await generateQrCode(databaseId);
      setQrCode(generatedQrCode);
      toast.success('QR успешно сгенерирован');
    } catch (error) {
      toast.error('Ошибка сохранения данных');
    }
  };

  return { handleSubmit };
};

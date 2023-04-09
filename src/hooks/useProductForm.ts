import { useState, useEffect, useCallback } from 'react';
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

  const loadData = useCallback(async () => {
    if (!qrCodeId) return;
    try {
      const data = await getProductData(qrCodeId);
      setInitialValues(data);

      const generatedQrCode = await generateQrCode(qrCodeId);
      setQrCode(generatedQrCode);
    } catch (error) {
      toast.error('QR код не найден');
      navigate('/');
    }
  }, [qrCodeId, navigate, setQrCode]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return { initialValues, loadData };
};

export const useSubmitData = (setQrCode: (qrCode: string) => void) => {
  const handleSubmit = async ({ id, ...formValues }: ProductData) => {
    try {
      const isUpdate = !!id;
      const databaseId = isUpdate ? await updateProductData(id, formValues) : await createProductData(formValues);

      if (!databaseId) return;

      const generatedQrCode = await generateQrCode(databaseId);
      setQrCode(generatedQrCode);
      toast.success(isUpdate ? 'Данные успешно обновлены' : 'QR-код сгенерирован');
    } catch (error) {
      toast.error('Ошибка сохранения данных');
    }
  };

  return { handleSubmit };
};

import QRCode from 'qrcode';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { ProductData } from '../common/interfaces';
import { createProductData, getProductData, updateProductData } from '../services/productService';

export function useFetchFormData(qrCodeId: string | null) {
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
      } catch (error) {
        toast.error('QR код не найден');
        navigate('/');
      }
    };
    fetchFormData();
  }, [qrCodeId, navigate]);

  return initialValues;
}

export function useSubmitData() {
  const [qrCode, setQRCode] = useState<string>('');
  const handleSubmit = async ({ id, ...formValues }: ProductData) => {
    try {
      const databaseId = id ? await updateProductData(id, formValues) : await createProductData(formValues);

      if (!databaseId) return;

      const qrLink = `${process.env.REACT_APP_FRONT_URL}${databaseId}`;
      const qrCode = await QRCode.toDataURL(qrLink);

      setQRCode(qrCode);
      toast.success('QR успешно сгенерирован');
    } catch (error) {
      toast.error('Ошибка сохранения данных');
    }
  };

  return { handleSubmit, qrCode };
}

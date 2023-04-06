import api from '../utils/api';

interface ProductData {
  pavilion: string;
  equipmentType: string;
  comment: string;
  responsible: string;
}

export const saveProductData = async (productData: ProductData): Promise<string> => {
  const { data } = (await api.post('products', productData)) || {};
  return data;
};

export const getProductData = async (qrCodeId: string): Promise<ProductData> => {
  const { data } = (await api.get(`products/${qrCodeId}`)) || {};
  return data;
};

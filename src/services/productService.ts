import api from '../utils/api';

interface ProductData {
  pavilion: string;
  equipmentType: string;
  comment: string;
  responsible: string;
}

export const createProductData = async (productData: ProductData): Promise<string> => {
  const { data } = (await api.post('products', productData)) || {};
  return data;
};

export const getProductData = async (qrCodeId: string): Promise<ProductData> => {
  const { data } = (await api.get(`products/${qrCodeId}`)) || {};
  return data;
};

export const updateProductData = async (id: string, productData: ProductData): Promise<string> => {
  const { data } = (await api.put(`products/${id}`, productData)) || {};
  return data;
};

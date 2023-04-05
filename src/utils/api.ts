interface ProductData {
  pavilion: string;
  equipmentType: string;
  comment: string;
  responsible: string;
}

export const saveDataToPostgreSQL = async (data: ProductData): Promise<string> => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const id = await response.text();
  return id;
};

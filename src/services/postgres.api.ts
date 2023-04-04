interface ProductData {
  pavilion: string;
  equipmentType: string;
  comment: string;
  responsible: string;
}

export const saveDataToPostgreSQL = async (data: ProductData) => {
  try {
    console.log(process.env.REACT_APP_API_URL);
    console.log(process.env.REACT_APP_FRONT_URL);
    console.log(process.env.NODE_ENV);
    const response = await fetch(`${process.env.REACT_APP_API_URL}products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const id = await response.text();
    return id;
  } catch (error) {
    console.error("Error saving data to PostgreSQL", error);
  }
};

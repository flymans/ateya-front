interface ProductData {
  pavilion: string;
  equipmentType: string;
  comment: string;
  responsible: string;
}

export const saveDataToPostgreSQL = async (data: ProductData) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const id = await response.text();
    console.log(id);
    return id;
  } catch (error) {
    console.error("Error saving data to PostgreSQL", error);
  }
};

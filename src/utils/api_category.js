import axios from "axios";

const API_URL = "http://localhost:8888";

export const getCategory = async () => {
  try {
    const response = await axios.get(API_URL + "/category");
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};

export const addNewCategory = async (data) => {
  const response = await axios.post(
    `${API_URL}/category`, // url of the POST API
    JSON.stringify(data), // data you want to pass through the API in JSON format
    {
      headers: {
        "Content-Type": "application/json", // telling the API you are sending JSON data
        Authorization: `Bearer ${data.token}`,
      },
    }
  );
  return response.data;
};

export const deleteCategory = async (data) => {
  try {
    const response = await axios.delete(`${API_URL}/category/${data.id}`, {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};

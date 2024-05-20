import axios from "axios";

const API_URL = "http://localhost:8888";

export const getProducts = async (category, perPage, page) => {
  try {
    let params = {
      perPage: perPage,
      page: page,
    };
    if (category !== "all") {
      params.category = category;
    }

    const queries = new URLSearchParams(params);
    const response = await axios.get(
      API_URL + "/products?" + queries.toString()
    );
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};

export const getProduct = async (id) => {
  try {
    const response = await axios.get(API_URL + "/products/" + id);
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};

export const getCategories = async () => {
  try {
    const response = await axios.get(API_URL + "/category");
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};

export const addProduct = async (data) => {
  const response = await axios.post(
    `${API_URL}/products`, // url of the POST API
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

export const updateProduct = async (data) => {
  const response = await axios.put(
    `${API_URL}/products/${data.id}`,
    JSON.stringify(data), // data you want to pass through the API in JSON format
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.token}`,
      },
    }
  );
  return response.data;
};

export const deleteProduct = async (data) => {
  try {
    const response = await axios.delete(`${API_URL}/products/${data.id}`, {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};

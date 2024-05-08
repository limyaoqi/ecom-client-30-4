import axios from "axios";

const API_URL = "http://localhost:8888";

export const getOrders = async () => {
  try {
    const response = await axios.get(API_URL + "/orders");
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};

export const addNewOrder = async (data) => {
  const response = await axios.post(
    `${API_URL}/orders`, // url of the POST API
    JSON.stringify(data), // data you want to pass through the API in JSON format
    {
      headers: {
        "Content-Type": "application/json", // telling the API you are sending JSON data
      },
    }
  );
  return response.data;
};

export const updateOrder = async (data) => {
  const response = await axios.put(
    `${API_URL}/orders/${data._id}`,
    JSON.stringify(data), // data you want to pass through the API in JSON format
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const deleteOrder = async (id) => {
  try {
    const response = await axios.delete(API_URL + "/orders/" + id);
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};

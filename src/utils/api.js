import axios from "axios";

const API_URL = "http://localhost:8888";

export const getProducts = async (category) => {
  try {
    let params = {};
    if (category !== "all") {
      params.category = category;
    }

    const queries = new URLSearchParams(params);
    const response = await axios.get(API_URL + "/products?" + queries.toString());
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

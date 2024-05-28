import axios from "axios";

import { API_URL } from "./data";
export const verifyPayment = async (data) => {
  try {
    const response = await axios.post(
      `${API_URL}/payment`,
      JSON.stringify(data),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};

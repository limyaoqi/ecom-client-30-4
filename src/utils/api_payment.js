import axios from "axios";

const API_URL = "http://localhost:8888";

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

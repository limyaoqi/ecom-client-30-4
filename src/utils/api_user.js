import axios from "axios";

import { API_URL } from "./data";
export const userLogin = async (data) => {
  const response = await axios.post(
    `${API_URL}/users/login`,
    JSON.stringify(data),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const userSignup = async (data) => {
  const response = await axios.post(
    `${API_URL}/users/signup`,
    JSON.stringify(data),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

import axios from "axios";

import { API_URL } from "./data";
export const uploadImage = async (image) => {
  try {
    const formData = new FormData();
    formData.append("image", image);
    const res = await axios.post(`${API_URL}/images`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    console.log("error", error);
  }
};

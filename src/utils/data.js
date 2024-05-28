export const API_URL =
  process.env.NODE_ENV === "production"
    ? "http://10.1.104.8:8888"
    : "http://localhost:8888";

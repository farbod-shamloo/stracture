import api from "./axios";

const Application = async () => {
  try {
    const res = await api.get("/v1/Application");
    return res.data;  // دیتا برگردانده میشه
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export default Application;

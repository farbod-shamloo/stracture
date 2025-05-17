import api from "./axios";

const Application = async () => {
  try {
    const res = await api.get("/v1/Application");
    return res.data || []; // فقط آرایه‌ی سامانه‌ها رو برمی‌گردونه
  } catch (error) {
    console.error("API Error:", error);
    return [];
  }
};

export default Application;

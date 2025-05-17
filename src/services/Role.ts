// services/Role.ts
import api from "./axios";

const Role = async () => {
  try {
    const res = await api.get("/v1/Role");
    return res.data;
  } catch (error) {
    console.error("Role API Error:", error);
    throw error;
  }
};

export default Role;

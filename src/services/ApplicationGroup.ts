// services/ApplicationGroup.ts
import api from "./axios";

const ApplicationGroup = async () => {
  try {
    const res = await api.get("/v1/ApplicationGroup");
    return res.data;
  } catch (error) {
    console.error("ApplicationGroup API Error:", error);
    throw error;
  }
};

export default ApplicationGroup;

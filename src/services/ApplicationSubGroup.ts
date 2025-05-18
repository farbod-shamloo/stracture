
import api from "./axios";

const ApplicationSubGroup = async () => {
  try {
    const res = await api.get("/v1/ApplicationSubGroup");
    return res.data;
  } catch (error) {
    console.error("ApplicationGroup API Error:", error);
    throw error;
  }
};

export default ApplicationSubGroup;

// services/getCurrentUsers.ts
import api from "./axios";

const FilterUser = async (searchKey: string = "") => {
  try {
    const res = await api.get("/v1/User/GetAllByFilter", {
      params: {
        search: searchKey,
      },
    });
    if (res.data.isSuccess) {
      return res.data.data; // فقط قسمت data شامل items و pagination
    } else {
      return null;
    }
  } catch (error) {
    console.error("API Error:", error);
    return null;
  }
};


export default FilterUser;

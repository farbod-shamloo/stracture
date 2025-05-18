// services/getCurrentUsers.ts
import api from "./axios";

const FilterUser = async (searchKey: string, pageIndex: number, pageSize: number, filters) => {
  try {
    const res = await api.get("/v1/User/GetAllByFilter", {
      params: {
        search: searchKey,
        pageIndex,
        pageSize,
        ...filters
      },
    });
    if (res.data.isSuccess) {
      return res.data.data; // انتظار میره data شامل items و pagination باشه
    } else {
      return null;
    }
  } catch (error) {
    console.error("API Error:", error);
    return null;
  }
};



export default FilterUser;

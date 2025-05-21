
import axios from "axios";

export const getUserById = async (id: string) => {
  try {
    const res = await axios.get(`https://gw.tehrantc.com/ssotest/api/v1/User/${id}`);
    return res.data.data;
  } catch (error) {
    console.error("خطا در دریافت اطلاعات کاربر:", error);
    throw error;
  }
};

// src/api/postuser.ts
import axios from "axios";

interface UserPayload {
  isEditMode: boolean;
  id?: string;
  values: any;
}

const genderMap: Record<string, string> = {
  مرد: "1",
  زن: "2",
  دیگر: "0",
};

const statusMap: Record<string, string> = {
  فعال: "1",
  غیرفعال: "0",
};

const typeMap: Record<string, string> = {
  شهروند: "0",
  سازمانی: "1",
  ldap: "2",
};

export const submitUser = async ({ isEditMode, id, values }: UserPayload) => {
  const formData = new FormData();

  if (isEditMode && id) {
    formData.append("Id", id);
  }

  // مپ کلیدها به مپ مقدارها
  const maps: Record<string, Record<string, string>> = {
    gender: genderMap,
    status: statusMap,
    userType: typeMap,
    EstekhdamUserType: typeMap,
  };

  Object.entries(values).forEach(([key, val]) => {
    let valueToAppend = val;

    if (maps[key]) {
      if (typeof val === "string" && maps[key][val] !== undefined) {
        valueToAppend = maps[key][val];
      }
    } else if (key === "twoFactorEnabled") {
      // بولین رو به رشته تبدیل کن
      valueToAppend = val ? "true" : "false";
    } else if (key === "birthDate" && val) {
      // تاریخ رو به فرمت yyyy-mm-dd تبدیل کن
      valueToAppend = val.toISOString().split("T")[0];
    }


    if (key === "password" && isEditMode) return;

    formData.append(key, valueToAppend ?? "");
  });

  for (const [key, value] of formData.entries()) {
    console.log(`${key}: ${value}`);
  }

  const method = isEditMode ? axios.put : axios.post;

  const response = await method(
    "https://gw.tehrantc.com/ssotest/api/v1/User",
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );

  return response;
};

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

export const submitUser = async ({ isEditMode, id, values }: UserPayload) => {
  const formData = new FormData();

  if (isEditMode && id) {
    formData.append("Id", id);
  }

  formData.append("UserName", values.userName || "");

  if (!isEditMode) {
    formData.append("Password", values.password || "");
  }

  formData.append("FirstName", values.firstName || "");
  formData.append("LastName", values.lastName || "");
  formData.append("FatherName", values.fatherName || "");
  formData.append("Gender", genderMap[values.gender] ?? "0");
  formData.append("Email", values.email || "");
  formData.append("Mobile", values.mobile || "");
  formData.append("NationalCode", values.nationalCode || "");

  formData.append(
    "BirthDate",
    values.birthDate ? values.birthDate.toISOString().split("T")[0] : ""
  );

  // برای دیباگ
  for (const [key, value] of formData.entries()) {
    console.log(`${key}: ${value}`);
  }

  const url = isEditMode
    ? `https://gw.tehrantc.com/ssotest/api/v1/User/${id}`
    : "https://gw.tehrantc.com/ssotest/api/v1/User";

  const method = isEditMode ? axios.put : axios.post;

  const response = await method(url, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response;
};
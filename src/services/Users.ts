import api from "../utils/axios";

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
  سازمانی: "0",
  شهروند: "1",
  ldap: "2",
};

export const submitUser = ({
  isEditMode,
  id,
  values,
}: UserPayload): Promise<any> => {
  return new Promise((resolve, reject) => {
    const formData = new FormData();

    if (isEditMode && id) {
      formData.append("Id", id);
    }

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
    valueToAppend = val ? "true" : "false";
  } else if (key === "birthDate" && val) {
    valueToAppend = val.toISOString().split("T")[0];
  } else if (key === "AvatarFileStream" || key === "AvatarFile") {
    valueToAppend = val[0].originFileObj;
  }

  if (key === "password" && isEditMode) return;

  if (isEditMode && key === "AvatarFileStream") {
    formData.append("AvatarFileStream", valueToAppend ?? "");
  }

  else if (!isEditMode && key === "AvatarFile") {
    formData.append("AvatarFile", valueToAppend ?? "");
  }

  else if (key !== "AvatarFileStream" && key !== "AvatarFile") {
    formData.append(key, valueToAppend ?? "");
  }
});

    const method = isEditMode ? api.put : api.post;

    method("/v1/User", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => resolve(res))
      .catch((err) => {
        console.error("خطا در ثبت یا ویرایش کاربر:", err);
        reject(err);
      });
  });
};

export const deleteUser = (userId: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    api
      .delete("/v1/User", {
        data: { userId },
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => resolve(res.data))
      .catch((err) => {
        console.error("خطا در حذف کاربر:", err);
        reject(err);
      });
  });
};

export const getUserById = (id: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    api
      .get(`/v1/User/${id}`)
      .then((res) => resolve(res.data.data))
      .catch((err) => {
        console.error("خطا در دریافت اطلاعات کاربر:", err);
        reject(err);
      });
  });
};

export const getAllByFilter = (
  searchKey: string,
  pageIndex: number,
  pageSize: number,
  filters: Record<string, any>
): Promise<any> => {
  return new Promise((resolve, reject) => {
    console.log("Sent filters:", filters);
    api
      .get("/v1/User/GetAllByFilter", {
        params: {
          search: searchKey,
          pageIndex,
          pageSize,
          ...filters,
        },
      })
      .then((res) => {
        if (res.data.isSuccess) {
          resolve(res.data.data);
        } else {
          resolve(null);
        }
      })
      .catch((err) => {
        console.error("API Error:", err);
        reject(err);
      });
  });
};

export const getCurrentUsers = (): void => {
  new Promise((resolve, reject) => {
    api
      .get("/v1/User/GetCurrentUser")
      .then((res) => {
        console.log(res.data);
        resolve(res.data);
      })
      .catch((err) => {
        console.error("API Error:", err);
        reject(err);
      });
  });
};

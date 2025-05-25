import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Upload, message, Drawer } from "antd";

import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { toast } from "react-toastify";


import { getUserById, submitUser } from "../../../services/Users";
import Icon, { CloseOutlined } from "@ant-design/icons";
import FormComponent from "./Form";

const reverseGenderMap: Record<string, string> = {
  "1": "مرد",
  "2": "زن",
  "0": "دیگر",
};

const reverseStatusMap: Record<string, string> = {
  "0": "غیرفعال",
  "1": "فعال",
};

const reverseTypeMap: Record<string, string> = {
  "0": "سازمانی",
  "1": "شهروند",
  "2": "ldap",
};

const AddEditUser = () => {
  const { id } = useParams();
  const isEditMode = !!id;
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [nationalCodeValue, setNationalCodeValue] = useState("");
  const [enabled, setEnabled] = useState(false);
  const [userType, setUserType] = useState("شهروند");
  const [drawerOpen, setDrawerOpen] = useState(false);

  
  const { data: userData, isLoading } = useQuery({
    queryKey: ["user", id],
    queryFn: () => getUserById(id),
    enabled: !!id,
  });
  
  
  useEffect(() => {
    if(userData) {
     const base64Type = userData.avatarBase64?.startsWith('/9j/') ? 'image/jpeg' : 'image/png';
      form.setFieldsValue({
        nationalCode: userData.nationalCode || "",
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        fatherName: userData.fatherName || "",
        mobile: userData.mobile || "",
        birthDate: userData.birthDate ? dayjs(userData.birthDate) : null,
        email: userData.email || "",
        gender: reverseGenderMap[userData.gender] || "",
        status: reverseStatusMap[userData.status] || "",
        userType: reverseTypeMap[userData.type] || "",
        userName: userData.userName || "",
        twoFactorEnabled: userData.twoFactorEnabled || false,
        smsWebServiceAccess: userData.smsWebServiceAccess || false,
        allowedLoginStartTime: userData.allowedLoginStartTime
        ? dayjs(userData.allowedLoginStartTime, "HH:mm")
        : null,
        allowedLoginEndTime: userData.allowedLoginEndTime
        ? dayjs(userData.allowedLoginEndTime, "HH:mm")
        : null,
          AvatarFileStream: userData.avatarBase64
    ? [{
        uid: '-1',
        name: 'avatar.png',
        status: 'done',
        url: `data:${base64Type};base64,${userData.avatarBase64}`,
      }]
    : [],
       
      });

      setNationalCodeValue(userData.nationalCode);
      setUserType(userData.userType);
    }
  }, [userData, form]);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const response = await submitUser({ isEditMode, id, values });

      if (response.status === 200 || response.status === 201) {
        toast.success(
          isEditMode
            ? "کاربر با موفقیت ویرایش شد!"
            : "کاربر با موفقیت اضافه شد!"
        );
        navigate("/panel/users");
      } else {
        toast.error("خطا در انجام عملیات");
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "خطای ناشناخته هنگام ارسال اطلاعات";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const beforeUpload = (file) => {
    const isValidType = file.type === "image/png" || file.type === "image/jpeg";
    if (!isValidType) {
      message.error("فرمت فایل باید PNG یا JPG باشد");
      return Upload.LIST_IGNORE;
    }
    const isLt320KB = file.size / 1024 < 320;
    if (!isLt320KB) {
      message.error("حجم فایل نباید بیشتر از 320 کیلوبایت باشد");
      return Upload.LIST_IGNORE;
    }
    return true;
  };

  return (
    <div className="">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl">
          {isEditMode
            ? `${form.getFieldValue("firstName") || ""} ${
                form.getFieldValue("lastName") || ""
              }`
            : "ثبت کاربر"}
        </h1>
        <button
          onClick={() => navigate(-1)}
          className="text-sm bg-gray-200 hover:bg-gray-300 px-4 py-1 rounded"
        >
          بازگشت
        </button>
      </div>

      <FormComponent
        form={form}
        onFinish={onFinish}
        loading={loading}
        isEditMode={isEditMode}
        nationalCodeValue={nationalCodeValue}
        setNationalCodeValue={setNationalCodeValue}
        userType={userType}
        setUserType={setUserType}
        enabled={enabled}
        setEnabled={setEnabled}
        setDrawerOpen={setDrawerOpen}
        userData={userData}
      />
      <Drawer
        placement="left"
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
        width={520}
        closeIcon={null}
        title={null}
        headerStyle={{
          padding: "16px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row-reverse",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            paddingBottom: "20px",
          }}
        >
          <div style={{ fontWeight: "bold", fontSize: 16 }}>راهنما</div>
          <CloseOutlined
            onClick={() => setDrawerOpen(false)}
            style={{ fontSize: 18, color: "red", cursor: "pointer" }}
          />
        </div>

        <hr className="text-gray-300" />

        <div className="flex flex-col items-center justify-center text-center pt-10">
          <Icon
            icon="fluent:layer-diagonal-person-20-regular"
            width="56"
            height="56"
            color="#17a2b8"
          />
          <span className="text-[#088f99] text-[20px] mt-2">
            سمــت کـــــاربر
          </span>
        </div>
        <div className="mt-10 text-[16px]">
          <p>
            - منظور از سمت، موقعیت کاربر در چارت سازمانی مورد نظر است مانند
            مدیرکل، مدیر عامل، کارشناس، معاون مالی و ....
          </p>
          <br />
          <p>- سمت‌ها در بخش مدیریت درختواره قابل تعریف و ویرایش هستند</p>
          <p>
            - با تعیین سمت کاربر می‌توانید موقعیت کاربر در گراف و درخت سازمانی
            را مشاهده کنید
          </p>
          <br />
          <p>
            - با ثبت سمت می‌توانید از ویژگی دسترسی به سامانه با استفاده از سمت
            را استفاده کنید
          </p>
          <br />
          <p>
            - در قسمت مدیریت سمت‌ها نیز می‌توانید کاربر مورد نظر را به سمت
            دلخواه خود متصل کنید
          </p>
        </div>
      </Drawer>
    </div>
  );
};

export default AddEditUser;

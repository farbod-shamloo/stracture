import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CloseOutlined } from "@ant-design/icons";

import axios from "axios";
import {
  Button,
  Form,
  Input,
  Radio,
  DatePicker,
  Divider,
  Upload,
  message,
  Drawer,
  Select,
} from "antd";

import { InboxOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Icon } from "@iconify/react/dist/iconify.js";

const { Option } = Select;
const { Dragger } = Upload;

const AddEditUser = () => {
  const { id } = useParams();
  const isEditMode = !!id;
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [nationalCodeValue, setNationalCodeValue] = useState("");
  const [userType, setUserType] = useState("شهروند");
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (isEditMode) {
      axios
        .post("https://gw.tehrantc.com/ssotest/api/v1/User/User", {
          id,
          name: "",
          nationalCode: "",
          userName: "",
          pageNumber: 1,
          pageSize: 1,
        })
        .then((res) => {
          const user = res.data.data[0];
          form.setFieldsValue({
            name: user.name,
            nationalCode: user.nationalCode,
            userName: user.userName,
            userType: user.userType || null,
            // سایر فیلدها را اضافه کنید
          });
          setUserType(user.userType || null);
          setNationalCodeValue(user.nationalCode || "");
        })
        .catch((err) => {
          console.error("خطا در گرفتن اطلاعات:", err);
        });
    }
  }, [id, form]);

  const onFinish = async (values) => {
    console.log(values);
    setLoading(true);
    try {
      if (isEditMode) {
        await axios.put("https://gw.tehrantc.com/ssotest/api/v1/User/Update", {
          id,
          ...values,
        });
        message.success("ویرایش با موفقیت انجام شد");
      } else {
        await axios.post(
          "https://gw.tehrantc.com/ssotest/api/v1/User/Add",
          values
        );
        message.success("ثبت با موفقیت انجام شد");
      }
      navigate("/panel/users");
    } catch (err) {
      console.error("خطا:", err);
      message.error("خطا در عملیات");
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
        <h1 className="text-xl font-bold">
          {isEditMode ? "ویرایش کاربر" : "ثبت کاربر"}
        </h1>
        <button
          onClick={() => navigate(-1)}
          className="text-sm bg-gray-200 hover:bg-gray-300 px-4 py-1 rounded"
        >
          بازگشت
        </button>
      </div>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
        style={{ rowGap: "8px" }}
      >
        <div className="col-span-1 md:col-span-4">
          <Divider
            orientation="right"
            orientationMargin="0"
            sx={{ fontSize: "12px" }}
          >
            اطلاعات عمومی
          </Divider>
        </div>

        <div className="col-span-1">
          <Form.Item
            name="nationalCode"
            label="کد ملی"
            rules={[
              { required: true, message: "کد ملی را وارد کنید" },
              {
                pattern: /^\d{10}$/,
                message: "کد ملی باید ۱۰ رقم عدد باشد",
              },
            ]}
          >
            <Input
              style={{ backgroundColor: "#fafafa", padding: "8px" }}
              maxLength={10}
              value={nationalCodeValue}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, "").slice(0, 10);
                setNationalCodeValue(val);
                form.setFieldsValue({ nationalCode: val });
              }}
              suffix={`${nationalCodeValue.length}/10`}
              inputMode="numeric" // موبایل فقط عدد
              pattern="[0-9]*"
            />
          </Form.Item>
        </div>

        <div className="col-span-1">
          <Form.Item
            name="name"
            label="نام"
            rules={[{ required: true, message: "نام را وارد کنید" }]}
          >
            <Input style={{ backgroundColor: "#fafafa", padding: "8px" }} />
          </Form.Item>
        </div>

        <div className="col-span-1">
          <Form.Item
            name="lastName"
            label="نام خانوادگی"
            rules={[{ required: true, message: "نام خانوادگی را وارد کنید" }]}
          >
            <Input style={{ backgroundColor: "#fafafa", padding: "8px" }} />
          </Form.Item>
        </div>

        <div className="col-span-1">
          <Form.Item
            name="fatherName"
            label="نام پدر"
            rules={[{ required: true, message: "نام پدر را وارد کنید" }]}
          >
            <Input style={{ backgroundColor: "#fafafa", padding: "8px" }} />
          </Form.Item>
        </div>

        <div className="col-span-1">
          <Form.Item
            name="mobile"
            label="موبایل"
            rules={[
              { required: true, message: "موبایل را وارد کنید" },
              { pattern: /^\d+$/, message: "موبایل باید فقط شامل عدد باشد" },
            ]}
          >
            <Input
              style={{ backgroundColor: "#fafafa", padding: "8px" }}
              inputMode="numeric"
              pattern="[0-9]*"
            />
          </Form.Item>
        </div>

        <div className="col-span-1">
          <Form.Item name="birthDate" label="تاریخ تولد">
            <DatePicker
              format="YYYY-MM-DD"
              style={{
                width: "100%",
                backgroundColor: "#fafafa",
                padding: "8px",
              }}
            />
          </Form.Item>
        </div>
        <Form.Item
          name="email"
          label="ایمیل"
          rules={[
            { required: true, message: "لطفاً ایمیل را وارد کنید" },
            { type: "email", message: "ایمیل معتبر نیست" },
          ]}
        >
          <Input style={{ backgroundColor: "#fafafa", padding: "8px" }} />
        </Form.Item>
        <div className="col-span-1">
          <Form.Item name="gender" label="جنسیت">
            <Radio.Group>
              <Radio value="مرد">مرد</Radio>
              <Radio value="زن">زن</Radio>
            </Radio.Group>
          </Form.Item>
        </div>

        <div className="col-span-1 md:col-span-4 text-right">
          <Divider orientation="right" orientationMargin="0">
            اطلاعات سامانه
          </Divider>
        </div>

        <div className="col-span-1 md:col-span-4">
          <Form.Item
            name="userType"
            label="نوع کاربر"
            rules={[{ required: true, message: "نوع کاربر را انتخاب کنید" }]}
          >
            <Radio.Group
              onChange={(e) => setUserType(e.target.value)}
              value={userType}
            >
              <Radio value="شهروند">شهروند</Radio>
              <Radio value="سازمانی">سازمانی</Radio>
              <Radio value="ldap">LDAP</Radio>
            </Radio.Group>
          </Form.Item>
        </div>

        {userType === "سازمانی" && (
          <>
            <div className="col-span-1 md:col-span-4 text-right">
              <Divider orientation="right" orientationMargin="0">
                اطلاعات سازمانی
              </Divider>
            </div>
            <div className="col-span-1 md:col-span-2">
              <div>
                <span>سمت ها</span>
                <span
                  className="bg-[#08919a] text-white rounded-[5px] text-[12px] mr-[10px] p-0.5 cursor-pointer"
                  onClick={() => setDrawerOpen(true)}
                >
                  راهنما
                </span>
              </div>
            </div>
          </>
        )}

        <>
          <div className="col-span-1 md:col-span-4 text-right">
            <Divider orientation="right" orientationMargin="0">
              تصاویر
            </Divider>
          </div>
          <div className="col-span-1 md:col-span-2">
            <Form.Item
              name="userImage"
              label="تصویر کاربر"
              valuePropName="fileList"
              getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
              rules={[{ required: true, message: "تصویر کاربر را آپلود کنید" }]}
            >
              <Upload.Dragger
                name="file"
                multiple={false}
                maxCount={1}
                accept=".png,.jpg,.jpeg"
                listType="picture"
                beforeUpload={() => false}
                showUploadList={{
                  showPreviewIcon: false,
                  showDownloadIcon: false,
                  showRemoveIcon: true,
                }}
                className="!border-dashed !border-gray-300 !rounded-2xl !p-6 hover:!border-gray-400"
              >
                <div className="flex flex-col items-center justify-center text-center text-gray-600 space-y-2">
                  <InboxOutlined className="text-4xl text-gray-400" />
                  <div className="font-semibold">
                    برای بارگذاری کلیک کنید یا فایل را بکشید
                  </div>
                  <div className="text-sm text-gray-500">
                    پسوندهای مجاز:{" "}
                    <span className="font-medium text-gray-600">
                      .png, .jpg
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">
                    حداکثر حجم فایل: 320 KB
                  </div>
                </div>
              </Upload.Dragger>
            </Form.Item>
          </div>

          <div className="col-span-1 md:col-span-2">
            <Form.Item
              name="signatureImage"
              label="تصویر امضا"
              valuePropName="fileList"
              getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
              rules={[{ required: true, message: "تصویر امضا را آپلود کنید" }]}
            >
              <Upload.Dragger
                name="file"
                multiple={false}
                beforeUpload={() => false}
                maxCount={1}
                accept=".png,.jpg,.jpeg"
                listType="picture"
                showUploadList={{
                  showPreviewIcon: false,
                  showDownloadIcon: false,
                  showRemoveIcon: true,
                }}
                className="!border-dashed !border-gray-300 !rounded-2xl !p-6 hover:!border-gray-400"
              >
                <div className="flex flex-col items-center justify-center text-center text-gray-600 space-y-2">
                  <InboxOutlined className="text-4xl text-gray-400" />
                  <div className="font-semibold">
                    برای بارگذاری کلیک کنید یا فایل را بکشید
                  </div>
                  <div className="text-sm text-gray-500">
                    پسوندهای مجاز:{" "}
                    <span className="font-medium text-gray-600">
                      .png, .jpg
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">
                    حداکثر حجم فایل: 320 KB
                  </div>
                </div>
              </Upload.Dragger>
            </Form.Item>
          </div>
        </>

        <div className="col-span-1 md:col-span-4 fixed bottom-0 left-0 w-[89.6%] bg-white p-4 z-50 shadow-[0_-4px_12px_rgba(0,0,0,0.1)] text-left">
          <Button
            onClick={() => navigate(-1)}
            style={{
              backgroundColor: "#f4f5f5",
              padding: "19px 20px",
              marginLeft: "10px",
              border: "none",
            }}
            className=""
          >
            انصراف
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            style={{ backgroundColor: "#0d56a3", padding: "19px 50px" }}
            loading={loading}
            className=""
          >
            {loading
              ? "در حال ارسال..."
              : isEditMode
              ? "ویرایش کاربر"
              : "ثبت و ذخیره"}
          </Button>
        </div>
      </Form>

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

        {/* <i className="fa-solid fa-user-gear text-7xl text-info text-[3rem] text-[#088f99]"></i> */}
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

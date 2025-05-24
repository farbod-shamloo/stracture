import React from "react";
import {
  Form,
  Input,
  Button,
  Divider,
  Radio,
  DatePicker,
  Upload,
  Switch,
  TimePicker,
} from "antd";
import { InboxOutlined } from "@ant-design/icons";
import AllowedIPInput from "./Ip";

const FormComponent = ({
  form,
  onFinish,
  loading,
  isEditMode,
  nationalCodeValue,
  setNationalCodeValue,
  userType,
  setUserType,
  enabled,
  setEnabled,
  setDrawerOpen,
}) => {
  return (
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
            { pattern: /^\d{10}$/, message: "کد ملی باید ۱۰ رقم عدد باشد" },
          ]}
        >
          <Input
            disabled={isEditMode}
            style={{ backgroundColor: "#fafafa", padding: "8px" }}
            maxLength={10}
            value={nationalCodeValue}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, "").slice(0, 10);
              setNationalCodeValue(val);
              form.setFieldsValue({ nationalCode: val });
            }}
            suffix={`${nationalCodeValue.length}/10`}
            inputMode="numeric"
            pattern="[0-9]*"
          />
        </Form.Item>
      </div>

      <div className="col-span-1">
        <Form.Item
          name="firstName"
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

      <div className="col-span-1">
        <Form.Item
          name="email"
          label="ایمیل"
          rules={[{ type: "email", message: "ایمیل معتبر نیست" }]}
        >
          <Input style={{ backgroundColor: "#fafafa", padding: "8px" }} />
        </Form.Item>
      </div>

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
        <div className="flex justify-between w-[90%] ">
          <Form.Item name="status" label="وضعیت" style={{ flex: 1 }}>
            <Radio.Group>
              <Radio value="فعال">فعال</Radio>
              <Radio value="غیرفعال">غیرفعال</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            name="twoFactorEnabled"
            label="ورود دو مرحله"
            style={{ flex: 1 }}
          >
            <Radio.Group>
              <Radio value={true}>فعال</Radio>
              <Radio value={false}>غیرفعال</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            name="smsWebServiceAccess"
            label="دسترسی به وب سرویس"
            style={{ flex: 1 }}
          >
            <Radio.Group>
              <Radio value={true}>دارد</Radio>
              <Radio value={false}>ندارد</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item name="userType" label="نوع کاربر" style={{ flex: 1 }}>
            <Radio.Group onChange={(e) => setUserType(e.target.value)}>
              <Radio value="شهروند">شهروند</Radio>
              <Radio value="سازمانی">سازمانی</Radio>
              <Radio value="ldap">LDAP</Radio>
            </Radio.Group>
          </Form.Item>
        </div>

        <div style={{ display: "flex", gap: "16px" }}>
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <Form.Item
              name="userName"
              label="نام کاربری"
              rules={[
                { required: true, message: "لطفاً نام کاربری را وارد کنید" },
              ]}
            >
              <Input
                style={{ backgroundColor: "#fafafa", padding: "8px" }}
                maxLength={11}
                disabled={isEditMode}
              />
            </Form.Item>

            {!isEditMode && (
              <Form.Item
                name="passwordRepeat"
                label="تکرار رمز عبور"
                rules={[
                  { required: true, message: "لطفاً رمز عبور را وارد کنید" },
                ]}
              >
                <Input.Password
                  style={{ backgroundColor: "#fafafa", padding: "8px" }}
                />
              </Form.Item>
            )}
          </div>

          <div style={{ flex: 1 }}>
            <Form.Item name="sabtAhvalEstelam" label="استعلام ثبت احوال">
              <Input
                disabled
                style={{ backgroundColor: "#fafafa", padding: "8px" }}
              />
            </Form.Item>
          </div>

          <div style={{ flex: 1 }}>
            <Form.Item name="shahkarEstelam" label="استعلام شاهکار">
              <Input
                disabled
                style={{ backgroundColor: "#fafafa", padding: "8px" }}
              />
            </Form.Item>
          </div>

          {!isEditMode && (
            <div style={{ flex: 1 }}>
              <Form.Item
                name="password"
                label="رمز عبور"
                rules={[
                  { required: true, message: "لطفاً رمز عبور را وارد کنید" },
                ]}
              >
                <Input.Password
                  style={{ backgroundColor: "#fafafa", padding: "8px" }}
                />
              </Form.Item>
            </div>
          )}
        </div>

        <div className="flex justify-between w-[70%] items-center gap-6">
          <Form.Item
            label="تعیین نوع ساعات محدودیت ورود"
            className="mb-0"
            name="loginTimePermit"
          >
            <Switch
              checked={enabled}
              onChange={setEnabled}
              checkedChildren="مجاز به ورود در ساعات معین"
              unCheckedChildren="عدم مجاز به ورود در ساعات معین"
              style={{ minWidth: 180 }}
            />
          </Form.Item>

          <Form.Item
            label={enabled ? "ساعت مجاز آغاز ورود" : "ساعت غیرمجاز آغاز ورود"}
            className="flex-1"
            name="allowedLoginStartTime"
          >
            <TimePicker
              style={{
                width: "100%",
                backgroundColor: "#fafafa",
                padding: "8px",
              }}
            />
          </Form.Item>

          <Form.Item
            label={enabled ? "ساعت مجاز پایان ورود" : "ساعت غیرمجاز پایان ورود"}
            className="flex-1"
            name="allowedLoginEndTime"
          >
            <TimePicker
              style={{
                width: "100%",
                backgroundColor: "#fafafa",
                padding: "8px",
              }}
            />
          </Form.Item>
        </div>

        <AllowedIPInput />

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

              <div className="flex-columns text-center items-center justify-between">
                <i className="fa-solid fa-user-check text-gray-400 text-[3rem]"></i>
                <p className="mt-3">برای این کاربر سمت سازمانی ثبت نشده است.</p>
                <button className="mt-3 border px-5 py-1">سمت جدید</button>
              </div>
            </div>
          </>
        )}

        <div className="col-span-1 md:col-span-4 text-right">
          <Divider orientation="right" orientationMargin="0">
            تصاویر
          </Divider>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Form.Item
              name="avatarFile"
              label="تصویر کاربر"
              valuePropName="fileList"
              getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
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

          <div>
            <Form.Item
              name="SignFile"
              label="تصویر امضا"
              valuePropName="fileList"
              getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
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
        </div>
      </div>

      {/* دکمه‌های ارسال */}
      <div className="col-span-1 md:col-span-4 fixed bottom-0 left-0 w-[100%] bg-white p-4 z-50 shadow-[0_-4px_12px_rgba(0,0,0,0.1)] text-left">
        <Button
          onClick={() => navigate(-1)}
          style={{
            backgroundColor: "#f4f5f5",
            padding: "19px 20px",
            marginLeft: "10px",
            border: "none",
          }}
        >
          انصراف
        </Button>
        <Button
          type="primary"
          htmlType="submit"
          style={{ backgroundColor: "#0d56a3", padding: "19px 50px" }}
          loading={loading}
        >
          {loading
            ? "در حال ارسال..."
            : isEditMode
            ? "ویرایش کاربر"
            : "ثبت و ذخیره"}
        </Button>
      </div>
    </Form>
  );
};

export default FormComponent;

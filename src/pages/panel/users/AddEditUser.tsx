import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const AddEditUser = () => {
  const { id } = useParams();
  const isEditMode = !!id;
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    nationalCode: "",
    userName: "",
  });

  const [loading, setLoading] = useState(false);

  // اگر در حالت ویرایش هستیم، اطلاعات کاربر رو از API بگیر
  useEffect(() => {
    if (isEditMode) {
      axios
        .post("https://gw.tehrantc.com/ssotest/api/v1/User/GetAllByFilter", {
          id, // یا هر فیلتر دیگه که نیاز باشه
          name: "",
          nationalCode: "",
          userName: "",
          pageNumber: 1,
          pageSize: 1,
        })
        .then((res) => {
          const user = res.data.data[0]; // فرض کردیم فقط یه آیتم برمی‌گرده
          setForm({
            name: user.name,
            nationalCode: user.nationalCode,
            userName: user.userName,
          });
        })
        .catch((err) => {
          console.error("خطا در گرفتن اطلاعات کاربر:", err);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEditMode) {
        // ویرایش کاربر
        await axios.put(
          "https://gw.tehrantc.com/ssotest/api/v1/User/Update", // مسیر فرضی
          { id, ...form }
        );
        alert("ویرایش با موفقیت انجام شد");
      } else {
        // ثبت کاربر جدید
        await axios.post(
          "https://gw.tehrantc.com/ssotest/api/v1/User/Add", // مسیر فرضی
          form
        );
        alert("ثبت با موفقیت انجام شد");
      }

      navigate("/panel/users");
    } catch (err) {
      console.error("خطا در عملیات:", err);
      alert("خطا در عملیات");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
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

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <input
          type="text"
          name="name"
          placeholder="نام"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="nationalCode"
          placeholder="کد ملی"
          value={form.nationalCode}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="userName"
          placeholder="نام کاربری"
          value={form.userName}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700"
        >
          {loading ? "در حال ارسال..." : isEditMode ? "ویرایش کاربر" : "ثبت کاربر"}
        </button>
      </form>
    </div>
  );
};

export default AddEditUser;

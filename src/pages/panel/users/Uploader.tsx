import { Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";

const { Dragger } = Upload;

const MyUploader = () => {
  return (
    <Dragger
      name="files"
      multiple={false}
      beforeUpload={beforeUpload}
      maxCount={1}
      accept=".png,.jpg,.jpeg"
      listType="picture"
      style={{
        padding: "20px",
        borderRadius: "8px",
        border: "2px dashed #1890ff",
        backgroundColor: "#e6f7ff",
        textAlign: "center",
      }}
    >
      <p style={{ fontSize: "48px", color: "#1890ff" }}>
        <InboxOutlined />
      </p>
      <p style={{ fontSize: "18px", fontWeight: "bold", marginBottom: 8 }}>
        فایل‌تان را اینجا رها کنید یا کلیک کنید
      </p>
      <p style={{ color: "rgba(0,0,0,0.45)" }}>
        فقط فرمت PNG و JPG با حجم کمتر از 320 کیلوبایت پذیرفته می‌شود
      </p>
    </Dragger>
  );
};
export default MyUploader
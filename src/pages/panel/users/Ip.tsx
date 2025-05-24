import React, { useState } from "react";
import { Input, Button, Space, Tag } from "antd";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";

const AllowedIPInput = () => {
  const [ipList, setIpList] = useState([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [ipInput, setIpInput] = useState("");

  const addIp = () => {
    const ip = ipInput.trim();
    if (ip && !ipList.includes(ip)) {
      setIpList([...ipList, ip]);
    }
    setIpInput("");
    setInputVisible(false);
  };

  const removeIp = (ipToRemove) => {
    setIpList(ipList.filter(ip => ip !== ipToRemove));
  };

  return (
    <div style={{ width: "100%", maxWidth: 400}}>
      <label style={{ display: "block", marginBottom: 8, fontWeight: "bold" }}>
        IP های مجاز ورود (مثال: 192.168.1.166)
      </label>

      <Space direction="vertical" style={{ width: "100%" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {ipList.map(ip => (
            <Tag
              key={ip}
              closable
              onClose={() => removeIp(ip)}
              closeIcon={<CloseOutlined />}
            >
              {ip}
            </Tag>
          ))}

          {inputVisible ? (
            <Input
              size="small"
              style={{ width: 120 }}
              value={ipInput}
              onChange={e => setIpInput(e.target.value)}
              onBlur={() => setInputVisible(false)}
              onPressEnter={addIp}
              autoFocus
              placeholder="IP جدید"
            />
          ) : (
            <Button
            style={{ padding: "17px", paddingTop:"20px" }}
              type="dashed"
              size="small"
              icon={<PlusOutlined />}
              onClick={() => setInputVisible(true)}
            >
            
            </Button>
          )}
        </div>
      </Space>
    </div>
  );
};

export default AllowedIPInput;

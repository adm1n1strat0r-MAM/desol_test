import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
  Modal,
  Upload,
  Form,
  Input,
  InputNumber,
  Button,
  message,
  Typography,
  Space,
} from "antd";

const { Title } = Typography;

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const Car = () => {
  const [form] = Form.useForm();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const [owner, setUserId] = useState(null);

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const onFinish = async (formData) => {
    try {
      formData.owner = localStorage.getItem("ID");
      const response = await fetch("http://localhost:8000/api/cars", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Car submission failed");
      }

      const result = await response.json();
      console.log("Car data submitted successfully:", result);

      // Add any additional logic you need after successful submission
    } catch (error) {
      console.error("Car submission error:", error);
      message.error("Car submission failed. Please try again.");
    }
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <Title level={2} style={{ textAlign: "center" }}>
        Car Details
      </Title>
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        style={{ maxWidth: "600px", margin: "auto" }}
      >
        <Form.Item
          name="model"
          label="Model"
          rules={[{ required: true, message: "Please enter the car model!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="price"
          label="Price"
          rules={[{ required: true, message: "Please enter the car price!" }]}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="phoneNumber"
          label="Phone Number"
          rules={[
            { required: true, message: "Please enter a valid phone number!" },
            {
              validator: (_, value) => {
                return /^\d{11}$/.test(value)
                  ? Promise.resolve()
                  : Promise.reject("Please enter a valid phone number!");
              },
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="maxPictures"
          label="Max Pictures"
          rules={[
            {
              required: true,
              message: "Please enter the maximum number of pictures!",
            },
            {
              type: "number",
              min: 1,
              max: 10,
              message: "Max Pictures must be between 1 and 10",
            },
          ]}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item>
          <Upload
            action="https://run.mocky.io/v3/168493d5-74dd-470a-8394-712fb08e4cc4"
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
          >
            {fileList.length >= form.getFieldValue("maxPictures")
              ? null
              : uploadButton}
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Submit
          </Button>
        </Form.Item>
      </Form>

      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </Space>
  );
};

export default Car;

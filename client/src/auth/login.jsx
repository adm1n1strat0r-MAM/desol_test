import React, { useState } from "react";
import { Form, Input, Button, Checkbox, Card, Typography, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const Login = () => {
  const [remember, setRemember] = useState(true);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await fetch("https://brainy-slug-frock.cyclic.app/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Include the access token in the Authorization header if available
          Authorization: `Bearer ${Cookies.get("accessToken") || ""}`,
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        console.error("Login failed:", await response.text());
        throw new Error("Login failed");
      }

      const data = await response.json();
      console.log("Login successful:", data);

      if (remember) {
        // Store the access token in a cookie
        localStorage.setItem("ID", data.info._id);
        Cookies.set("accessToken", data.token, { expires: 7 }); // Expires in 7 days
      }

      // Redirect to the next page
      navigate("/car");

      // Perform any additional actions after successful login
    } catch (error) {
      console.error("Login error:", error);
      message.error("Login failed. Please check your credentials.");
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    console.log("Handle password recovery logic here");
  };

  const handleRegister = (e) => {
    e.preventDefault();
    console.log("Handle registration logic here");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card style={{ width: 500 }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Title level={2}>Desol Int </Title>
        </div>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item
              name="remember"
              valuePropName="checked"
              noStyle
              initialValue={remember}
            >
              <Checkbox onChange={(e) => setRemember(e.target.checked)}>
                Remember me
              </Checkbox>
            </Form.Item>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              block
            >
              Log in
            </Button>
            Don't have an account{" "}
            <a href="" onClick={handleRegister}>
              sign up
            </a>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;

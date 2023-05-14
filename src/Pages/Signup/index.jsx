import { Button, Col, Form, Input, message, Row, Select, Spin } from "antd";
import React, { useEffect, useState } from "react";
import "../../Styles/signupSignin.css";
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  GoogleOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [signupFormLoading, setSignupFormLoading] = useState(false);
  const navigate = useNavigate();

  function handleSignupForm(values) {
    console.log("values", values);
    setSignupFormLoading(true);
    fetch("http://localhost:8080/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("Data", data);
        if (data.message === "User created successfully.") {
          message.success("User created successfully.");
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        } else if (data.message === "user already registered") {
          message.warning("User is already registered");
        }
        setSignupFormLoading(false);
      })
      .catch((error) => {
        const errorMessage = error.data?.message || error.message;
        console.error("Error", errorMessage);
        message.error(errorMessage);
        setSignupFormLoading(false);
      });
  }

  const googleAuth = () => {
    window.open("http://localhost:8080/auth/google/callback", "_self");
  };

  return (
    <>
      <div className="signupContainer">
        <div>
          <div id="loginImageDiv">
            <img
              width={"100%"}
              src="/Images/SignupImage.jpg"
              className="signupImage"
              alt="SignupImage"
            />
          </div>
          <div className="signupFormContainer">
            <div className="signupHeading">
              <img
                src="/Images/tummoc.png"
                className="tummocLogo"
                width={"60%"}
                alt="tummoc logo"
              />
              <h1>Create Account</h1>
              <p>
                Go ahead and sign up, let everyone know how awesome you are!
              </p>
            </div>
            <div className="innerSignupFormContainer">
              <Form
                labelAlign=""
                layout="vertical"
                autoComplete="off"
                onFinish={handleSignupForm}
                onFinishFailed={(error) => {
                  console.log({ error });
                }}
              >
                <Form.Item
                  label="Name"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your name",
                    },
                    {
                      whitespace: true,
                      message: "Name cannot be empty spaces",
                    },
                    { min: 4 },
                  ]}
                  hasFeedback
                >
                  <Input
                    prefix={<UserOutlined />}
                    placeholder="Enter your name"
                  />
                </Form.Item>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your Email",
                    },
                    { type: "email", message: "Please enter a valid email" },
                  ]}
                  hasFeedback
                >
                  <Input
                    prefix={<MailOutlined />}
                    placeholder="Enter your email"
                  />
                </Form.Item>
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the password",
                    },
                    { min: 8 },
                    {
                      validator: (_, value) => {
                        function checkPassword(value) {
                          var pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;
                          return pattern.test(value);
                        }
                        return value && checkPassword(value)
                          ? Promise.resolve()
                          : Promise.reject(
                              "Password must contain a capital letter and a special character"
                            );
                      },
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password
                    prefix={<LockOutlined />}
                    placeholder="Enter the password"
                  />
                </Form.Item>
                <Form.Item
                  label="Confirm Password"
                  name="rePassword"
                  dependencies={["password"]}
                  rules={[
                    {
                      required: true,
                      message: "Please comfirm the password",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject("Password doesn't matched");
                      },
                    }),
                  ]}
                  hasFeedback
                >
                  <Input.Password
                    prefix={<LockOutlined />}
                    placeholder="Confirm your password"
                  />
                </Form.Item>
                <Form.Item>
                  <Button
                    style={{
                      background: "#1F2937",
                      color: "White",
                      fontWeight: 600,
                    }}
                    loading={signupFormLoading}
                    block
                    type="primary"
                    htmlType="submit"
                  >
                    Sign Up
                  </Button>
                </Form.Item>
                <Form.Item>
                  <Button
                    block
                    type="primary"
                    onClick={googleAuth}
                    style={{
                      background: "#F94A29",
                      color: "White",
                      fontWeight: 600,
                    }}
                    // loading={true}
                    icon={<GoogleOutlined />}
                  >
                    <span>Sing up with Google</span>
                  </Button>
                </Form.Item>
                <Form.Item>
                  <Button
                    id="alreadyAccountBtn"
                    style={{
                      background: "#4E46DC",
                      color: "White",
                      fontWeight: 600,
                    }}
                    block
                    type="primary"
                    onClick={() => {
                      navigate("/login");
                    }}
                  >
                    I already have an account
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;

import { Menu, message, Modal } from "antd";
import React, { useState } from "react";
import {
  DashboardOutlined,
  LogoutOutlined,
  LockOutlined,
  ExclamationCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const UserAvatar = () => {
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();

  let authDetails = JSON.parse(localStorage.getItem("authDetails"));
  console.log(authDetails);
  let fullName = authDetails?.userDetails?.name;
  let userFirstName = "User";
  if (fullName.includes(" ")) {
    userFirstName = fullName?.split(" ");
    userFirstName = userFirstName[0];
  } else {
    userFirstName = fullName;
  }

  const { confirm } = Modal;
  const handleLogout = () => {
    confirm({
      title: "Are you sure you want to logout?",
      icon: <ExclamationCircleOutlined />,
      content: "This action cannot be undone.",
      okText: "Yes, Logout",
      okType: "danger",
      cancelText: "No",
      onOk() {
        setTimeout(() => {
          navigate("/");
          const logoutfn = () => {
            window.open("https://tummoc-deployed.netlify.app/login", "_self");
          };
          logoutfn();
        //   const logout = localStorage.removeItem("authDetails");
        //   console.log("logout", logout);
          message.success(
            "You are succesfully Logged out from your account",
            3
          );
        }, 500);
      },
      onCancel() {},
    });
  };

  return (
    <div>
      <Menu
        mode="inline"
        defaultSelectedKeys={["user"]}
        onClick={(info) => {
          console.log(info.key);
          if (info.key === "dashboard") {
            navigate("/dashboard");
          } else if (info.key === "logout") {
            setShowLogout(true);
            handleLogout();
          }
        }}
        items={[
          {
            label: (
              <span style={{ fontWeight: 600, fontSize: 18 }}>
                {userFirstName}{" "}
              </span>
            ),
            key: "user",
          },
          {
            label: "Dashboard",
            key: "dashboard",
            icon: <DashboardOutlined />,
          },
          { label: "My Profile", key: "myProfile", icon: <UserOutlined /> },
          {
            label: "Logout",
            key: "logout",
            danger: true,
            icon: <LogoutOutlined />,
          },
        ]}
      ></Menu>
    </div>
  );
};

export default UserAvatar;

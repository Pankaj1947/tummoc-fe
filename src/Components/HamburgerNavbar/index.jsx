import { useState } from "react";
import { Link } from "react-router-dom";
import { MenuOutlined, UserOutlined } from "@ant-design/icons";
import { Drawer, Avatar, Popover } from "antd";
import UserAvatar from "../UserAvatar/index";
import "../../Styles/HamburgerNav.css";

const HamburgerNavbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const authDetails = JSON.parse(localStorage.getItem("authDetails"));
  let firstLetter = authDetails?.userDetails?.name[0];
  firstLetter = firstLetter?.toUpperCase();

  return (
    <div className="navbar">
      <div className="navbarContainer">
        <div className="tummoclogoContainer">
          <Link to="/">
            <img src="/Images/tummoc.png" alt="Logo" />
          </Link>
        </div>
        <div className="NavItemsMenuContainer">
          <div className="NavMenuIcon">
            <MenuOutlined
              style={{ fontSize: 20 }}
              onClick={() => setOpenMenu(true)}
            />
          </div>
          <div className="navHorizontalMenu">
            <div>
              <Link to="/dashboard">Dashboard</Link>
            </div>
            {/* <div>
              <Link to="/empty">Empty</Link>
            </div> */}
          </div>
        </div>
        <div className="navAvatarContainer">
          <Popover
            placement="bottomRight"
            content={<UserAvatar />}
            trigger="click"
          >
            <Avatar
              style={{
                background: "#1677ff",
                cursor: "pointer",
              }}
            >
              {firstLetter ? firstLetter : <UserOutlined />}
            </Avatar>
          </Popover>
        </div>
      </div>
      <Drawer
        title=""
        placement="right"
        closable={false}
        onClose={() => setOpenMenu(false)}
        open={openMenu}
        width="70%"
        bodyStyle={{
          padding: 0,
          paddingTop: 40,
        }}
      >
        <div className="drawerMenu">
          <Link to="/dashboard" onClick={() => setOpenMenu(false)}>
            Dashboard
          </Link>
        </div>
      </Drawer>
    </div>
  );
};

export default HamburgerNavbar;

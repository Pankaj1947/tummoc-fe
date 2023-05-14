import React, { useEffect } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import HamburgerNavbar from "../../Components/HamburgerNavbar";

const Dashboard = () => {
  const navigate=useNavigate();

  const authDetails = JSON.parse(localStorage.getItem("authDetails"));
  let token = authDetails?.token;

  useEffect(()=>{
    fetch("http://localhost:8080/protected", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then(() => {
        if(token){
          message.destroy();
          message.success(`Welcome ${authDetails?.userDetails?.name}`, 3);
        }
      })
      .catch((err) => {
        console.log("err: ", err);
        message.error("Unauthorized. Please Login!");
        navigate("/login");
      });

  },[])
  return (
    <div>
      <HamburgerNavbar/>
      <h1>Welcome {authDetails?.userDetails?.name}</h1>
    </div>
  );
};

export default Dashboard;

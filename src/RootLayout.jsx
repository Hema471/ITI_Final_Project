import React from "react";
import NavBar from "./NavBar/NavBar";
import  Footer from "./Footer/Footer"
import { Outlet } from "react-router-dom";

import "./stylee.css";

const RootLayout = () => {
  return (
    <div className="head">
      <NavBar />
      <Outlet />
      <Footer />
     
    </div>
  );
};

export default RootLayout;

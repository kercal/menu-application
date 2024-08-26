import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="page-container">
      <Header />
      <div className="main-content">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;

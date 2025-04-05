import React from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "../components/Footer";

const Layout = ({ children }) => {
  const location = useLocation();
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header currentPath={location.pathname} />
      <main className="flex-grow pt-20">
        {children}
      </main>
      <Footer /> 
    </div>
  );
};

export default Layout;

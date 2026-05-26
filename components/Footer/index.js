import React from "react";

const Footer = () => {
  return (
    <h1 className="text-sm text-bold mt-20 laptop:mt-40 p-2 laptop:p-0 text-center opacity-40">
      Zoe / 周子琪 &copy; {new Date().getFullYear()}
    </h1>
  );
};

export default Footer;

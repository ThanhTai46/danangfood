import React from "react";

const Header = () => {
  return (
    <div className=" fixed w-screen z-50 bg-slate-500 p-6 px-16">
      {/* Tablet Desktop */}

      <div className="hidden md:flex w-full h-full bg-red-600 p-4 "></div>

      {/* Mobile */}
      <div className="flex md:hidden w-full h-full bg-blue-500 p-4"></div>
    </div>
  );
};

export default Header;

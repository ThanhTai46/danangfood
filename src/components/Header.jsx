import React, { useState } from "react";
import Logo from "../img/logo_pc.png";
import Avatar from "../img/avatar.png";
import { app } from "../firebase.config";
import { MdOutlineShoppingCart, MdAdd, MdLogout } from "react-icons/md";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

const Header = () => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [{ user }, dispatch] = useStateValue();
  const [isMenu, setIsMenu] = useState(false);
  const login = async () => {
    if (!user) {
      const {
        user: { refreshToken, providerData },
      } = await signInWithPopup(firebaseAuth, provider);
      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      });
      localStorage.setItem("user", JSON.stringify(providerData[0]));
    }
    setIsMenu((isMenu) => !isMenu);
  };
  const logout = () => {
    setIsMenu(false);
    localStorage.clear();
    dispatch({
      type: actionType.SET_USER,
      user: null,
    });
  };
  return (
    <header className="fixed z-50 w-screen p-3 px-4 md:p-6 md:px-16">
      {/* Tablet Desktop */}

      <div className="items-center justify-between hidden w-full h-full md:flex ">
        <Link to="/" className="flex items-center gap-2 ">
          <img src={Logo} className="object-cover w-full h-full" alt="logo" />
          {/* <p className="text-xl font-medium text-headingColor">KFC Food</p> */}
        </Link>
        <div className="flex items-center gap-8">
          <motion.ul
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className="flex items-center gap-8"
          >
            <li className="text-base transition-all duration-100 ease-in-out cursor-pointer text-textColor hover:text-headingColor">
              Home
            </li>
            <li className="text-base transition-all duration-100 ease-in-out cursor-pointer text-textColor hover:text-headingColor">
              Menu
            </li>
            <li className="text-base transition-all duration-100 ease-in-out cursor-pointer text-textColor hover:text-headingColor">
              About Us
            </li>
            <li className="text-base transition-all duration-100 ease-in-out cursor-pointer text-textColor hover:text-headingColor">
              Service
            </li>
          </motion.ul>
          <div className="relative flex items-center justify-center cursor-pointer">
            <MdOutlineShoppingCart className="text-2xl text-textColor" />
            <div className="absolute flex items-center justify-center w-5 h-5 rounded-full -top-2 left-4 bg-cartNumBg">
              <p className="text-xs font-semibold text-white">2</p>
            </div>
          </div>
          <div className="relative">
            <motion.img
              whileTap={{ scale: 0.6 }}
              src={user ? user.photoURL : Avatar}
              alt="user"
              className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-sm  cursor-pointer rounded-full"
              onClick={login}
            />
            {isMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="absolute right-0 flex flex-col w-32 overflow-hidden rounded-md shadow-lg top-12 bg-gray-50"
              >
                {user && user.email === "luxurydemon123@gmail.com" ? (
                  <Link to="/createItem">
                    <p
                      onClick={() => setIsMenu((isMenu) => !isMenu)}
                      className="flex items-center gap-3 px-4 py-2 text-base transition-all duration-100 ease-in-out cursor-pointer hover:bg-slate-200 text-textColor "
                    >
                      New Item
                    </p>
                  </Link>
                ) : (
                  ""
                )}
                <p
                  className="flex items-center gap-3 px-4 py-2 text-base transition-all duration-100 ease-in-out cursor-pointer hover:bg-slate-200 text-textColor"
                  onClick={logout}
                >
                  Logout <MdLogout />
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="flex items-center justify-between w-full h-full md:hidden">
        <div className="relative flex items-center justify-center cursor-pointer">
          <MdOutlineShoppingCart className="text-2xl text-textColor" />
          <div className="absolute flex items-center justify-center w-5 h-5 rounded-full -top-2 left-4 bg-cartNumBg">
            <p className="text-xs font-semibold text-white">2</p>
          </div>
        </div>
        <Link to="/" className="flex items-center gap-2 ">
          <img src={Logo} className="object-cover w-full h-full" alt="logo" />
          {/* <p className="text-xl font-medium text-headingColor">DaNang Food</p> */}
        </Link>

        <div className="relative">
          <motion.img
            whileTap={{ scale: 0.6 }}
            src={user ? user.photoURL : Avatar}
            alt="user"
            className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-sm  cursor-pointer rounded-full"
            onClick={login}
          />
          {isMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="absolute right-0 flex flex-col w-32 overflow-hidden rounded-md shadow-lg top-12 bg-gray-50"
            >
              {user && user.email === "luxurydemon123@gmail.com" ? (
                <Link to="/createItem">
                  <p
                    onClick={() => setIsMenu((isMenu) => !isMenu)}
                    className="flex items-center gap-3 px-4 py-2 text-base transition-all duration-100 ease-in-out cursor-pointer hover:bg-slate-200 text-textColor "
                  >
                    New Item
                  </p>
                </Link>
              ) : (
                ""
              )}

              <p
                onClick={logout}
                className="flex items-center gap-3 px-4 py-2 text-base transition-all duration-100 ease-in-out cursor-pointer hover:bg-slate-200 text-textColor"
              >
                Logout <MdLogout />
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

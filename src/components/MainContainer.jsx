import React, { useEffect, useRef, useState } from "react";
import HomeContainer from "./HomeContainer";
import { motion } from "framer-motion";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import RowContainer from "./RowContainer";
import { useStateValue } from "../context/StateProvider";
import MenuContainer from "./MenuContainer";
import CartContainer from "./CartContainer";
const MainContainer = () => {
  const [{ foodItems, cartShow }, dispatch] = useStateValue();
  const [scrollValue, setScrollValue] = useState(0);
  useEffect(() => {}, [scrollValue, cartShow]);
  return (
    <div className="flex flex-col items-center justify-center w-full h-auto">
      <HomeContainer />

      <section className="w-full my-6">
        <div className="flex items-center justify-between w-full">
          <p className="relative text-xl font-semibold capitalize transition-all duration-100 ease-in text-headingColor before:absolute before:rounded-lg before:content before:w-20 before:h-1 before:-bottom-2 before:left-0 before:bg-orange-400">
            Our fresh & healthy fruits
          </p>
          <div className="items-center hidden gap-3 md:flex">
            <motion.div
              whileTap={{ scale: 0.75 }}
              onClick={() => setScrollValue(-200)}
              className="flex items-center justify-center w-8 h-8 transition-all duration-100 ease-in-out bg-orange-300 rounded-lg cursor-pointer hover:shadow-lg hover:bg-orange-500"
            >
              <MdChevronLeft className="text-xl font-semibold text-white" />
            </motion.div>
            <motion.div
              whileTap={{ scale: 0.75 }}
              onClick={() => setScrollValue(200)}
              className="flex items-center justify-center w-8 h-8 transition-all duration-100 ease-in-out bg-orange-300 rounded-lg cursor-pointer hover:shadow-lg hover:bg-orange-500"
            >
              <MdChevronRight className="text-xl font-semibold text-white" />
            </motion.div>
          </div>
        </div>
        <RowContainer
          scrollValue={scrollValue}
          flag={true}
          data={foodItems?.filter((item) => item.category === "fruits")}
        />
      </section>

      <MenuContainer />
      {cartShow && <CartContainer />}
    </div>
  );
};

export default MainContainer;

import React from "react";
import Delivery from "../img/delivery.png";
import HeroBg from "../img/heroBg.png";
import C4 from "../img/c7.png";
const HomeContainer = () => {
  return (
    <section className="grid w-full grid-cols-1 gap-2 md:grid-cols-2" id="home">
      <div className="flex flex-col items-start justify-center flex-1 gap-6 py-2 ">
        <div className="flex items-center justify-center gap-2 p-2 px-4 py-1 bg-orange-100 rounded-full">
          <p className="text-base font-semibold text-orange-500">
            {" "}
            Bike Delivery
          </p>
          <div className="w-8 h-8 overflow-hidden bg-white rounded-full drop-shadow-lg">
            <img
              src={Delivery}
              className="object-contain w-full h-full"
              alt="delivery"
            />
          </div>
        </div>
        <p className="text-[2.6rem] lg:text-[3.5rem] font-semibold text-headingColor  ">
          The Fastest Delivery in{"   "}
          <br />
          <span className="text-orange-600 text-[3rem] lg:text-[4.5rem] md:text-left md:w-[80%]">
            Da Nang City
          </span>
        </p>
        <p className="text-base text-center text-textColor md:text-left">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam, odio
          in vitae earum facilis quidem repudiandae. Voluptates iure officia
          impedit delectus, veritatis doloribus rerum, architecto, excepturi
          perferendis aspernatur maiores corporis!
        </p>
        <button
          type="button"
          className="w-full px-4 py-2 text-white transition-all duration-100 ease-linear rounded-lg md:w-auto bg-gradient-to-br from-orange-400 to-orange-500 hover:shadow-md"
        >
          Order Now
        </button>
      </div>
      <div className="relative flex items-center flex-1 py-2">
        <img
          src={HeroBg}
          alt="hero-bg"
          className=" ml-auto h-420 lg:w-auto w-full lg:h-[650px]"
        />
        <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full px-32 py-4 ">
          <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-cardOverlay backdrop-blur-sm w-508">
            <img
              src={C4}
              alt="C4"
              className="object-cover w-full h-full -mt-10 lg:-mt-20 "
            />
            <p className="mt-4 text-lg font-semibold text-textColor">
              Combo Fried Chicken
            </p>
            <p className="px-10 my-3 text-sm font-semibold text-left text-gray-500 ">
              Spicy Chicken
            </p>
            <p className="text-lg font-semibold text-headingColor ">
              78.000
              <span className="text-red-600 ">đ</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeContainer;

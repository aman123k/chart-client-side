import React from "react";
import { IoHomeOutline, IoSettingsOutline } from "react-icons/io5";
import { IoBagRemoveOutline } from "react-icons/io5";
import { HiOutlineCube } from "react-icons/hi2";
import { BsPerson } from "react-icons/bs";
import { LuSquareKanban, LuStore } from "react-icons/lu";
import { CiBullhorn } from "react-icons/ci";
import { TbRosetteDiscount } from "react-icons/tb";
import { GrIntegration } from "react-icons/gr";
import { FaHeadset } from "react-icons/fa6";

function Sidebar() {
  return (
    <section className=" w-[250px] border-r h-[100%] overflow-scroll relative flex-shrink-0">
      <header className=" py-4 px-6 border-b">
        <h1 className=" text-2xl font-roboto text-[#000000] font-semibold">
          Booto
        </h1>
      </header>
      <section className=" flex flex-col justify-between py-6">
        <div className=" flex flex-col gap-3 ">
          <span className=" text-sm select-none text-[#C9CFD9] font-medium font-roboto px-6">
            Main Menu
          </span>
          <ul className=" flex flex-col gap-1">
            <li
              className=" py-2.5 px-6 cursor-pointer rounded-[5px] font-roboto text-[16px] flex items-center gap-2 bg-[#F9F9FB] border drop-shadow-sm
              text-[#7147E4] font-medium border-[#E6E7ED]"
            >
              <IoHomeOutline size={18} style={{ fontWeight: 700 }} /> Dashboard
            </li>
            <li className=" py-2.5 hover:bg-[#f3f3f6] px-6 cursor-pointer rounded-[5px] font-roboto text-[#444050] text-[16px] flex items-center gap-2">
              <IoBagRemoveOutline size={18} /> Orders
            </li>
            <li className=" py-2.5 hover:bg-[#f3f3f6] px-6 cursor-pointer rounded-[5px] font-roboto text-[#444050] text-[16px] flex items-center gap-2">
              <HiOutlineCube size={18} /> Products
            </li>
            <li className=" py-2.5 hover:bg-[#f3f3f6] px-6 cursor-pointer rounded-[5px] font-roboto text-[#444050] text-[16px] flex items-center gap-2">
              <BsPerson size={18} /> Customers
            </li>
            <li className=" py-2.5 hover:bg-[#f3f3f6] px-6 cursor-pointer rounded-[5px] font-roboto text-[#444050] text-[16px] flex items-center gap-2">
              <LuSquareKanban
                size={18}
                style={{ transform: "rotate(180deg)" }}
              />
              Analytics
            </li>
            <li className=" py-2.5 hover:bg-[#f3f3f6] px-6 cursor-pointer rounded-[5px] font-roboto text-[#444050] text-[16px] flex items-center gap-2">
              <CiBullhorn size={18} /> Marketing
            </li>
          </ul>
        </div>
        <div className=" mt-6 flex flex-col gap-3">
          <span className=" text-sm select-none text-[#C9CFD9] font-medium font-roboto px-6">
            Sales Channel
          </span>
          <ul className=" flex flex-col gap-1">
            <li className=" py-2.5 hover:bg-[#f3f3f6] px-6 cursor-pointer rounded-[5px] font-roboto text-[#444050] text-[16px] flex items-center gap-2">
              <GrIntegration size={18} />
              Integration
            </li>
            <li className=" py-2.5 hover:bg-[#f3f3f6] px-6 cursor-pointer rounded-[5px] font-roboto text-[#444050] text-[16px] flex items-center gap-2">
              <LuStore size={18} />
              My Store
            </li>
            <li className=" py-2.5 hover:bg-[#f3f3f6] px-6 cursor-pointer rounded-[5px] font-roboto text-[#444050] text-[16px] flex items-center gap-2">
              <TbRosetteDiscount size={18} />
              Discounts
            </li>
          </ul>
        </div>

        <div className=" absolute bottom-4 w-[100%]">
          <ul className=" flex flex-col gap-1">
            <li className=" py-2.5 hover:bg-[#f3f3f6] px-6 cursor-pointer rounded-[5px] font-roboto text-[#444050] text-[16px] flex items-center gap-2">
              <IoSettingsOutline size={18} />
              Settings
            </li>
            <li className=" py-2.5 hover:bg-[#f3f3f6] px-6 cursor-pointer rounded-[5px] font-roboto text-[#444050] text-[16px] flex items-center gap-2">
              <FaHeadset size={18} />
              Help Center
            </li>
          </ul>
        </div>
      </section>
    </section>
  );
}

export default Sidebar;

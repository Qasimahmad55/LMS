"use client";
import DashBoardHero from "../../components/Admin/DashboardHero";
import Heading from "../../../app/utils/Heading";
import React from "react";
import AdminProtected from "@/app/hooks/AdminProtected";
import AdminSidebar from "@/app/components/Admin/SideBar/AdminSidebar";
import AllUsers from "@/app/components/Admin/Users/AllUsers";

const page = () => {
  return (
    <div>
      <AdminProtected>
        <Heading
          title={`Elearning-Admin`}
          description="Elearning is a platform for students to learn and get help from teachers"
          keywords="Programming , MERN ,REDUX , Machine Learning"
        />
        <div className="flex h-full">
          {" "}
          <div className="1500px:w-[19%] w-1/5">
            <AdminSidebar />
          </div>
          <div></div>
          <div className="w-[85%]">
            <DashBoardHero />
            <AllUsers isTeam={true} />
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default page;
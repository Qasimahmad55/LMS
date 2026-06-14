"use client";
import DashBoardHero from "../../components/Admin/DashboardHero";
import Heading from "../../../app/utils/Heading";
import React from "react";
import AdminProtected from "@/app/hooks/AdminProtected";
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
        <DashBoardHero />
        <AllUsers isTeam={true} />
      </AdminProtected>
    </div>
  );
};

export default page;
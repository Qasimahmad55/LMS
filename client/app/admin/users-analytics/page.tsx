"use client";

import Headings from "@/app/utils/Heading";
import DashboardHero from "@/app/components/Admin/DashboardHero";
import AdminProtected from "@/app/hooks/AdminProtected";
import UserAnalytics from "@/app/components/Admin/Analytics/UserAnalytics";

const Page = () => {
      
  return (
    <div>
      <AdminProtected>
        <Headings
          title="ELearning Admin"
          description="ELearning is a platform for students to learn and get help from teachers"
          keywords="Programming, MERN, Redux,AI/ML"
        />
        <DashboardHero isDashboard={false}  />
        <UserAnalytics />
      </AdminProtected>
    </div>
  );
};

export default Page;
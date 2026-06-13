"use client";
import Heading from "@/app/utils/Heading";
import DashboardHero from "@/app/components/Admin/DashboardHero";
import AdminProtected from "@/app/hooks/AdminProtected";
import AdminSidebar from "@/app/components/Admin/SideBar/AdminSidebar";
import CourseAnalytics from "@/app/components/Admin/Analytics/CourseAnalytics";



const Page = () => {
    return (
        <div>
            <AdminProtected>
                <Heading
                    title="ELearning Admin"
                    description="ELearning is a platform for students to learn and get help from teachers"
                    keywords="Programming, MERN, Redux,AI/ML"
                />
                <div className="flex min-h-screen">
                    <div className="1500px:w-1/6 w-1/5">
                        <AdminSidebar />
                    </div>
                    <div className="w-[85%]">
                        <DashboardHero isDashboard={true} />
                        <CourseAnalytics />
                    </div>
                </div>
            </AdminProtected>
        </div>
    );
};

export default Page;
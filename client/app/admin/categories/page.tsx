"use client";
import AdminProtected from "@/app/hooks/AdminProtected";
import AdminDashboardHero from "../../components/Admin/DashboardHero";
import Heading from "@/app/utils/Heading";
import AdminSidebar from "@/app/components/Admin/SideBar/AdminSidebar";
import EditCategories from "@/app/components/Customization/EditCategories";

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
                        <AdminDashboardHero />
                        <EditCategories />
                    </div>
                </div>
            </AdminProtected>
        </div>
    );
};

export default Page;
"use client";
import AdminProtected from "@/app/hooks/AdminProtected";
import AdminDashboardHero from "../../components/Admin/DashboardHero";
import Heading from "@/app/utils/Heading";
import EditCategories from "@/app/components/Admin/Customization/EditCategories";

const Page = () => {
    return (
        <div>
            <AdminProtected>
                <Heading
                    title="ELearning Admin"
                    description="ELearning is a platform for students to learn and get help from teachers"
                    keywords="Programming, MERN, Redux,AI/ML"
                />
                <AdminDashboardHero />
                <EditCategories />
            </AdminProtected>
        </div>
    );
};

export default Page;
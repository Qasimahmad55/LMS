"use client";
import Heading from "@/app/utils/Heading";
import DashboardHero from "@/app/components/Admin/DashboardHero";
import AdminProtected from "@/app/hooks/AdminProtected";
import OrderAnalytics from "@/app/components/Admin/Analytics/OrderAnalytics";


const Page = () => {
    return (
        <div>
            <AdminProtected>
                <Heading
                    title="ELearning Admin"
                    description="ELearning is a platform for students to learn and get help from teachers"
                    keywords="Programming, MERN, Redux,AI/ML"
                />
                <DashboardHero isDashboard={false} />
                <OrderAnalytics />
            </AdminProtected>
        </div>
    );
};

export default Page;
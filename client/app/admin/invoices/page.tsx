"use client";
import Headings from "@/app/utils/Heading";
import AllInvoices from "../../components/Admin/Order/AllInvoices";
import DashboardHero from "@/app/components/Admin/DashboardHero";
import AdminProtected from "@/app/hooks/AdminProtected";

const Page = () => {
    return (
        <div>
            <AdminProtected>
                <Headings
                    title="ELearning Admin"
                    description="ELearning is a platform for students to learn and get help from teachers"
                    keywords="Programming, MERN, Redux,AI/ML"
                />
                <DashboardHero isDashboard={false} />
                <AllInvoices />
            </AdminProtected>
        </div>
    );
};

export default Page;
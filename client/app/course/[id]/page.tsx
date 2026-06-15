"use client";
import CourseDetailsPage from "@/app/components/Courses/CourseDetailsPage";
import { use } from "react";

type Props = {
    params: Promise<{
        id: string;
    }>;
};

const Page = ({ params }: Props) => {
    const { id } = use(params);

    return (
        <div>
            <CourseDetailsPage id={id} />
        </div>
    );
};

export default Page;
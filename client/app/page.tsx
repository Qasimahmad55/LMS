// import type { Metadata } from "next";
'use client'
import { useState } from "react";
import Heading from "./utils/Heading";
import Header from "./components/Header";
import Hero from "./Route/Hero";

// export const metadata: Metadata = {
//   title: "ELearning",
//   description:
//     "ELearning is a platform for students to learn and get help from teachers",
//   keywords: ["Programming", "MERN", "AI", "Machine Learning"],
// };

const Page = () => {
  const [open, setOpen] = useState(false)
  const [activeItem, setActiveItem] = useState(0)
  return (
    <div>
      <Heading
        title="Learning Management System"
        description=
        "ELearning is a platform for students to learn and get help from teachers"
        keywords="Programming, MERN, Redux, ML, AI"
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
      />
      <Hero/>
    </div>
  );
};

export default Page


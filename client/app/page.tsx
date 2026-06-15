// import type { Metadata } from "next";
'use client'
import { useState } from "react";
import Heading from "./utils/Heading";
import Header from "./components/Header";
import Hero from "./components/Route/Hero";
import Courses from "./components/Route/Courses";
import Reviews from "./components/Route/Reviews";
import Faq from "./components/FAQ/Faq";
import Footer from "./components/Footer";

// export const metadata: Metadata = {
//   title: "ELearning",
//   description:
//     "ELearning is a platform for students to learn and get help from teachers",
//   keywords: ["Programming", "MERN", "AI", "Machine Learning"],
// };

const Page = () => {
  const [open, setOpen] = useState(false)
  const [activeItem, setActiveItem] = useState(0)
  const [route, setRoute] = useState('Login')

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
        route={route}
        setRoute={setRoute}
      />
      <Hero />
      <Courses />
      <Reviews />
      <Faq />
      <Footer />
    </div>
  );
};

export default Page


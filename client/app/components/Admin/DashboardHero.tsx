'use client'
import React, { FC, useState } from "react";
// import DashboardWidgets from "../../components/Admin/Widgets/DashboardWidgets";
import DashboardHeader from "./DashboardHeader";
import DashboardWidgets from "./widgets/DashboardWidgets";

type props = {
    isDashboard?: boolean;
};
const DashBoardHero: FC<props> = ({ isDashboard }: props) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(0);
    return (
        <div>
            <DashboardHeader open={open} setOpen={setOpen} />
            {isDashboard && <DashboardWidgets open={open} value={value} />}
        </div>
    );
};

export default DashBoardHero;
"use client"
import React, { useEffect, useState } from 'react'
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useTheme } from "next-themes";
import Loader from '../../Loader/Loader';
import { useGetAllOrdersQuery } from '@/app/redux/features/orders/ordersApi';
import { useGetAllUsersQuery } from '@/app/redux/features/user/userApi';
import { useGetAllCoursesQuery } from '@/app/redux/features/courses/coursesApi';
import { format } from 'timeago.js'
import { AiOutlineMail } from 'react-icons/ai';

type Props = {
    isDashboard?: boolean;
};

const AllInvoices = ({ isDashboard }: Props) => {
    const { theme } = useTheme();

    const { isLoading: ordersLoading, data: OrdersData } = useGetAllOrdersQuery({});
    const { isLoading: usersLoading, data: UsersData } = useGetAllUsersQuery({});
    const { isLoading: coursesLoading, data: CoursesData } = useGetAllCoursesQuery({});

    const [orderData, setOrderData] = useState<any[]>([]);

    const isLoading = ordersLoading || usersLoading || coursesLoading;

    useEffect(() => {
        if (OrdersData && UsersData && CoursesData) {
            const temp = OrdersData.orders.map((order: any) => {
                const user = UsersData.users.find((u: any) => u._id === order.userId);
                const course = CoursesData.courses.find(
                    (c: any) => c._id === order.courseId
                );
                return {
                    ...order,
                    userName: user?.name || "Deleted User",
                    userEmail: user?.email || "N/A",
                    title: course?.name || "Deleted Course",
                    price: "$" + (course?.price ?? 0),
                };
            });
            setOrderData(temp);
        }
    }, [UsersData, OrdersData, CoursesData]);

    const columns: any = [
        { field: "id", headerName: "ID", minWidth: 100, flex: 0.4 },
        { field: "userName", headerName: "Name", minWidth: 120, flex: isDashboard ? 0.6 : 0.5 },
        ...(isDashboard
            ? []
            : [
                { field: "userEmail", headerName: "Email", minWidth: 160, flex: 0.7 },
                { field: "title", headerName: "Course Title", minWidth: 150, flex: 0.7 },
            ]),
        { field: "price", headerName: "Price", minWidth: 80, flex: 0.3 },
        ...(isDashboard
            ? [{ field: "formattedDate", headerName: "Created At", minWidth: 100, flex: 0.5 }]
            : [
                {
                    field: " ",
                    headerName: "Email",
                    width: 80,
                    sortable: false,
                    renderCell: (params: any) => (
                        <a href={`mailto:${params.row.userEmail}`}>
                            <AiOutlineMail
                                className="dark:text-white text-black"
                                size={20}
                            />
                        </a>
                    ),
                },
            ]),
    ];

    const rows = orderData.map((item: any) => ({
        id: item._id,
        userName: item.userName,
        userEmail: item.userEmail,
        title: item.title,
        price: item.price,
        formattedDate: format(item.createdAt),
    }));

    return (
        <div className={!isDashboard ? "mt-[120px] px-4 md:px-8 pb-8" : "mt-[0px]"}>
            {isLoading ? (
                <Loader />
            ) : (
                <Box className="w-full" sx={{ maxWidth: '100%', overflow: 'hidden' }}>
                    <Box
                        className={!isDashboard ? "bg-white dark:bg-[#111C43] shadow-md rounded-[10px] overflow-hidden border border-gray-200 dark:border-slate-800" : ""}
                        sx={{
                            height: isDashboard ? "35vh" : "82.49vh",
                            "& .MuiDataGrid-root": {
                                border: "none",
                                outline: "none",
                                borderRadius: !isDashboard ? "10px !important" : "0px",
                                overflow: "hidden",
                            },
                            "& .MuiDataGrid-main": {
                                overflow: "hidden",
                            },
                            "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
                                color: theme === "dark" ? "#94a3b8 !important" : "#64748b !important",
                            },
                            "& .MuiDataGrid-sortIcon": {
                                color: theme === "dark" ? "#94a3b8 !important" : "#64748b !important",
                            },
                            "& .MuiDataGrid-row": {
                                color: theme === "dark" ? "#e2e8f0 !important" : "#1e293b !important",
                                borderBottom: theme === "dark"
                                    ? "1px solid #1e293b !important"
                                    : "1px solid #e2e8f0 !important",
                            },
                            "& .MuiTablePagination-root": {
                                color: theme === "dark" ? "#cbd5e1 !important" : "#475569 !important",
                            },
                            "& .MuiDataGrid-cell": {
                                borderBottom: "none !important",
                            },
                            "& .name-column--cell": {
                                color: theme === "dark" ? "#e2e8f0 !important" : "#1e293b !important",
                            },
                            "& .MuiDataGrid-columnHeaders": {
                                backgroundColor: theme === "dark" ? "#1a2555 !important" : "#f8fafc !important",
                                borderBottom: theme === "dark" ? "1px solid #1e293b !important" : "1px solid #e2e8f0 !important",
                                color: theme === "dark" ? "#94a3b8 !important" : "#64748b !important",
                                fontWeight: "600 !important",
                                fontSize: "13px !important",
                                textTransform: "uppercase" as const,
                                letterSpacing: "0.05em",
                            },
                            "& .MuiDataGrid-columnHeader": {
                                backgroundColor: theme === "dark" ? "#1a2555 !important" : "#f8fafc !important",
                                color: theme === "dark" ? "#94a3b8 !important" : "#64748b !important",
                            },
                            "& .MuiDataGrid-virtualScroller": {
                                backgroundColor: theme === "dark" ? "#111C43 !important" : "#ffffff !important",
                            },
                            "& .MuiDataGrid-footerContainer": {
                                color: theme === "dark" ? "#cbd5e1 !important" : "#475569 !important",
                                borderTop: theme === "dark" ? "1px solid #1e293b !important" : "1px solid #e2e8f0 !important",
                                backgroundColor: theme === "dark" ? "#1a2555 !important" : "#f8fafc !important",
                            },
                            "& .MuiCheckbox-root": {
                                color: theme === "dark" ? "#6366f1 !important" : "#6366f1 !important",
                            },
                            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                                color: theme === "dark" ? "#94a3b8 !important" : "#64748b !important",
                            },
                            "& .MuiDataGrid-row:hover": {
                                backgroundColor: theme === "dark" ? "#162044 !important" : "#f1f5f9 !important",
                            },
                            "& .MuiDataGrid-row.Mui-selected": {
                                backgroundColor: theme === "dark" ? "#1e2a5a !important" : "#eef2ff !important",
                            },
                            "& .MuiDataGrid-row.Mui-selected:hover": {
                                backgroundColor: theme === "dark" ? "#243070 !important" : "#e0e7ff !important",
                            },
                            "& .MuiTablePagination-selectIcon": {
                                color: theme === "dark" ? "#94a3b8 !important" : "#64748b !important",
                            },
                        }}
                    >
                        <DataGrid
                            checkboxSelection={!isDashboard}
                            rows={rows}
                            columns={columns}
                            slots={isDashboard ? {} : { toolbar: GridToolbar }}
                            hideFooter={isDashboard}
                            disableColumnMenu={isDashboard}
                        />
                    </Box>
                </Box>
            )}
        </div>
    )
}

export default AllInvoices
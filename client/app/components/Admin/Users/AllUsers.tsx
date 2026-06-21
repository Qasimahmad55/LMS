'use client'
import React, { FC, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Modal } from "@mui/material";
import { AiOutlineDelete, AiOutlineMail } from "react-icons/ai";
import { useTheme } from "next-themes";
import Loader from "../../Loader/Loader";
import { format } from "timeago.js";

import { toast } from "react-hot-toast";
import { styles } from "@/app/styles/styles";
import { useDeleteUserMutation, useGetAllUsersQuery, useUpdateUserRoleMutation } from "@/app/redux/features/user/userApi";

type Props = {
    isTeam?: boolean;
};

const AllUsers: FC<Props> = ({ isTeam }) => {
    const { theme, setTheme } = useTheme();
    const [active, setActive] = useState(false);
    const [email, setEmail] = useState("");
    const [open, setOpen] = useState(false);
    const [userId, setUserId] = useState("");
    const [role, setRole] = useState("admin");
    const [updateUserRole, { error: updateError, isSuccess }] = useUpdateUserRoleMutation();
    const [deleteUser, { isSuccess: deleteSuccess, error: deleteError }] =
        useDeleteUserMutation({});

    const { isLoading, data, refetch } = useGetAllUsersQuery(
        {},
        { refetchOnMountOrArgChange: true }
    );
    // console.log(data)
    useEffect(() => {
        if (updateError) {
            if ("data" in updateError) {
                const errorMessage = updateError as any;
                toast.error(errorMessage.data.message);
            }
        }

        if (isSuccess) {
            refetch();
            toast.success("User role updated successfully");
            setActive(false);
        }
        if (deleteSuccess) {
            refetch();
            toast.success("Delete user successfully!");
            setOpen(false);
        }
        if (deleteError) {
            if ("data" in deleteError) {
                const errorMessage = deleteError as any;
                toast.error(errorMessage.data.message);
            }
        }
    }, [updateError, isSuccess, deleteSuccess, deleteError, refetch]);

    const columns = [
        { field: "id", headerName: "ID", minWidth: 100, flex: 0.5 },
        { field: "name", headerName: "Name", minWidth: 120, flex: 0.6 },
        { field: "email", headerName: "Email", minWidth: 160, flex: 0.8 },
        { field: "role", headerName: "Role", minWidth: 80, flex: 0.3 },
        { field: "courses", headerName: "Purchased Courses", minWidth: 130, flex: 0.5 },
        { field: "created_at", headerName: "Joined At", minWidth: 100, flex: 0.4 },
        {
            field: " ",
            headerName: "Delete",
            width: 80,
            sortable: false,
            renderCell: (params: any) => {
                return (
                    <>
                        <Button
                            onClick={() => {
                                setOpen(!open);
                                setUserId(params.row.id);
                            }}
                        >
                            <AiOutlineDelete
                                className="dark:text-white text-black"
                                size={20}
                            />
                        </Button>
                    </>
                );
            },
        },
        {
            field: "  ",
            headerName: "Email",
            width: 80,
            sortable: false,
            renderCell: (params: any) => {
                return (
                    <div className="flex justify-center items-center h-full">
                        <a
                            href={`mailto:${params.row.email}`}
                            className="flex justify-center items-center"
                        >
                            <AiOutlineMail className="dark:text-white text-black" size={20} />
                        </a>
                    </div>
                );
            },
        },
    ];

    const rows: any = [];

    if (isTeam) {
        const newData =
            data && data.users.filter((item: any) => item.role === "admin");
        newData &&
            newData.forEach((item: any) => {
                rows.push({
                    id: item._id,
                    name: item.name,
                    email: item.email,
                    role: item.role,
                    courses: item.courses.length,
                    created_at: format(item.createdAt),
                });
            });
    } else {
        data &&
            data.users.forEach((item: any) => {
                rows.push({
                    id: item._id,
                    name: item.name,
                    email: item.email,
                    role: item.role,
                    courses: item.courses.length,
                    created_at: format(item.createdAt),
                });
            });
    }
    const handleSubmit = async () => {
        await updateUserRole({ email, role });
    };
    const handleDelete = async () => {
        const id = userId;
        await deleteUser(id);
    };

    return (
        <div className="mt-[120px] px-4 md:px-8 pb-8">
            {isLoading ? (
                <Loader />
            ) : (
                <Box className="w-full" sx={{ maxWidth: '100%', overflow: 'hidden' }}>
                    {isTeam && (
                        <div className="w-full flex justify-end mb-4">
                            <div
                                className={`${styles.button} !w-[200px] !rounded-[10px] dark:bg-[#57c7a3] !h-[35px] dark:border dark:border-[#ffffff6c]`}
                                onClick={() => setActive(!active)}
                            >
                                Add New Member
                            </div>
                        </div>
                    )}
                    <Box
                        className="bg-white dark:bg-[#111C43] shadow-md rounded-[10px] overflow-hidden border border-gray-200 dark:border-slate-800"
                        height="80vh"
                        sx={{
                            "& .MuiDataGrid-root": {
                                border: "none",
                                outline: "none",
                                borderRadius: "10px !important",
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
                            checkboxSelection
                            rows={rows}
                            columns={columns}
                            disableColumnMenu
                        />
                    </Box>
                    {active && (
                        <Modal
                            open={active}
                            onClose={() => setActive(!active)}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none">
                                <h1 className={`${styles.title}`}>Add New Member</h1>
                                <div className="mt-4">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter email..."
                                        className={`${styles.input}`}
                                    />
                                    <select
                                        name=""
                                        id=""
                                        className={`${styles.input} !mt-6 text-black`}
                                        onChange={(e: any) => setRole(e.target.value)}
                                    >
                                        <option value="admin" className="text-black">Admin</option>
                                        <option className="text-black" value="user">User</option>
                                    </select>
                                    <br />
                                    <div
                                        className={`${styles.button} my-6 !h-[30px]`}
                                        onClick={handleSubmit}
                                    >
                                        Submit
                                    </div>
                                </div>
                            </Box>
                        </Modal>
                    )}
                    {open && (
                        <Modal
                            open={open}
                            onClose={() => setOpen(!open)}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none">
                                <h1 className={`${styles.title}`}>
                                    Are you sure you want to delete this user?
                                </h1>
                                <div className="flex w-full items-center justify-between mb-6 mt-4">
                                    <div
                                        className={`${styles.button} !w-[120px] h-[30px] bg-[#57c7a3]`}
                                        onClick={() => setOpen(!open)}
                                    >
                                        Cancel
                                    </div>
                                    <div
                                        className={`${styles.button} !w-[120px] h-[30px] bg-[#d63f3f]`}
                                        onClick={handleDelete}
                                    >
                                        Delete
                                    </div>
                                </div>
                            </Box>
                        </Modal>
                    )}
                </Box>
            )}
        </div>
    );
};

export default AllUsers;
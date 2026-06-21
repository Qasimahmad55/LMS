'use client'
import { Box, Button, Modal } from '@mui/material'
import { useTheme } from 'next-themes'
import React, { useEffect, useState } from 'react'
import Loader from '../../Loader/Loader'
import { styles } from '@/app/styles/styles'
import { DataGrid } from "@mui/x-data-grid";
import { FiEdit2 } from 'react-icons/fi'
import { useDeleteCourseMutation, useGetAllCoursesQuery } from '@/app/redux/features/courses/coursesApi'
import { format } from 'timeago.js'
import Link from 'next/link'
import { AiOutlineDelete } from 'react-icons/ai'
import toast from 'react-hot-toast'

type Props = {}

const AllCourses = (props: Props) => {
    const { theme, setTheme } = useTheme()
    const { isLoading, data, refetch } = useGetAllCoursesQuery({}, { refetchOnMountOrArgChange: true })
    const [deleteCourse, { isSuccess, error }
    ] = useDeleteCourseMutation({})
    const [open, setOpen] = useState(false);
    const [courseId, setCourseId] = useState("");
    // console.log(data);


    const columns = [
        { field: "id", headerName: "ID", minWidth: 100, flex: 0.5 },
        { field: "title", headerName: "Course Title", minWidth: 150, flex: 1 },
        { field: "ratings", headerName: "Ratings", minWidth: 80, flex: 0.3 },
        { field: "purchased", headerName: "Purchased", minWidth: 90, flex: 0.4 },
        { field: "created_at", headerName: "Created At", minWidth: 100, flex: 0.4 },
        {
            field: "  ",
            headerName: "Edit",
            width: 80,
            sortable: false,
            renderCell: (params: any) => {
                return (
                    <>
                        <button>
                            <Link href={`/admin/edit-course/${params.row.id}`}>
                                <FiEdit2 className="dark:text-white text-black" size={20} />
                            </Link>
                        </button>
                    </>
                );
            },
        },
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
                                setCourseId(params.row.id);
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
    ];

    const rows: any = [];
    {
        if (data) {
            data.courses.forEach((item: any) => {
                rows.push({
                    id: item._id,
                    title: item.name,
                    ratings: item.ratings,
                    purchased: item.purchased,
                    created_at: format(item.createdAt),
                })
            })
        }
    }

    useEffect(() => {
        if (isSuccess) {
            setOpen(false);
            refetch();
            toast.success("Course Deleted Successfully");
        }
        if (error) {
            if ("data" in error) {
                const errorMessage = error as any;
                toast.error(errorMessage.data.message);
            }
        }
    }, [isSuccess, error, refetch]);

    const handleDelete = async () => {
        const id = courseId
        await deleteCourse(id)
    }


    return (
        <div className="mt-[120px] px-4 md:px-8 pb-8">
            {isLoading ? (
                <Loader />
            ) : (
                <Box className="w-full" sx={{ maxWidth: '100%', overflow: 'hidden' }}>
                    <Box
                        className="bg-white dark:bg-[#111C43] shadow-md rounded-[10px] overflow-hidden border border-gray-200 dark:border-slate-800"
                        sx={{
                            height: "80vh",
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
                    {open && (
                        <Modal
                            open={open}
                            onClose={() => setOpen(!open)}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none">
                                <h1 className={`${styles.title}`}>
                                    Are you sure you want to delete this course?
                                </h1>
                                <div className="flex w-full items-center justify-between mb-6 mt-4">
                                    <div
                                        className={`${styles.button} !w-[120px] h-[30px] bg-[#47d097]`}
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
    )
}

export default AllCourses
import express from "express";
import { addQuestion, editCourse, getAllCourses, getCourseByUser, getSingleCourse, uploadCourse } from "../controllers/course.controller";
import { authorizeRole, isAuthenticated } from "../middleware/auth";

const router = express.Router()

router.post("/create-course", isAuthenticated, authorizeRole("admin"), uploadCourse)
router.put("/edit-course/:id", isAuthenticated, authorizeRole("admin"), editCourse)
router.get("/get-course/:id", getSingleCourse)
router.get("/get-courses", getAllCourses)
router.get("/get-course-content/:id", isAuthenticated, getCourseByUser)
router.put("/add-questions/", isAuthenticated, addQuestion)


export default router
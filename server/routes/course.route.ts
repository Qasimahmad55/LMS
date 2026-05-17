import express from "express";
import { editCourse, getAllCourses, getSingleCourse, uploadCourse } from "../controllers/course.controller";
import { authorizeRole, isAuthenticated } from "../middleware/auth";

const router = express.Router()

router.post("/create-course", isAuthenticated, authorizeRole("admin"), uploadCourse)
router.put("/edit-course/:id", isAuthenticated, authorizeRole("admin"), editCourse)
router.get("/get-course/:id", getSingleCourse)
router.get("/get-courses", getAllCourses)


export default router
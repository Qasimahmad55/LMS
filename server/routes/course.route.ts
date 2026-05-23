import express from "express";
import { AddAnswer, addQuestion, addReplyToReview, addReview, deleteCourse, editCourse, getAllCourses, getAllCoursesPurchased, getCourseByUser, getSingleCourse, uploadCourse } from "../controllers/course.controller";
import { authorizeRole, isAuthenticated } from "../middleware/auth";

const router = express.Router()

router.post("/create-course", isAuthenticated, authorizeRole("admin"), uploadCourse)
router.put("/edit-course/:id", isAuthenticated, authorizeRole("admin"), editCourse)
router.get("/get-course/:id", getSingleCourse)
router.get("/get-courses-purchased", getAllCoursesPurchased)
router.get("/get-courses", isAuthenticated, authorizeRole("admin"), getAllCourses)
router.get("/get-course-content/:id", isAuthenticated, getCourseByUser)
router.put("/add-question", isAuthenticated, addQuestion)
router.put("/add-answer", isAuthenticated, AddAnswer)
router.put("/add-review/:id", isAuthenticated, addReview)
router.put("/add-reply", isAuthenticated, authorizeRole("admin"), addReplyToReview)
router.delete("/delete-course/:id", isAuthenticated, authorizeRole("admin"), deleteCourse)


export default router
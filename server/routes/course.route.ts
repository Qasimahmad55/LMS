import express from "express";
import { AddAnswer, addQuestion, addReplyToReview, addReview, deleteCourse, editCourse, generateVideoUrl, getAllCourses, getAllCoursesPurchased, getCourseByUser, getSingleCourse, uploadCourse } from "../controllers/course.controller";
import { authorizeRole, isAuthenticated } from "../middleware/auth";
import { updateaccessToken } from "../controllers/user.controller";

const router = express.Router()

router.post("/create-course", updateaccessToken, isAuthenticated, authorizeRole("admin"), uploadCourse)
router.put("/edit-course/:id", updateaccessToken, isAuthenticated, authorizeRole("admin"), editCourse)
router.get("/get-course/:id", getSingleCourse)
router.get("/get-courses-purchased", getAllCoursesPurchased)
router.get("/get-courses", updateaccessToken, isAuthenticated, authorizeRole("admin"), getAllCourses)
router.get("/get-course-content/:id", updateaccessToken, isAuthenticated, getCourseByUser)
router.put("/add-question", updateaccessToken, isAuthenticated, addQuestion)
router.put("/add-answer", updateaccessToken, isAuthenticated, AddAnswer)
router.put("/add-review/:id", updateaccessToken, isAuthenticated, addReview)
router.put("/add-reply", updateaccessToken, isAuthenticated, authorizeRole("admin"), addReplyToReview)
router.post("/getVdoCipherOTP", generateVideoUrl)
router.delete("/delete-course/:id", updateaccessToken, isAuthenticated, authorizeRole("admin"), deleteCourse)


export default router
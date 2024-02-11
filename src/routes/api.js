const express = require("express");
let router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const taskController = require("../controllers/taskController")

// user

router.post("/registration",userController.registration);
router.post("/login",userController.login);
router.put("/update",authMiddleware,userController.profileUpdate);
router.get("/profile",authMiddleware,userController.profileView);

// Forger Password
router.get("/send-email/:email",userController.sendEmailUser);
router.get("/email-verify/:email/:otp",userController.emailOtpVerify);
router.post("/password-reset/",userController.userPasswordReset);




//task 

router.post("/create-task", authMiddleware, taskController.createTask );
router.delete("/delete-task/:id", authMiddleware, taskController.deleteTask );
router.put("/update-task-by-status/:id", authMiddleware, taskController.updateTaskByStatus);
router.get("/list-task-by-status/:status", authMiddleware, taskController.listTaskByStatus);
router.get("/task-count-by-status", authMiddleware, taskController.taskCountByStatus);





module.exports = router
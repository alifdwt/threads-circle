import * as express from "express";
import ThreadControllers from "../controllers/ThreadControllers";
import UserControllers from "../controllers/UserControllers";

const router = express.Router();

// THREADS ROUTES
router.get("/threads", ThreadControllers.findThreads);
router.get("/thread/:threadId", ThreadControllers.getThreadById);
router.post("/thread", ThreadControllers.createThread);
router.patch("/thread/:threadId", ThreadControllers.updateThread);
router.delete("/thread/:threadId", ThreadControllers.deleteThread);

// USERS ROUTES
router.get("/users", UserControllers.findUsers);
router.get("/user/:userId", UserControllers.getUserById);
router.post("/user", UserControllers.createUser);
router.patch("/user/:userId", UserControllers.updateUser);
router.delete("/user/:userId", UserControllers.deleteUser);

export default router;

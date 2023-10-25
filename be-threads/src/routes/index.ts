import * as express from "express";
import ThreadControllers from "../controllers/ThreadControllers";
import UserControllers from "../controllers/UserControllers";
import ReplyControllers from "../controllers/ReplyControllers";
import LikeControllers from "../controllers/LikeControllers";

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

// REPLY ROUTES
router.get("/replies", ReplyControllers.findReplies);
router.get("/reply/:replyId", ReplyControllers.getReplyById);
router.post("/reply", ReplyControllers.createReply);
router.patch("/reply/:replyId", ReplyControllers.updateReply);
router.delete("/reply/:replyId", ReplyControllers.deleteReply);

// LIKE ROUTES
router.get("/likes", LikeControllers.findLikes);
router.get("/like/:likeId", LikeControllers.getLikeById);
router.post("/like", LikeControllers.createLike);
router.delete("/like/:likeId", LikeControllers.deleteLike);

export default router;

import * as express from "express";
import ThreadControllers from "../controllers/ThreadControllers";
import UserControllers from "../controllers/UserControllers";
import ReplyControllers from "../controllers/ReplyControllers";
import LikeControllers from "../controllers/LikeControllers";
import FollowingControllers from "../controllers/FollowingControllers";
import AuthMiddlewares from "../middlewares/Auth";
const upload = require("../middlewares/UploadFile");

const router = express.Router();

// THREADS ROUTES
router.get("/threads", ThreadControllers.findThreads);
router.get("/thread/:threadId", ThreadControllers.getThreadById);
router.get(
  "/threads/username/:username",
  ThreadControllers.getThreadsByUsername
);
router.get(
  "/threads/liked/:username",
  ThreadControllers.getThreadsThatUserLiked
);
router.post(
  "/thread",
  upload.single("image"),
  AuthMiddlewares.Authentication,
  ThreadControllers.createThread
);
router.patch("/thread/:threadId", ThreadControllers.updateThread);
router.delete("/thread/:threadId", ThreadControllers.deleteThread);

// USERS ROUTES
router.get("/users", UserControllers.findUsers);
router.get("/user/:userId", UserControllers.getUserById);
router.get("/user/username/:username", UserControllers.getUserByUsername);
router.post(
  "/user",
  upload.single("profile_picture"),
  UserControllers.createUser
);
router.post("/user/login", UserControllers.loginUser);
router.get(
  "/user/check",
  AuthMiddlewares.Authentication,
  UserControllers.checkUser
);
router.patch("/user/:userId", UserControllers.updateUser);
router.delete("/user/:userId", UserControllers.deleteUser);

// REPLY ROUTES
router.get("/replies", ReplyControllers.findReplies);
router.get("/reply/:replyId", ReplyControllers.getReplyById);
router.get("/replies/thread/:threadId", ReplyControllers.getRepliesByThreadId);
router.post(
  "/reply",
  AuthMiddlewares.Authentication,
  ReplyControllers.createReply
);
router.patch("/reply/:replyId", ReplyControllers.updateReply);
router.delete("/reply/:replyId", ReplyControllers.deleteReply);

// LIKE ROUTES
router.get("/likes", LikeControllers.findLikes);
router.get("/like/:likeId", LikeControllers.getLikeById);
// router.get("/likes/username/:username", LikeControllers.getUserLikes);
router.post("/like", LikeControllers.createLike);
router.delete("/like/:likeId", LikeControllers.deleteLike);

// Following Routes
router.get("/follows", FollowingControllers.findFollows);
router.get("/follow/:followId", FollowingControllers.getFollowById);
router.get(
  "/follows/userId/:followId",
  FollowingControllers.findUsersThatDoNotFollow
);
router.post(
  "/follow",
  AuthMiddlewares.Authentication,
  FollowingControllers.createFollow
);

export default router;

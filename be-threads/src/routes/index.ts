import * as express from "express";
import ThreadControllers from "../controllers/ThreadControllers";
import UserControllers from "../controllers/UserControllers";
import ReplyControllers from "../controllers/ReplyControllers";
import LikeControllers from "../controllers/LikeControllers";
import FollowingControllers from "../controllers/FollowingControllers";
import AuthMiddlewares from "../middlewares/Auth";
import FileUpload from "../middlewares/UploadFileNew";
const upload = require("../middlewares/UploadFile");

const router = express.Router();
const UploadMiddleware = new FileUpload("image");

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
  UploadMiddleware.handleUpload.bind(UploadMiddleware),
  AuthMiddlewares.Authentication,
  ThreadControllers.createThread
);
router.patch(
  "/thread/:threadId",
  UploadMiddleware.handleUpload.bind(UploadMiddleware),
  AuthMiddlewares.Authentication,
  ThreadControllers.updateThread
);
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
router.patch(
  "/user/:userId",
  UploadMiddleware.handleUpload.bind(UploadMiddleware),
  AuthMiddlewares.Authentication,
  UserControllers.updateUser
);
router.delete("/user/:userId", UserControllers.deleteUser);

// REPLY ROUTES
router.get("/replies", ReplyControllers.findReplies);
router.get("/reply/:replyId", ReplyControllers.getReplyById);
router.get("/replies/thread/:threadId", ReplyControllers.getRepliesByThreadId);
router.post(
  "/reply",
  UploadMiddleware.handleUpload.bind(UploadMiddleware),
  AuthMiddlewares.Authentication,
  ReplyControllers.createReply
);
router.patch(
  "/reply/:replyId",
  UploadMiddleware.handleUpload.bind(UploadMiddleware),
  AuthMiddlewares.Authentication,
  ReplyControllers.updateReply
);
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
router.delete(
  "/follow/:followId",
  AuthMiddlewares.Authentication,
  FollowingControllers.deleteFollow
);

export default router;

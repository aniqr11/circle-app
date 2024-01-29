import { Request, Response, Router } from "express";
import ThreadsControllers from "../controllers/ThreadsControllers";
import UserControllers from "../controllers/userControllers";
import auth_middleware from "../middleware/user_middleware";
// import upload_file from "../middleware/upload_file";
import uploadImage from "../middleware/upload_file";
import ReplyControllers from "../controllers/reply_controllers";
import userControllers from "../controllers/userControllers";

const router = Router();

// threads
router.get("/threads", ThreadsControllers.find);
router.get("/threads/:id", ThreadsControllers.findOne);
router.post(
  "/threads",
  auth_middleware.auth,
  uploadImage.upload("image"),
  ThreadsControllers.create
);

// userauth
router.post("/register", UserControllers.create); //untuk register
router.post("/login", UserControllers.login); //untuk login
router.get("/check", auth_middleware.auth, UserControllers.check); //untuk login
router.get("/search", UserControllers.findOne); //untuk search
router.get("/users", UserControllers.findAll); //untuk search
router.patch(
  "/users",
  auth_middleware.auth,
  uploadImage.upload("profile_picture"),
  userControllers.update
);

//reply
router.get("/reply/:threadId", ReplyControllers.find);
router.post("/reply", auth_middleware.auth, ReplyControllers.create);

export default router;

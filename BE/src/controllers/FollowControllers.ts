import { Request, Response } from "express";
import FollowService from "../services/FollowService";

class FollowControllers {
  followUser(req: Request, res: Response) {
    FollowService.followUser(req, res);
  }
  getFollowingUsers(req: Request, res: Response) {
    FollowService.getFollowingUsers(req, res);
  }
  getFollowerUsers(req: Request, res: Response) {
    FollowService.getFollowerUsers(req, res);
  }
}

export default new FollowControllers();

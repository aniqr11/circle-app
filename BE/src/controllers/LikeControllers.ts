import { Request, Response } from "express";
import LikeService from "../services/LikeService";

class LikeControllers {
  find(req: Request, res: Response) {
    LikeService.find(req, res);
  }
  findOne(req: Request, res: Response) {
    LikeService.findOne(req, res);
  }
  create(req: Request, res: Response) {
    LikeService.create(req, res);
  }
  delete(req: Request, res: Response) {
    LikeService.delete(req, res);
  }
}

export default new LikeControllers();

import { Request, Response } from "express";
import ThreadsService from "../services/threads_service";

export default new (class threads {
  find(req: Request, res: Response) {
    ThreadsService.findAll(req, res);
  }

  create(req: Request, res: Response) {
    ThreadsService.create(req, res);
  }
  findOne(req: Request, res: Response) {
    ThreadsService.findOne(req, res);
  }
})();

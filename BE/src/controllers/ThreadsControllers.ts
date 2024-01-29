import { Request, Response } from "express";
import ThreadsService from "../services/threads_service";
import threads_queue from "../queue/threads_queue";

export default new (class threads {
  find(req: Request, res: Response) {
    ThreadsService.findAll(req, res);
  }

  create(req: Request, res: Response) {
    // threads_queue.create(req, res);
    ThreadsService.create(req, res);
  }
  findOne(req: Request, res: Response) {
    ThreadsService.findOne(req, res);
  }
})();

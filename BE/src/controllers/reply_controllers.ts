import { Request, Response } from "express";
import ReplyService from "../services/reply_servie";


export default new class threads {
    find(req: Request, res: Response) {
		ReplyService.find(req, res);
	}
    create(req: Request, res: Response) {
		ReplyService.create(req, res);
	}

}
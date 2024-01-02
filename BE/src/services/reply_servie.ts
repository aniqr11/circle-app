import { Repository } from "typeorm";
import { Reply } from "../entity/reply";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { replySchema } from "../utils/validator";
import { log } from "console";

export default new (class ReplyService {
  private readonly ReplyRepository: Repository<Reply> =
    AppDataSource.getRepository(Reply);

  async find(req: Request, res: Response): Promise<Response> {
    const threadId = +req.params.threadId;
    try {
      const reply = await this.ReplyRepository.find({
        select: {
          user: {
            id: true,
            fullname: true,
            username: true,
            profile_picture: true,
          },
          thread: {
            id: true,
            content: true,
          },
        },
        relations: { user: true, thread: true },
        where: {
          thread: {
            id: threadId,
          },
        },
        order: { created_at: "DESC" },
      });
      return res.status(200).json({ data: reply });
    } catch (error) {
      res.status(500).json({ error: "error on find select reply" });
    }
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const data = {
        content: req.body.content,
        thread: req.body.thread,
        // image: req.body.image
        user: res.locals.loginSession.User.id,
      };
      const { error, value } = replySchema.validate(data);
      if (error) return res.status(400).json({ error: error });

      const reply = this.ReplyRepository.create({
        content: value.content,
        thread: value.thread,
        // image: image,
        user: data.user,
      });
      const createReply = await this.ReplyRepository.save(reply);
      return res.status(200).json(createReply);
    } catch (error) {
      console.log(error);

      return res.status(500).json({ massage: "error while create reply" });
    }
  }
})();

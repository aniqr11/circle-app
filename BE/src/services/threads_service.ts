import { Repository } from "typeorm";
import { Thread } from "../entity/threads";
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { v2 } from "cloudinary";
import { postSchema } from "../utils/validator";
import { uploadToCloudinary } from "../utils/cloudinary";

export default new (class ThreadService {
  private readonly ThreadsRepository: Repository<Thread> =
    AppDataSource.getRepository(Thread);

  async findAll(req: Request, res: Response): Promise<Response> {
    try {
      const ThreadFind = await this.ThreadsRepository.find({
        relations: ["user", "reply"],
        order: { created_at: "DESC" },
      });
      return res.status(200).json(ThreadFind);
    } catch (err) {
      return res.status(500).json({ massage: "error while find Threads" });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const logSes = res.locals.loginSession;
      // const image = res.locals.filename
      const data = {
        content: req.body.content,
        // image,
        user: logSes.User.id,
      };
      const { error, value } = postSchema.validate(data);
      if (error) return res.status(400).json({ error: error });

      let image = "";

      if (req.file?.filename) {
        image = await uploadToCloudinary(req.file);
      }

      const threads = this.ThreadsRepository.create({
        content: data.content,
        image: image,
        user: data.user,
      });

      //   v2.config({
      //     cloud_name: 'diwvvx24j',
      //     api_key: '259495521649858',
      //     api_secret: 'UAzEcA_hiOxHtD9yFTSaothbQ2I',
      //     secure: true,
      //   });

      await this.ThreadsRepository.save(threads);

      return res.status(200).json(threads);
    } catch (error) {
      console.log(error);

      return res.status(500).json({ massage: "error while create Threads" });
    }
  }

  async findOne(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);
      const threads = await this.ThreadsRepository.find({
        where: { id: id },
        relations: ["user"],
      });
      return res.status(200).json({
        data: threads,
      });
    } catch (err) {
      console.log(err);

      return res.status(500).json({ massage: "error while find Threads" });
    }
  }
})();

import { Repository } from "typeorm";
import { Thread } from "../entity/threads";
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { v2 } from "cloudinary";
import { postSchema } from "../utils/validator";
import { deleteFile, uploadToCloudinary } from "../utils/cloudinary";

class ThreadServices {
  private readonly ThreadRepository: Repository<Thread> =
    AppDataSource.getRepository(Thread);

  // async findAll(req: Request, res: Response): Promise<Response> {
  //   try {
  //     const ThreadFind = await this.ThreadRepository.find({
  //       relations: ["user", "reply"],
  //       order: { created_at: "DESC" },
  //     });
  //     return res.status(200).json(ThreadFind);
  //   } catch (err) {
  //     return res.status(500).json({ massage: "error while find Threads" });
  //   }
  // }

  async findAll(req: Request, res: Response): Promise<Response> {
    try {
      const threads = await this.ThreadRepository.find({
        relations: ["user", "reply", "likes", "reply.user", "likes.user"],
        // select: {
        // 	user: {
        // 		id: true,
        // 		fullname: true,
        // 		email: true,
        // 		profile_picture: true,
        // 		username: true,
        // 	},
        // },
        order: {
          created_at: "DESC",
        },
      });
      // return res.status(200).json(threads);
      return res.status(200).json({ code: 200, data: threads });
    } catch (error) {
      res.status(500).json({ error: "error while getting threads" });
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

      const threads = this.ThreadRepository.create({
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

      await this.ThreadRepository.save(threads);

      return res.status(200).json(threads);
    } catch (error) {
      console.log(error);

      return res.status(500).json({ massage: "error while create Threads" });
    }
  }

  async findOne(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);
      const threads = await this.ThreadRepository.find({
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

  // async update(req: Request, res: Response): Promise<Response> {
  // 	try {
  // 		const id = parseInt(req.params.id);
  // 		const thread = await this.ThreadRepository.findOne({
  // 			where: { id: id },
  // 		});
  // 		const data = req.body;
  // 		const { error, value } = updateTHreadSchema.validate(data);
  // 		if (error) {
  // 			return res.status(400).json({ error: error.details[0].message });
  // 		}
  // 		thread.content = value.content;
  // 		thread.image = value.image;
  // 		const updateThread = await this.ThreadRepository.save(thread);
  // 		return res.status(200).json(updateThread);
  // 	} catch (error) {
  // 		res.status(500).json({ error: "error while updating thread" });
  // 	}
  // }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);
      const thread = await this.ThreadRepository.findOne({
        where: { id: id },
      });
      const deleteThread = await this.ThreadRepository.delete(thread);
      return res.status(200).json(deleteThread);
    } catch (error) {
      res.status(500).json({ error: "error while deleting thread" });
    }
  }
}

export default new ThreadServices();

import { Repository } from "typeorm";

import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { likeSchema } from "../utils/validator";
import { Like } from "../entity/like";

class LikeServices {
  private readonly LikeRepository: Repository<Like> =
    AppDataSource.getRepository(Like);

  async find(req: Request, res: Response): Promise<Response> {
    try {
      const likes = await this.LikeRepository.find({
        relations: ["thread", "user"],
      });
      return res.status(200).json({ code: 200, data: likes });
    } catch (error) {
      res.status(500).json({ error: "error while getting likes" });
    }
  }
  async findOne(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);
      const like = await this.LikeRepository.findOne({
        where: { id: id },
        relations: ["thread", "user"],
      });
      return res.status(200).json(like);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const data = req.body;
      const { error, value } = likeSchema.validate(data);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const likeSelected: Like | null = await this.LikeRepository.findOne({
        where: {
          user: {
            id: res.locals.loginSession.User.id,
          },
          thread: {
            id: value.thread,
          },
        },
      });

      if (likeSelected) {
        await this.LikeRepository.remove(likeSelected);
        return res.status(200).json({ message: "like deleted" });
      }

      const like = this.LikeRepository.create({
        user: res.locals.loginSession.User.id,
        thread: value.thread,
      });

      const createLike = await this.LikeRepository.save(like);
      return res.status(200).json(createLike);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "error while updating likes" });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);
      const like = await this.LikeRepository.findOne({
        where: { id: id },
        relations: ["thread", "user"],
      });
      if (!like) {
        return res.status(404).json("Like not found");
      }
      const likeDeleted = await this.LikeRepository.remove(like);
      return res.status(200).json(likeDeleted);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }
}

export default new LikeServices();

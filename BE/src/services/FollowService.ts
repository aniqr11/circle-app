import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { User } from "../entity/User";
import { FollowSchema } from "../utils/validator";

export default new (class FollowServices {
  private readonly UserRepository: Repository<User> =
    AppDataSource.getRepository(User);

  async followUser(req: Request, res: Response): Promise<Response> {
    try {
      const userId = res.locals.loginSession.User.id; // Pengguna yang melakukan tindakan follow

      // const { user_id } = req.body;

      const { error, value } = FollowSchema.validate(req.body);

      if (error) {
        return res.status(400).json({
          code: 400,
          message: "Invalid input. Please provide a valid user_id.",
        });
      }

      const user = await this.UserRepository.findOne({
        where: {
          id: userId,
        },
        relations: ["following"],
      });
      const userToFollow = await this.UserRepository.findOne({
        where: {
          id: value.user,
        },
      });
      if (!user || !userToFollow) {
        return res.status(404).json({ code: 404, message: "User not found" });
      }

      // check if the user is alredy following the target user

      const isAlreadyFollowing = user.following.some(
        (followedUser) => followedUser.id === value.user
      );

      if (isAlreadyFollowing) {
        // if already following, unfollow
        user.following = user.following.filter(
          (followedUser) => followedUser.id !== value.user
        );
      } else {
        // if not following, follow
        user.following.push(userToFollow);
      }

      await this.UserRepository.save(user);

      const message = isAlreadyFollowing
        ? "Unfollowed successfully"
        : "Followed successfully";

      return res.status(200).json({ code: 200, message });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ code: 500, message: error });
    }
  }

  async getFollowingUsers(req: Request, res: Response): Promise<Response> {
    try {
      // ID pengguna yang ingin mendapatkan daftar yang diikuti
      const userId = res.locals.loginSession.User.id;

      const user = await this.UserRepository.findOne({
        where: {
          id: userId,
        },
        relations: ["following"],
      });

      if (!user) {
        return res.status(404).json({ code: 404, message: "User not found" });
      }
      return res.status(200).json({ code: 200, data: user.following });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ code: 500, message: error });
    }
  }

  async getFollowerUsers(req: Request, res: Response): Promise<Response> {
    try {
      // ID pengguna yang ingin mendapatkan daftar yang diikuti
      const userId = res.locals.loginSession.User.id;

      const user = await this.UserRepository.findOne({
        where: {
          id: userId,
        },
        relations: ["followers"],
      });

      if (!user) {
        return res.status(404).json({ code: 404, message: "User not found" });
      }
      return res.status(200).json({ code: 200, data: user.followers });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ code: 500, message: error });
    }
  }
})();

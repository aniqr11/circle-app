import { User } from "../entity/User";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import {
  loginSchema,
  registerSchema,
  updateUserSchema,
} from "../utils/validator";
import * as bcyrpt from "bcrypt";
import * as JWT from "jsonwebtoken";
import { uploadToCloudinary } from "../utils/cloudinary";

export default new (class UserService {
  private readonly UserRepository: Repository<User> =
    AppDataSource.getRepository(User);

  async find(req: Request, res: Response): Promise<Response> {
    try {
      const users = await this.UserRepository.find({
        select: [
          "email",
          "fullname",
          "id",
          "profile_description",
          "profile_picture",
          "username",
        ],
      });
      return res.status(200).json({ code: 200, data: users });
    } catch (error) {
      res.status(500).json({ error: "error while getting users" });
    }
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const data = req.body;
      const { error } = registerSchema.validate(data);
      if (error) {
        console.log("error vlidating user", error);
        return res.status(400).json({ error: error.details[0].message });
      }

      const hashPassword = await bcyrpt.hash(data.password, 10);

      const user = this.UserRepository.create({
        username: data.username,
        fullname: data.fullname,
        email: data.email,
        password: hashPassword,
      });

      const createUser = await this.UserRepository.save(user);

      return res.status(200).json({ user: createUser });
    } catch (error) {
      console.log("error register", error);
      return res.status(400).json({ error: "Error" });
    }
  }

  async login(req: Request, res: Response): Promise<Response> {
    try {
      const body = req.body;

      const { error, value } = loginSchema.validate(body);
      if (error)
        return res.status(400).json({ message: "Error while validating data" });

      const user = await this.UserRepository.findOne({
        where: { email: value.email },
      });
      if (!user)
        return res
          .status(409)
          .json({ message: "Email isnt Registerd, Change!" });

      const isMatchPassword = await bcyrpt.compare(
        value.password,
        user.password
      );
      if (!isMatchPassword)
        return res.status(409).json({ message: "Incorrect Password!!!!!" });

      const User = this.UserRepository.create({
        id: user.id,
        fullname: user.fullname,
        email: user.email,
        username: user.username,
        profile_picture: user.profile_picture,
        profile_description: user.profile_description,
      });

      const token = JWT.sign({ User }, "SECRET_KEY", { expiresIn: 9999999 });

      return res.status(201).json({ token });
    } catch (error) {
      console.log(error.message, "error login");
      return res.status(500).json({ message: "error" });
    }
  }

  async check(req: Request, res: Response): Promise<any> {
    try {
      const loginSes = res.locals.loginSession;
      const user = await this.UserRepository.findOne({
        where: { id: loginSes.User.id },
      });

      return res.status(200).json({
        message: "token is valid",
        user,
      });
    } catch (error) {
      res.status(500).json({ message: "error on check token" });
    }
  }

  async update(req: Request, res: Response): Promise<any> {
    try {
      // const id = parseInt(req.params.id);
      const data = req.body;
      const { error, value } = updateUserSchema.validate(data);

      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
      const user = await this.UserRepository.findOne({
        where: { id: res.locals.loginSession.User.id },
      });

      let profile_picture = "";
      if (req.file?.filename) {
        profile_picture = await uploadToCloudinary(req.file);
      }

      user.fullname = value.fullname;
      user.username = value.username;
      user.email = value.email;
      user.profile_picture = profile_picture;
      user.profile_description = value.profile_description;
      const updateUser = await this.UserRepository.save(user);

      // const jwtPayload = {
      //   id: updateUser.id,
      //   fullname: updateUser.fullname,
      //   username: updateUser.username,
      //   email: updateUser.email,
      //   profile_picture: updateUser.profile_picture,
      //   profile_description: updateUser.profile_description,
      // };

      // Sign the JWT token   with the updated user data
      const token = JWT.sign({ updateUser }, "SECRET_KEY", {
        expiresIn: 9999999,
      });

      return res.status(200).json(token);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async findOne(req: Request, res: Response): Promise<Response> {
    try {
      const id = res.locals.loginSession.User.id;
      const user = await this.UserRepository.findOne({
        where: { id: id },
        // relations: ["following", "followers", "threads"],
      });
      return res.status(200).json(user);
    } catch (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
  }
})();

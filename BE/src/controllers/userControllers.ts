import { Request, Response } from "express";
import UserService from "../services/user_service";

export default new (class UserControllers {
  findAll(req: Request, res: Response) {
    UserService.find(req, res);
  }

  create(req: Request, res: Response) {
    UserService.create(req, res);
  }
  update(req: Request, res: Response) {
    UserService.update(req, res);
  }

  login(req: Request, res: Response) {
    UserService.login(req, res);
  }
  check(req: Request, res: Response) {
    UserService.check(req, res);
  }
  findOne(req: Request, res: Response) {
    UserService.findOne(req, res);
  }
})();

// import { registerSchema } from "../utils/auth_validator"

// export default new class AuthController {
//     async register(req, res) {
//         try {
//             const data = req.body

//             const{ error, value } = registerSchema.validate(data)
//             if(error) return res.status(400).json({ messages: "error regist controler" })

//         } catch (error) {

//         }
//     }
// }

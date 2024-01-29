import * as ampq from "amqplib";
import { Request, Response } from "express";
import { postSchema } from "../utils/validator";
import sendToQueue from "../libs/rabbitmq";

export default new (class ThreadQueue {
  async create(req: Request, res: Response) {
    try {
      const data = {
        content: req.body.content,
        image: res.locals.filename,
        user: res.locals.loginSession.User.id,
      };

      const { error, value } = postSchema.validate(data);
      if (error) return res.status(400).json(error.details[0].message);

      const errorQueue = await sendToQueue("thread-queue", value);
      if (errorQueue) return res.status(500).json({ message: errorQueue });

      return res
        .status(201)
        .json({ message: "sucses creating a new thread", data });
    } catch (error) {
      return res.status(500).json({
        message: "reroe thread_queue",
        data: error.details[0].message,
      });
    }
  }
})();

// class QueueController {
//   async enqueue(req: Request, res: Response) {
//     try {
//       const payload = {
//         content: req.body.content,
//         image: res.locals.filename,
//         user: res.locals.loginSession.User.id
//       };

//       const connection = await ampq.connect("ampq://localhost");
//       const channel = await connection.createChannel();

//       await channel.assertQueue("thread-queue");

//       channel.sendToQueue("thread-queue", Buffer.from(JSON.stringify(payload)));

//       await channel.close();
//       await channel.close();

//       res.status(200).json({ message: "thread is queue" });
//     } catch (error) {
//       console.error("error enqueuing", error);
//       res.status(500).json({ error: "error queue thread" });
//     }
//   }
// }

// export default new QueueController()

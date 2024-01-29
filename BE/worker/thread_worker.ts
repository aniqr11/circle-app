import { EventEmitter } from "stream";
import * as amqp from "amqplib";
import cloudinary from "../src/libs/cloudinary";
import { Repository } from "typeorm";
import { Thread } from "../src/entity/threads";
import { AppDataSource } from "../src/data-source";

export default new (class ThreadWorker extends EventEmitter {
  private readonly ThreadsRepository: Repository<Thread> =
    AppDataSource.getRepository(Thread);

  async create(queueName: string, connect: amqp.Connection) {
    const channel = await connect.createChannel();

    await channel.assertQueue(queueName);
    await channel.consume(queueName, async (message) => {
      if (message) {
        try {
          const payload = JSON.parse(message.content.toString());
          console.log(payload);
          cloudinary.upload();

          const uploadCloudinary = await cloudinary.destination(payload.image);

          const obj = this.ThreadsRepository.create({
            content: payload.content,
            image: uploadCloudinary,
            user: {
              id: payload.user,
            },
          });

          console.log("ini obj", obj);

          await this.ThreadsRepository.save(obj);
        } catch (error) {
          console.log(error.message, "thread error in worker queue");
        }
      }
    });
  }
})();

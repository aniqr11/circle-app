import { AppDataSource } from "../src/data-source";
import * as amqp from "amqplib";
import thread_worker from "./thread_worker";

AppDataSource.initialize()
  .then(async () => {
    // console.log("connecting worker");
    const connection = await amqp.connect("amqp://localhost");
    // run worker thread

    await thread_worker.create("thread-queue", connection);
  })
  .catch((err) => console.log(err.message));

// import * as ampq from "amqplib";

// async function processQueue() {
//   try {
//     const connection = await ampq.connect("ampq://localhost");
//     const channel = await connection.createChannel();

//     await channel.assertQueue("thread-queue");

//     await channel.consume("thread-queue", (message) => {
//       if (message !== null) {
//         const payload = JSON.parse(message.content.toString());

//         console.log("received message", payload);

//         channel.ack(message);
//       }
//     });
//   } catch (error) {
//     console.error("error process queue", error);
//   }
// }

// processQueue;

// "worker": "nodemon --exec src/worker/rabbit.ts",

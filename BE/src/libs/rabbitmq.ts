import * as amqp from "amqplib";

// export default new class RabbitConfig {
//     async sendToQueue(queueName: string, payload: any) : Promise<any> {
//         try {
//             const connection = await ampq.connect("ampq://localhost");
//             const channel = await connection.createChannel();

//             await channel.assertQueue(queueName)

//             channel.sendToQueue(queueName, Buffer.from(JSON.stringify(payload)))

//             await channel.close()
//             await connection.close()

//             return null
//         } catch (error) {

//         }
//     }
// }

export default async function sendToQueue(
  queueName: string,
  payload: any
): Promise<boolean> {
  try {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();

    await channel.assertQueue(queueName);

    // console.log("ini py", payload);

    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(payload)));

    await channel.close();
    await connection.close();

    return null;
  } catch (error) {
    return error.message;
  }
}

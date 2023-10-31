import * as amqplib from "amqplib";
import { Repository } from "typeorm";
import { Threads } from "../entities/threads";
import { AppDataSource } from "../data-source";
import { EventEmitter } from "stream";

export default new (class ThreadWorker {
  private readonly ThreadRepository: Repository<Threads> =
    AppDataSource.getRepository(Threads);
  private emitter = new EventEmitter();

  async createThread(queueName: string, connection: amqplib.connection) {
    try {
      try {
        const channel = await connection.createChannel();
        await channel.assertQueue(queueName);
        await channel.consume(queueName, async (message) => {
          if (message !== null) {
            const payload = JSON.parse(message.content.toString());
            // const cloudinaryResponse = await cloudinary.destination(payload.image)
            const thread = this.ThreadRepository.create({
              content: payload.content,
              image: payload.image,
              user: {
                id: payload.userId,
              },
            });

            const threadResponse = await this.ThreadRepository.save(thread);
            this.emitter.emit("message");
            console.log("(Worker): Thread is created!");

            channel.ack(message);
          }
        });
      } catch (error) {
        console.log("(Worker): Failed to create thread!");
      }
    } catch (error) {
      console.error(error);
    }
  }
})();

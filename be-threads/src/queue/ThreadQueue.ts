import { Request, Response } from "express";
import createThreadsSchema from "../utils/validator/threads";
import MessageQueue from "../libs/rabbitmq";

export default new (class ThreadQueue {
  async createThread(req: Request, res: Response) {
    try {
      const queueName: string = process.env.THREAD;
      const loginSession = res.locals.loginSession;

      const data = {
        content: req.body.content,
        image: res.locals.filename,
        userId: loginSession.user.id,
      };

      const { error, value } = createThreadsSchema.validate(data);
      if (error) return res.status(400).json({ error });

      const payload = {
        content: value.content,
        image: value.image,
        user: loginSession.user.id,
      };

      const errorQueue = await MessageQueue.MessageSend(queueName, payload);
      if (errorQueue)
        return res.status(500).json({
          error: errorQueue,
          message: "Error while sending message queue",
        });

      // console.log(payload);
      return res.status(201).json({ message: "Thread is queued!", payload });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
        message: "Error in thread queue method",
      });
    }
  }
})();

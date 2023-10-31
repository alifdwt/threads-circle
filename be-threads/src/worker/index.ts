import { AppDataSource } from "../data-source";
import * as amqp from "amqplib";
import ThreadWorker from "./ThreadWorker";

export default new (class WorkerHub {
  constructor() {
    AppDataSource.initialize()
      .then(async () => {
        // cloudinary.upload()
        const connection = await amqp.connection(process.env.RABBIT_MQ);

        const resp = await ThreadWorker.createThread(
          process.env.THREAD,
          connection
        );
      })
      .catch((error) => console.error(error));
  }
})();

import { AppDataSource } from "../data-source";
import * as amqp from "amqplib";
import ThreadWorker from "./ThreadWorker";
import cloudinary from "../libs/cloudinary";

export default new (class WorkerHub {
  constructor() {
    AppDataSource.initialize()
      .then(async () => {
        cloudinary.upload();
        const connection = await amqp.connection(process.env.RABBIT_MQ);

        const resp = await ThreadWorker.createThread(
          process.env.THREAD,
          connection
        );
        console.log(resp);
      })
      .catch((error) => console.error(error));
  }
})();

import ThreadAPI from "./ThreadCardAPI";
import UserListAPI from "./UserListAPI";

type ReplyAPI = {
  id: number;
  content: string;
  image: string;
  user: UserListAPI;
  thread: ThreadAPI;
};

export default ReplyAPI;

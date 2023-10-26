import ThreadAPI from "./ThreadCardAPI";
import UserListAPI from "./UserListAPI";

type ReplyAPI = {
  id: number;
  content: string;
  image: string | null;
  user?: UserListAPI;
  thread?: ThreadAPI;
  created_at: string;
  updated_at: string;
};

export default ReplyAPI;

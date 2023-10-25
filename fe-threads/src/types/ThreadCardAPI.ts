import LikeAPI from "./LikeListAPI";
import ReplyAPI from "./ReplyListAPI";
import UserListAPI from "./UserListAPI";

type ThreadAPI = {
  id: number;
  content: string;
  image: string;
  user: UserListAPI;
  replies: ReplyAPI[];
  likes: LikeAPI[];
  created_at: string;
  updated_at: string;
};

export default ThreadAPI;

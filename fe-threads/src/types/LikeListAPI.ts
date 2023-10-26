import ThreadAPI from "./ThreadCardAPI";
import UserListAPI from "./UserListAPI";

type LikeAPI = {
  id: number;
  user?: UserListAPI;
  thread?: ThreadAPI;
  created_at: string;
  updated_at: string;
};

export default LikeAPI;

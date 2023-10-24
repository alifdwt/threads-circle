import UserListAPI from "./UserListAPI";

type ThreadAPI = {
  id: number;
  content: string;
  image: string;
  user: UserListAPI;
};

export default ThreadAPI;

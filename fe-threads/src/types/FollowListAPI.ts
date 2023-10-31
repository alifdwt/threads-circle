import UserListAPI from "./UserListAPI";

type FollowAPI = {
  id: number;
  follower: UserListAPI;
  following: UserListAPI;
  created_at: string;
  updated_at: string;
};

export default FollowAPI;

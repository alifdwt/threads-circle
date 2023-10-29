import FollowAPI from "./FollowListAPI";
import LikeAPI from "./LikeListAPI";
import ThreadAPI from "./ThreadCardAPI";

type UserListAPI = {
  id: number;
  email: string;
  password: string;
  full_name: string;
  profile_description: string;
  profile_picture: string;
  username: string;
  created_at: string;
  updated_at: string;
  threads?: ThreadAPI[];
  likes?: LikeAPI[];
  followers?: FollowAPI[];
  following?: FollowAPI[];
};

export default UserListAPI;

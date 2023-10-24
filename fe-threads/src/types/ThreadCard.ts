type ThreadCardType = {
  id: number;
  author_picture: string;
  author_name: string;
  author_username: string;
  thread: string;
  image: string;
  likes_count: number;
  replies_count: number;
  is_verified: boolean;
  is_followed: boolean;
};

export default ThreadCardType;

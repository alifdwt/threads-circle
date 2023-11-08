import { API } from "@/config/api";
import FollowAPI from "@/types/FollowListAPI";
import UserListAPI from "@/types/UserListAPI";
import { useQuery } from "@tanstack/react-query";

export const useFollow = (followId: number) => {
  const { isLoading, data: getFollow } = useQuery<FollowAPI>({
    queryKey: ["followForFollowCard"],
    queryFn: async () =>
      await API.get(`/follow/${followId}`).then((res) => res.data.data),
    refetchInterval: 100,
  });

  return {
    isLoading,
    getFollow,
  };
};

export const useFollows = () => {
  const { isLoading, data: getFollows } = useQuery<FollowAPI[]>({
    queryKey: ["followsForFollowCard"],
    queryFn: async () => await API.get(`/follows`).then((res) => res.data.data),
    refetchInterval: 100,
  });

  return {
    isLoading,
    getFollows,
  };
};

export const useUser = (userId: number) => {
  const { isLoading, data: getUser } = useQuery<UserListAPI>({
    queryKey: ["userForFollowCard"],
    refetchInterval: 100,
    queryFn: async () =>
      await API.get(`/user/${userId}`).then((res) => res.data.data),
  });

  return { isLoading, getUser };
};

import { API } from "@/config/api";
import FollowAPI from "@/types/FollowListAPI";
import { useQuery } from "@tanstack/react-query";

export const useFollows = () => {
  const { isLoading, data: getFollows } = useQuery<FollowAPI[]>({
    queryKey: ["follows"],
    queryFn: async () => await API.get("/follows").then((res) => res.data.data),
    refetchInterval: 100,
  });

  return {
    isLoading,
    getFollows,
  };
};

export const useFollow = (followId: number) => {
  const { isLoading, data: getFollow } = useQuery<FollowAPI>({
    queryKey: ["follow"],
    queryFn: async () =>
      await API.get(`/follow/${followId}`).then((res) => res.data.data),
    // refetchInterval: 100,
  });

  return {
    isLoading,
    getFollow,
  };
};

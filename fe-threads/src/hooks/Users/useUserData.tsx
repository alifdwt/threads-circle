import { API } from "@/config/api";
import UserListAPI from "@/types/UserListAPI";
import { useQuery } from "@tanstack/react-query";

const useUserData = (username: string) => {
  const {
    isLoading,
    data: getUserData,
    refetch,
  } = useQuery<UserListAPI>({
    queryKey: ["users"],
    queryFn: async () =>
      await API.get(`/user/username/${username}`).then((res) => res.data.data),
  });
  //   console.log(getUserData);

  return {
    isLoading,
    getUserData,
    refetch,
  };
};

export default useUserData;

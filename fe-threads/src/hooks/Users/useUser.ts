import { API } from "@/config/api";
import UserListAPI from "@/types/UserListAPI";
import { useQuery } from "@tanstack/react-query";

const useUser = (props: { userId: number }) => {
  const { data: getUser, refetch } = useQuery<UserListAPI>({
    queryKey: ["users"],
    queryFn: async () =>
      await API.get(`/user/${props.userId}`).then((res) => res.data.data),
  });

  return { getUser, refetch };
};

export default useUser;

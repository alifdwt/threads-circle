import { API } from "@/config/api";
import UserListAPI from "@/types/UserListAPI";
import { useQuery } from "@tanstack/react-query";

export const useUser = (props: { userId: number }) => {
  const { isLoading, data: getUser } = useQuery<UserListAPI>({
    queryKey: ["users"],
    refetchInterval: 100,
    queryFn: async () =>
      await API.get(`/user/${props.userId}`).then((res) => res.data.data),
  });

  return { isLoading, getUser };
};

export const useUsers = () => {
  const { isLoading, data: getUsers } = useQuery<UserListAPI>({
    queryKey: ["users"],
    refetchInterval: 100,
    queryFn: async () => await API.get("/users").then((res) => res.data.data),
  });

  return { isLoading, getUsers };
};

export const useUsername = (props: { username: string }) => {
  const { isLoading, data: getUsername } = useQuery<UserListAPI>({
    queryKey: ["users"],
    refetchInterval: 100,
    queryFn: async () =>
      await API.get(`/user/username/${props.username}`).then(
        (res) => res.data.data
      ),
  });

  return { isLoading, getUsername };
};

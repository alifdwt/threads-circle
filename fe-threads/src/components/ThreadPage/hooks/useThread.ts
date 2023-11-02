import { API } from "@/config/api";
import ThreadAPI from "@/types/ThreadCardAPI";
import { useQuery } from "@tanstack/react-query";

const useThread = (threadId: number) => {
  const { data: getThread, isLoading } = useQuery<ThreadAPI>({
    queryKey: ["threadById"],
    queryFn: async () =>
      await API.get(`/thread/${threadId}`).then((res) => res.data.data),
    refetchInterval: 100,
  });

  return { getThread, isLoading };
};

export default useThread;

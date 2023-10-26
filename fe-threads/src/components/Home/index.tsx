import ThreadContainer from "@/features/threads/card";
// import ThreadCard from "@/features/threads/card/Thread";
// import threadsData from "@/mocks/threads";
import { Box } from "@chakra-ui/react";
import ThreadForm from "./ThreadForm";
import ThreadAPI from "@/types/ThreadCardAPI";
import { API } from "@/config/api";
// import { useQuery } from "@tanstack/react-query";
import ProfileId from "@/types/ProfileId";
import { useEffect, useState } from "react";

const HomeTimeline = (props: ProfileId) => {
  const { profileNum } = props;
  // const { data: thread, refetch } = useQuery({
  //   queryKey: ["threads"],
  //   queryFn: async () => await API.get("/threads").then((res) => res.data.data),
  // });
  const [thread, setThread] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await API.get("/threads");
      setThread(response.data.data);
    };
    fetchData();
  });

  return (
    <Box border={"1px solid gray"} borderRadius={"10px"}>
      <ThreadForm profileNum={profileNum} />
      {thread.map((datum: ThreadAPI) => (
        <ThreadContainer key={datum.id} {...datum} />
      ))}
    </Box>
  );
};

export default HomeTimeline;

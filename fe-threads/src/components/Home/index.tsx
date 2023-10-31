import ThreadContainer from "@/features/threads/card";
import { Box } from "@chakra-ui/react";
// import ThreadForm from "./ThreadFormCloudinaryWidget";
import ThreadAPI from "@/types/ThreadCardAPI";
import { API } from "@/config/api";
import { useEffect, useState } from "react";
import threadDummy from "@/mocks/threads";
import ThreadFormNew from "./ThreadForm";

const HomeTimeline = () => {
  const [thread, setThread] = useState<ThreadAPI[]>(threadDummy);
  useEffect(() => {
    const fetchData = async () => {
      const response = await API.get("/threads");
      setThread(response.data.data);
    };
    fetchData();
  });

  return (
    <Box border={"1px solid gray"} borderRadius={"10px"}>
      <ThreadFormNew />
      {thread.map((datum: ThreadAPI) => (
        <ThreadContainer key={datum.id} datum={datum} />
      ))}
    </Box>
  );
};

export default HomeTimeline;

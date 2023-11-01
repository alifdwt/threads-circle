import ThreadContainer from "@/features/threads/card";
import { Box } from "@chakra-ui/react";
import ThreadFormNew from "./ThreadForm";
import useThreads from "../../hooks/Threads/useThread";

const HomeTimeline = () => {
  const { getThreads, isLoading } = useThreads();

  return (
    <Box border={"1px solid gray"} borderRadius={"10px"}>
      <ThreadFormNew />
      <ThreadContainer threads={isLoading ? [] : getThreads} />
    </Box>
  );
};

export default HomeTimeline;

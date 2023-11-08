import ThreadContainer from "@/features/threads/card";
import { Box } from "@chakra-ui/react";
import ThreadFormNew from "./ThreadForm";
import useThreads from "../../hooks/Threads/useThread";

const HomeTimeline = () => {
  const { getThreads, isLoading } = useThreads();

  return (
    <Box border={"1px solid gray"} borderRadius={"10px"}>
      <ThreadFormNew type="thread" identity={0} />
      <ThreadContainer threads={isLoading ? [] : getThreads} type="threads" />
    </Box>
  );
};

export default HomeTimeline;

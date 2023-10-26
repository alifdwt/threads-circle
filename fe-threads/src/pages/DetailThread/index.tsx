import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import ThreadPage from "@/components/ThreadPage";
import { Box, Flex } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

const DetailThread = () => {
  const { threadId } = useParams();
  return (
    <Box bg={"black"}>
      <Flex color={"white"} p={"20px"} gap={4}>
        <Box flex={"1"}>
          <Navbar />
        </Box>
        <Box flex={"2"}>
          <ThreadPage threadId={threadId} />
        </Box>
        <Box flex={"1"}>
          <Sidebar profileNum={2} />
        </Box>
      </Flex>
    </Box>
  );
};

export default DetailThread;

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import ThreadPage from "@/components/ThreadPage";
import { Box, Flex } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

const DetailThread = () => {
  const { threadId } = useParams();
  return (
    <Box bg={"blackAlpha.900"}>
      <Flex color={"white"} p={"20px"} gap={4}>
        <Box flex={"1"}>
          <Navbar />
        </Box>
        <Box flex={"2"}>
          <ThreadPage threadId={parseInt(threadId as string)} />
        </Box>
        <Box flex={"1"}>
          <Sidebar />
        </Box>
      </Flex>
    </Box>
  );
};

export default DetailThread;

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Box, Heading, Flex } from "@chakra-ui/react";

const Follows = () => {
  return (
    <Box>
      <Flex color={"white"} p={"20px"} gap={4}>
        <Box flex={"1"}>
          <Navbar />
        </Box>
        <Box flex={"2"}>
          <Heading textAlign={"center"}>Ini Follows</Heading>
        </Box>
        <Box flex={"1"}>
          <Sidebar />
        </Box>
      </Flex>
    </Box>
  );
};

export default Follows;

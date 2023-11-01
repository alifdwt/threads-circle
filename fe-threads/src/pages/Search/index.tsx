import Navbar from "@/components/Navbar";
import HeadingPage from "@/components/SearchPage";
import Sidebar from "@/components/Sidebar";
import { Box, Flex } from "@chakra-ui/react";

const Search = () => {
  return (
    <Box>
      <Flex color={"white"} p={"20px"} gap={4}>
        <Box flex={"1"}>
          <Navbar />
        </Box>
        <Box flex={"2"}>
          <HeadingPage />
        </Box>
        <Box flex={"1"}>
          <Sidebar />
        </Box>
      </Flex>
    </Box>
  );
};

export default Search;

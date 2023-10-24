import { ChakraProvider, Flex, Box } from "@chakra-ui/react";
import HomeTimeline from "./components/Home";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

const App = () => {
  return (
    <ChakraProvider>
      <Box bg={"black"}>
        <Flex color="white" p={"20px"} gap={4}>
          <Box flex={"1"}>
            <Navbar />
          </Box>
          <Box flex={"2"}>
            <HomeTimeline />
          </Box>
          <Box flex={"1"}>
            <Sidebar />
          </Box>
        </Flex>
      </Box>
    </ChakraProvider>
  );
};

export default App;

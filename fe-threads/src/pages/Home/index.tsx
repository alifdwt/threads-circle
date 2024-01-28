import HomeTimeline from "@/components/Home";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Flex, Box } from "@chakra-ui/react";
// import ProfileSelector from "./ProfileSelector";

const Home = () => {
  return (
    <Box>
      {/* <ProfileSelector /> */}
      <Box>
        <Flex p={"20px"} gap={4}>
          <Box flex={"1"} hideBelow={"md"}>
            <Navbar />
          </Box>
          <Box flex={"2"}>
            <HomeTimeline />
          </Box>
          <Box flex={"1"} hideBelow={"md"}>
            <Sidebar />
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default Home;

import { Box, Flex } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import ProfilePage from "@/components/ProfilePage";

const DetailProfile = () => {
  const { username } = useParams();

  return (
    <Box>
      <Flex color={"white"} p={"20px"} gap={4}>
        <Box flex={"1"}>
          <Navbar />
        </Box>
        <Box flex={"2"}>
          <ProfilePage username={username} />
        </Box>
        <Box flex={"1"}>
          <Sidebar />
        </Box>
      </Flex>
    </Box>
  );
};

export default DetailProfile;

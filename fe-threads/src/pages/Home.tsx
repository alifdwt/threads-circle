import HomeTimeline from "@/components/Home";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { API } from "@/config/api";
import UserListAPI from "@/types/UserListAPI";
// import ProfileOptions from "@/components/Sidebar/ProfileOptions";
import { Flex, Box, Select } from "@chakra-ui/react";
import { ChangeEvent, useEffect, useState } from "react";

const Home = () => {
  const [selectedProfile, setSelectedProfile] = useState(1);
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await API.get("/users");
      setProfiles(response.data.data);
    };
    fetchData();
  }, []);

  function selectedProfileId(e: ChangeEvent<HTMLSelectElement>) {
    const selectedId = parseInt(e.target.value);
    setSelectedProfile(selectedId);
    localStorage.setItem("selectedProfile", JSON.stringify(selectedId));
  }

  useEffect(() => {
    const storedProfile = localStorage.getItem("selectedProfile");
    if (storedProfile) {
      setSelectedProfile(JSON.parse(storedProfile));
    }
  }, []);
  return (
    <Box>
      <Select
        placeholder="Select profile"
        bg="white"
        color={"black"}
        name="profile"
        id="profile"
        value={selectedProfile}
        onChange={selectedProfileId}
      >
        {profiles.map((profile: UserListAPI) => (
          <option key={profile.id} value={profile.id}>
            {profile.full_name}
          </option>
        ))}
      </Select>
      <Box bg={"black"}>
        <Flex color="white" p={"20px"} gap={4}>
          <Box flex={"1"}>
            <Navbar />
          </Box>
          <Box flex={"2"}>
            <HomeTimeline profileNum={selectedProfile} />
          </Box>
          <Box flex={"1"}>
            <Sidebar profileNum={selectedProfile} />
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default Home;

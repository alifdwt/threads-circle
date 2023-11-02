import { API } from "@/config/api";
import CardProfile from "../Sidebar/ProfileSection";
import { useState, useEffect } from "react";
import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import ThreadContainer from "@/features/threads/card";
import UserListAPI from "@/types/UserListAPI";

type profileProps = {
  username: string | undefined;
};

const ProfilePage = (props: profileProps) => {
  const { username } = props;

  const [getUserData, setUserData] = useState({} as UserListAPI);
  const [profileThread, setProfileThread] = useState([]);
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    const fetchThreadsData = async () => {
      const response = await API.get(`/threads/username/${username}`);
      setProfileThread(response.data.data);
    };
    fetchThreadsData();

    const fetchLikesData = async () => {
      const response = await API.get(`/threads/liked/${username}`);
      setLikes(response.data.data);
    };
    fetchLikesData();

    const fetchUserData = async () => {
      const response = await API.get(`/user/username/${username}`);
      setUserData(response.data.data);
    };
    fetchUserData();
  });

  return (
    <Box width={"100%"}>
      <CardProfile userData={getUserData} />
      <Tabs isFitted>
        <TabList>
          <Tab fontWeight={"semibold"}>Post ({profileThread.length})</Tab>
          <Tab fontWeight={"semibold"}>Likes ({likes.length})</Tab>
        </TabList>
        <TabPanels border={"1px solid gray"}>
          <TabPanel p={0}>
            <ThreadContainer threads={profileThread} type="threads" />
          </TabPanel>
          <TabPanel>
            <ThreadContainer threads={likes} type="threads" />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default ProfilePage;

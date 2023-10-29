import { API } from "@/config/api";
import CardProfile from "../Sidebar/ProfileSection";
import { useState, useEffect } from "react";
import UserListAPI from "@/types/UserListAPI";
import userDummy from "@/mocks/user";
import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import ThreadContainer from "@/features/threads/card";
import ThreadAPI from "@/types/ThreadCardAPI";

type profileProps = {
  username: string | undefined;
};

const ProfilePage = (props: profileProps) => {
  const { username } = props;

  const [profile, setProfile] = useState<UserListAPI>(userDummy[0]);
  const [thread, setThread] = useState([]);
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await API.get(`/user/username/${username}`);
      setProfile(response.data.data);
    };
    fetchUserData();

    const fetchThreadsData = async () => {
      const response = await API.get(`/threads/username/${username}`);
      setThread(response.data.data);
    };
    fetchThreadsData();

    const fetchLikesData = async () => {
      const response = await API.get(`/threads/liked/${username}`);
      setLikes(response.data.data);
    };
    fetchLikesData();
  });
  //   console.log(likes);
  return (
    <Box>
      <CardProfile {...profile} />
      <Tabs isFitted>
        <TabList>
          <Tab fontWeight={"semibold"}>Post ({thread.length})</Tab>
          <Tab fontWeight={"semibold"}>Likes ({likes.length})</Tab>
        </TabList>
        <TabPanels border={"1px solid gray"}>
          <TabPanel>
            {thread.map((datum: ThreadAPI) => (
              <ThreadContainer datum={datum} key={datum.id} />
            ))}
          </TabPanel>
          <TabPanel>
            {likes &&
              likes.map((datum: ThreadAPI) => (
                <ThreadContainer datum={datum} key={datum.id} />
              ))}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default ProfilePage;

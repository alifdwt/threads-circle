import { Flex } from "@chakra-ui/react";
import CardProfile from "./ProfileSection";
import SuggestedFollower from "./SuggestedFollowers";
import { useState, useEffect } from "react";
import { API } from "@/config/api";
import UserListAPI from "@/types/UserListAPI";
import userDummy from "@/mocks/user";

const Sidebar = () => {
  useEffect(() => {
    const storedProfile = localStorage.getItem("selectedProfile");
    if (storedProfile) {
      setSelectedProfile(JSON.parse(storedProfile));
    }
  }, []);

  // Get user.id from res.locals.loginSession

  const [selectedProfile, setSelectedProfile] = useState<number>(1);
  const [profile, setProfile] = useState<UserListAPI>(userDummy[0]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await API.get(`/user/${selectedProfile}`);
      setProfile(response.data.data);
      // console.log(response.data.data);
    };
    fetchData();
  });
  return (
    <Flex direction={"column"} gap={5}>
      <CardProfile {...profile} />
      <SuggestedFollower />
    </Flex>
  );
};
export default Sidebar;

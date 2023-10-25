import { Flex } from "@chakra-ui/react";
import CardProfile from "./ProfileSection";
import SuggestedFollower from "./SuggestedFollowers";
import { useState, useEffect } from "react";
import { API } from "@/config/api";
import ProfileId from "@/types/ProfileId";
import UserListAPI from "@/types/UserListAPI";
import userDummy from "@/mocks/user";

const Sidebar = (props: ProfileId) => {
  const { profileNum } = props;
  const [profile, setProfile] = useState<UserListAPI>(userDummy);
  useEffect(() => {
    const fetchData = async () => {
      const response = await API.get(`/user/${profileNum}`);
      setProfile(response.data.data);
    };
    fetchData();
  });
  return (
    <Flex direction={"column"} gap={5}>
      <CardProfile
        key={profile.id}
        id={profile.id}
        full_name={profile.full_name}
        username={profile.username}
        profile_picture={profile.profile_picture}
        profile_description={profile.profile_description}
        email={profile.email}
        password={profile.password}
      />
      <SuggestedFollower />
    </Flex>
  );
};
export default Sidebar;

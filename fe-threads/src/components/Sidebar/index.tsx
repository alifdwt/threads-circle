import { Flex } from "@chakra-ui/react";
import CardProfile from "./ProfileSection";
import SuggestedFollower from "./SuggestedFollowers";
import { API } from "@/config/api";

const firstUserData = await API.get("/user/1");

const Sidebar = () => {
  const firstUser = firstUserData.data.data;
  console.log(firstUser);
  return (
    <Flex direction={"column"} gap={5}>
      <CardProfile
        key={firstUser.id}
        id={firstUser.id}
        full_name={firstUser.full_name}
        username={firstUser.username}
        profile_picture={firstUser.profile_picture}
        profile_description={firstUser.profile_description}
        email={firstUser.email}
        password={firstUser.password}
      />
      <SuggestedFollower />
    </Flex>
  );
};
export default Sidebar;

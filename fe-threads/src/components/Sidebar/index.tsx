import { Flex } from "@chakra-ui/react";
import CardProfile from "./ProfileSection";
import SuggestedFollower from "./SuggestedFollowers";
import UserListAPI from "@/types/UserListAPI";
import { useUser } from "@/hooks/Users/useUser";
import useProfileSelector from "@/hooks/SelectedProfile/useProfileSelector";

const Sidebar = () => {
  const { selectedProfile } = useProfileSelector();
  const { isLoading, getUser } = useUser({ userId: selectedProfile });

  return (
    <Flex direction={"column"} gap={5}>
      <CardProfile userData={isLoading ? ({} as UserListAPI) : getUser} />
      <SuggestedFollower />
      {/* <SuggestedFollower /> */}
    </Flex>
  );
};
export default Sidebar;

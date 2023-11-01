import { Flex } from "@chakra-ui/react";
import CardProfile from "./ProfileSection";
import SuggestedFollower from "./SuggestedFollowers";
import UserListAPI from "@/types/UserListAPI";
import { useUser } from "@/hooks/Users/useUser";
import useProfileSelector from "@/hooks/SelectedProfile/useProfileSelector";

const Sidebar = () => {
  // useEffect(() => {
  //   const storedProfile = localStorage.getItem("selectedProfile");
  //   if (storedProfile) {
  //     setSelectedProfile(JSON.parse(storedProfile));
  //   }
  // }, []);

  // // Get user.id from res.locals.loginSession

  // const [selectedProfile, setSelectedProfile] = useState<number>(1);
  // const [profile, setProfile] = useState<UserListAPI>(userDummy[0]);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await API.get(`/user/${selectedProfile}`);
  //     setProfile(response.data.data);
  //     // console.log(response.data.data);
  //   };
  //   fetchData();
  // });
  const { selectedProfile } = useProfileSelector();
  const { isLoading, getUser } = useUser({ userId: selectedProfile });

  return (
    <Flex direction={"column"} gap={5}>
      <CardProfile userData={isLoading ? ({} as UserListAPI) : getUser} />
      <SuggestedFollower follows={getUser?.following} />
    </Flex>
  );
};
export default Sidebar;

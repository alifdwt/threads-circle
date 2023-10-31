import { Text, Card } from "@chakra-ui/react";
import { API } from "@/config/api";
import UserListAPI from "@/types/UserListAPI";
import { useEffect, useState } from "react";
import FollowCard from "./FollowCard";
import FollowAPI from "@/types/FollowListAPI";
import useProfileSelector from "@/pages/Home/ProfileSelector/hooks/useProfileSelector";

const SuggestedFollower = () => {
  const [suggestion, setSuggestion] = useState<UserListAPI[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await API.get("/users");
      setSuggestion(response.data.data);
    };
    fetchData();
  });
  // const { selectedProfile } = useProfileSelector();

  // const filteredData = suggestion
  //   .filter(
  //     (item, index, self) =>
  //       item.follower.id !== selectedProfile &&
  //       item.following.id !== selectedProfile &&
  //       self.findIndex((t) => t.following.id === item.following.id) === index
  //   )
  //   .map((item) => item.following);

  return (
    <Card bg="whiteAlpha.200" p={4}>
      <Text color={"white"} fontWeight={"bold"}>
        Suggested for You
      </Text>
      {suggestion.map((datum: UserListAPI) => (
        <FollowCard key={datum.id} datum={datum} />
      ))}
    </Card>
  );
};

export default SuggestedFollower;

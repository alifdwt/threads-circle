import { Text, Card, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useFollows } from "@/hooks/Follow/useFollows";
import useProfileSelector from "@/hooks/SelectedProfile/useProfileSelector";
import { API } from "@/config/api";
import SuggestedUserContainer from "./UserCard";

const SuggestedFollower = () => {
  const { getFollows } = useFollows();
  const [users, setUsers] = useState([]);
  const { selectedProfile } = useProfileSelector();
  useEffect(() => {
    const fetchData = async () => {
      const response = await API.get("/users");
      setUsers(response.data.data);
    };
    fetchData();
  });

  const followedIds = [];
  const notFollowedIds = [];

  for (let i = 0; i < getFollows?.length; i++) {
    const followerId = getFollows[i].follower.id;
    const followingId = getFollows[i].following.id;
    if (followerId === selectedProfile) {
      followedIds.push(followingId);
    }
  }

  const allIds = users.map((user) => user.id).filter((id) => id !== 0);

  for (let i = 0; i < allIds.length; i++) {
    const currentId = allIds[i];
    if (!followedIds.includes(currentId) && currentId !== selectedProfile) {
      notFollowedIds.push(currentId);
    }
  }

  return (
    <Card bg="whiteAlpha.200" p={4}>
      <Text color={"white"} fontWeight={"bold"} mb={2}>
        Suggested for You
      </Text>
      {selectedProfile === 0 ? (
        <Spinner />
      ) : (
        <>
          {notFollowedIds?.map((datum) => (
            <SuggestedUserContainer key={datum} userId={datum} />
          ))}
        </>
      )}
    </Card>
  );
};

export default SuggestedFollower;

// import { useFollow } from "@/hooks/Follow/useFollows";
import { Center, Spinner } from "@chakra-ui/react";
import FollowCard from "../FollowCard";
import { useEffect, useState } from "react";
import FollowAPI from "@/types/FollowListAPI";
import followsDummy from "@/mocks/follows";
import { API } from "@/config/api";

const SuggestedFollowerContainer = (props: { followId: number }) => {
  const [follow, setFollow] = useState<FollowAPI>(followsDummy[0]);
  useEffect(() => {
    const fetchFollowData = async () => {
      const response = await API.get(`/follow/${props.followId}`);
      setFollow(response.data.data);
    };
    fetchFollowData();
  });
  //   console.log(follow);

  return (
    <>
      {follow.updated_at === "1000-01-01T00:00:00.000Z" ? (
        <Center>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="green.800"
          />
        </Center>
      ) : (
        <FollowCard datum={follow?.following} />
      )}
    </>
  );
};

export default SuggestedFollowerContainer;

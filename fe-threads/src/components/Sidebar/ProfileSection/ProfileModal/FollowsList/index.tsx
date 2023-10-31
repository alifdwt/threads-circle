import FollowCard from "@/components/Sidebar/SuggestedFollowers/FollowCard";
import { API } from "@/config/api";
import followsDummy from "@/mocks/follows";
import FollowAPI from "@/types/FollowListAPI";
import { Center, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const FollowCardModal = (props: { followId: number; type: string }) => {
  const [follow, setFollow] = useState<FollowAPI>(followsDummy[0]);
  useEffect(() => {
    const fetchFollowData = async () => {
      const response = await API.get(`/follow/${props.followId}`);
      setFollow(response.data.data);
    };
    fetchFollowData();
  });

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
        <>
          {props.type === "followers" ? (
            <FollowCard datum={follow.follower} />
          ) : props.type === "following" ? (
            <FollowCard datum={follow.following} />
          ) : (
            <></>
          )}
        </>
      )}
    </>
  );
};

export default FollowCardModal;

import { Text, Card } from "@chakra-ui/react";
import FollowAPI from "@/types/FollowListAPI";
import SuggestedFollowerContainer from "./Container";
import { useFollows } from "@/hooks/Follow/useFollows";

const SuggestedFollower = (props: { follows: FollowAPI[] | undefined }) => {
  const { getFollows } = useFollows();
  // const followsIds = getFollows?.map((datum) => datum.id);
  // const filteredFollows = props.follows?.filter(
  //   (datum) => !followsIds?.includes(datum.id)
  // )
  // const filteredFollowsId = followsIds?.filter(
  //   (datum) => !props.follows?.map((datum) => datum.id).includes(datum)
  // );
  // console.log(filteredFollowsId);
  const filteredFollows = getFollows?.filter(
    (datum) => !props.follows?.map((datum) => datum.id).includes(datum.id)
  );
  const followingData = filteredFollows?.map((datum) => datum.following);
  const uniqueData = followingData?.filter((item, index) => {
    const firstIndex = followingData.findIndex(
      (element) => element.id === item.id
    );
    return index === firstIndex;
  });

  return (
    <Card bg="whiteAlpha.200" p={4}>
      <Text color={"white"} fontWeight={"bold"}>
        Suggested for You
      </Text>
      {uniqueData?.map((datum) => (
        <SuggestedFollowerContainer
          key={datum.id}
          followId={datum.id !== undefined ? datum.id : 0}
        />
      ))}
    </Card>
  );
};

export default SuggestedFollower;

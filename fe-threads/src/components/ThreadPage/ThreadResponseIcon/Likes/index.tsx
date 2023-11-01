import LikeAPI from "@/types/LikeListAPI";
import { Flex, HStack, Text, Avatar, AvatarGroup } from "@chakra-ui/react";
import { BiSolidLike } from "react-icons/bi";

const ThreadLikesCard = (props: {
  likes_count: number;
  like_data: LikeAPI[];
}) => {
  return (
    <Flex
      color="whiteAlpha.600"
      mt={2}
      bg={"whiteAlpha.200"}
      p={3}
      borderRadius={"10px"}
      gap={3}
    >
      <HStack>
        <BiSolidLike size={20} />
        <Text fontSize="sm" color="whiteAlpha.600">
          {props.likes_count}
        </Text>
      </HStack>
      <AvatarGroup max={2} size={"xs"}>
        {props.like_data?.map((like) => (
          <Avatar
            key={like.user?.id}
            name={like.user?.full_name}
            src={like.user?.profile_picture}
          />
        ))}
      </AvatarGroup>
    </Flex>
  );
};

export default ThreadLikesCard;

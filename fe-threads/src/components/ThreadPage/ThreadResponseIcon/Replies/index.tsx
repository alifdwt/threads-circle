import ReplyAPI from "@/types/ReplyListAPI";
import { Flex, HStack, Text, AvatarGroup, Avatar } from "@chakra-ui/react";
import { BiChat } from "react-icons/bi";

const ThreadRepliesCard = (props: {
  replies_count: number;
  reply_data: ReplyAPI[];
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
        <BiChat size={20} />
        <Text fontSize="sm" color="whiteAlpha.600">
          {props.replies_count}
        </Text>
      </HStack>
      <AvatarGroup max={2} size={"xs"}>
        {props.replies_count > 0 &&
          props.reply_data.map((reply) => (
            <Avatar
              key={reply.user?.id}
              name={reply.user?.full_name}
              src={reply.user?.profile_picture}
            />
          ))}
      </AvatarGroup>
    </Flex>
  );
};

export default ThreadRepliesCard;

import ReplyAPI from "@/types/ReplyListAPI";
import {
  HStack,
  Text,
  AvatarGroup,
  Avatar,
  Button,
  ButtonGroup,
  IconButton,
  // useColorModeValue,
} from "@chakra-ui/react";
import { BiChat } from "react-icons/bi";

const ThreadRepliesCard = (props: {
  replies_count: number;
  reply_data: ReplyAPI[];
}) => {
  // const color = useColorModeValue("black", "white");
  return (
    <ButtonGroup isAttached>
      <IconButton
        aria-label="Like"
        icon={<BiChat />}
        // color={"whiteAlpha.600"}
        // bg={"whiteAlpha.200"}
        // _hover={{ color: "#22c35e", bg: "white" }}
      />
      <Button
        // color="whiteAlpha.600"
        // mt={2}
        // bg={"whiteAlpha.200"}
        p={3}
        borderRadius={"10px"}
        gap={3}
      >
        <HStack>
          {/* <BiChat size={20} /> */}
          <Text fontSize="sm">{props.replies_count}</Text>
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
      </Button>
    </ButtonGroup>
  );
};

export default ThreadRepliesCard;

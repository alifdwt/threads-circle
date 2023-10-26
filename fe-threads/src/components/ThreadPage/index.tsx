import { API } from "@/config/api";
import ThreadContainer from "@/features/threads/card";
import repliesDummy from "@/mocks/replies";
import threadDummy from "@/mocks/threads";
import ReplyAPI from "@/types/ReplyListAPI";
import ThreadAPI from "@/types/ThreadCardAPI";
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Input,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BiChat, BiImageAdd, BiSolidLike } from "react-icons/bi";
import { BsArrowLeftShort, BsDot } from "react-icons/bs";

type ThreadProps = {
  threadId: string | undefined;
};

const ThreadPage = (props: ThreadProps) => {
  const { threadId } = props;
  const [thread, setThread] = useState<ThreadAPI>(threadDummy[0]);
  const [reply, setReply] = useState<ReplyAPI[]>(repliesDummy);

  useEffect(() => {
    const fetchThreadData = async () => {
      const response = await API.get(`/thread/${threadId}`);
      setThread(response.data.data);
    };
    fetchThreadData();

    const fetchRepliesData = async () => {
      const response = await API.get(`/replies/thread/${threadId}`);
      setReply(response.data.data);
    };
    fetchRepliesData();
  });

  return (
    <Box border={"1px solid gray"} borderRadius={"10px"} p={5}>
      <HStack color={"white"}>
        <BsArrowLeftShort size={24} />
      </HStack>
      <Flex gap={3}>
        <Avatar
          name={thread.user?.full_name}
          src={thread.user?.profile_picture}
        />
        <Box w={"full"}>
          <Link href={`/profile/${thread.user?.username}`}>
            <HStack>
              <Text fontWeight={"semibold"}>{thread.user?.full_name}</Text>
            </HStack>
            <Text color={"whiteAlpha.600"}>@{thread.user?.username}</Text>
          </Link>
          <Text>{thread.content}</Text>
          {thread.image !== "null" && (
            <Image src={thread.image} alt={thread.content} />
          )}
          <Text
            mt={3}
            display="flex"
            align="center"
            fontSize="xs"
            color="whiteAlpha.600"
          >
            {new Date(thread.created_at).getHours()}:
            {new Date(thread.created_at).getMinutes()} <BsDot size={20} />{" "}
            {new Date(thread.created_at).getDate()}/
            {new Date(thread.created_at).getMonth() + 1}/
            {new Date(thread.created_at).getFullYear()}
          </Text>

          <HStack spacing={6}>
            <HStack cursor="pointer" color="whiteAlpha.600" mt={2}>
              <BiSolidLike size={20} />
              <Text fontSize="sm" color="whiteAlpha.600">
                {thread.likes?.length}
              </Text>
            </HStack>
            <HStack cursor="pointer" color="whiteAlpha.600" mt={2}>
              <BiChat size={20} />
              <Text fontSize="sm" color="whiteAlpha.600">
                {thread.replies?.length}
              </Text>
            </HStack>
          </HStack>

          <HStack mt={5} justify="space-between">
            <HStack>
              <Avatar size="sm" mr={3} />
              <Input
                variant="unstyled"
                color="whiteAlpha.400"
                placeholder="What is happening?!"
              />
            </HStack>
            <HStack>
              <Box cursor="pointer">
                <BiImageAdd size={25} color="green" />
              </Box>
              <Button colorScheme="whatsapp" size="xs" px={3} rounded="full">
                Post
              </Button>
            </HStack>
          </HStack>

          <Stack mt={8}>
            {reply[0].created_at &&
              reply.map((reply) => (
                <ThreadContainer key={reply.id} {...reply} />
              ))}
          </Stack>
        </Box>
      </Flex>
    </Box>
  );
};

export default ThreadPage;

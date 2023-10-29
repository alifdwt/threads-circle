import { API } from "@/config/api";
import ThreadContainer from "@/features/threads/card";
import repliesDummy from "@/mocks/replies";
import threadDummy from "@/mocks/threads";
import ReplyAPI from "@/types/ReplyListAPI";
import ThreadAPI from "@/types/ThreadCardAPI";
import {
  Avatar,
  Box,
  Flex,
  HStack,
  Image,
  Link,
  SkeletonCircle,
  SkeletonText,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BiChat, BiSolidLike } from "react-icons/bi";
import { BsArrowLeftShort, BsDot } from "react-icons/bs";
import ThreadReplyForm from "./ThreadReplyForm";

const ThreadPage = (props: { threadId: number }) => {
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
    <>
      {thread.updated_at === "1000-01-01T00:00:00.000Z" ? (
        <Skeleton />
      ) : (
        <ThreadPageCard thread={thread} reply={reply} />
      )}
    </>
  );
};

const ThreadPageCard = (props: { thread: ThreadAPI; reply: ReplyAPI[] }) => {
  const { thread, reply } = props;

  // function

  return (
    <Box border={"1px solid gray"} borderRadius={"10px"} p={5}>
      <Link href="/home">
        <HStack color={"white"}>
          <BsArrowLeftShort size={24} />
          {/* <Text fontWeight={"semibold"}>Replies</Text> */}
        </HStack>
      </Link>
      <Flex gap={3} mt={4}>
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
            <Image
              src={thread.image as string}
              alt={thread.content}
              w={"100%"}
            />
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

          <ThreadReplyForm threadId={thread.id} />

          <Stack mt={8}>
            {reply[0].created_at &&
              reply.map((reply) => (
                <ThreadContainer key={reply.id} datum={reply} />
              ))}
          </Stack>
        </Box>
      </Flex>
    </Box>
  );
};

const Skeleton = () => {
  return (
    <Box
      padding="6"
      boxShadow="lg"
      bg="blackAlpha.800"
      w={"100%"}
      borderBottom={"1px solid gray"}
    >
      <SkeletonCircle size="10" />
      <SkeletonText mt="4" noOfLines={2} spacing="4" skeletonHeight="2" />
    </Box>
  );
};

export default ThreadPage;

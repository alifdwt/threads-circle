import { API } from "@/config/api";
import ThreadContainer from "@/features/threads/card";
import repliesDummy from "@/mocks/replies";
// import threadDummy from "@/mocks/threads";
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
import { BsArrowLeftShort, BsDot } from "react-icons/bs";
import ThreadReplyForm from "./ThreadReplyForm";
import { useNavigate } from "react-router-dom";
import LikeAPI from "@/types/LikeListAPI";
import ThreadLikesCard from "./ThreadResponseIcon/Likes";
import ThreadRepliesCard from "./ThreadResponseIcon/Replies";
import useThread from "./hooks/useThread";
import ThreadFormNew from "../Home/ThreadForm";

const ThreadPage = (props: { threadId: number }) => {
  const { threadId } = props;
  const navigate = useNavigate();
  const [reply, setReply] = useState<ReplyAPI[]>(repliesDummy);

  useEffect(() => {
    const fetchRepliesData = async () => {
      const response = await API.get(`/replies/thread/${threadId}`);
      setReply(response.data.data);
    };
    fetchRepliesData();
  });

  const { getThread, isLoading } = useThread(threadId);
  // console.log(getThread);

  return (
    <Box border={"1px solid gray"} borderRadius={"10px"} p={5}>
      <Link onClick={() => navigate("/home")}>
        <HStack color={"white"}>
          <BsArrowLeftShort size={24} />
          {/* <Text fontWeight={"semibold"}>Replies</Text> */}
        </HStack>
      </Link>
      {isLoading ? (
        <Skeleton />
      ) : (
        <ThreadPageCard thread={getThread} reply={reply} type="thread" />
      )}
    </Box>
  );
};

const ThreadPageCard = (props: {
  thread: ThreadAPI;
  reply: ReplyAPI[];
  type: string;
}) => {
  const navigate = useNavigate();

  const { thread, reply } = props;

  // function

  return (
    <Flex gap={3} mt={4}>
      <Avatar
        name={thread.user?.full_name}
        src={thread.user?.profile_picture}
      />
      <Box w={"full"}>
        <Link
          // href={`/profile/${thread.user?.username}`}
          onClick={() => navigate(`/profile/${thread.user?.username}`)}
        >
          <HStack>
            <Text fontWeight={"semibold"}>{thread.user?.full_name}</Text>
          </HStack>
          <Text color={"whiteAlpha.600"}>@{thread.user?.username}</Text>
        </Link>
        <Text>{thread.content}</Text>
        {thread.image && props.type !== "image" && (
          <Image
            src={thread.image as string}
            alt={thread.content}
            maxWidth={"600px"}
          />
        )}
        <Flex mb={3}>
          <Text
            mt={3}
            display="flex"
            align="center"
            fontSize="xs"
            color="whiteAlpha.600"
          >
            {new Date(thread.created_at).toLocaleString()}
            <BsDot size={20} />
          </Text>
          {thread.created_at !== thread.updated_at && (
            <Link color={"#22c35e"} fontSize={"xs"} mt={3}>
              Updated at {new Date(thread.updated_at).toLocaleString()}
            </Link>
          )}
        </Flex>

        <HStack spacing={4}>
          <ThreadLikesCard
            likes_count={thread.likes?.length as number}
            like_data={thread.likes as LikeAPI[]}
            threadId={thread.id}
          />
          <ThreadRepliesCard
            replies_count={thread.replies?.length as number}
            reply_data={reply}
          />
        </HStack>

        {/* <ThreadReplyForm threadId={thread.id} /> */}
        <ThreadFormNew identity={thread.id} type="reply" />

        <Stack mt={8}>
          {thread.replies[0] && (
            <ThreadContainer threads={reply} type="replies" />
          )}
        </Stack>
      </Box>
    </Flex>
  );
};

const Skeleton = () => {
  return (
    <Box
      padding="6"
      boxShadow="lg"
      bg="#262626"
      w={"100%"}
      borderBottom={"1px solid gray"}
    >
      <SkeletonCircle size="10" />
      <SkeletonText mt="4" noOfLines={2} spacing="4" skeletonHeight="2" />
    </Box>
  );
};

export default ThreadPage;
export { ThreadPageCard };

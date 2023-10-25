import {
  Flex,
  Avatar,
  Box,
  Link,
  Icon,
  Heading,
  Text,
  Image,
} from "@chakra-ui/react";
import { BiLike, BiChat, BiShare } from "react-icons/bi";
import ThreadAPI from "@/types/ThreadCardAPI";

const ThreadContainer = (props: ThreadAPI) => {
  const { content, image, user, replies, updated_at, likes } = props;

  return (
    <Flex gap={3} p={3} borderBottom={"1px solid gray"}>
      <Box>
        <Avatar name={user.full_name} src={user.profile_picture} />
      </Box>
      <Box>
        <Link>
          <Flex gap={1}>
            <Heading size={"sm"}>{user.full_name}</Heading>
            {/* {is_verified && (
              <Icon as={BsFillPatchCheckFill} color={"blue.500"} />
            )} */}
            <Text color={"gray"}>
              @{user.username} ৹ {getDuration(updated_at)}
            </Text>
          </Flex>
        </Link>
        <Text>{TextWithAnchor({ text: content })}</Text>
        {/* {image && <Image src={image} maxW={"300px"} />} */}
        {image !== "null" && <Image src={image} maxW={"300px"} />}
        <Flex gap={4} mt={2} color={"gray"}>
          <Link>
            <Flex gap={1}>
              <Icon as={BiLike} color={"gray"} />
              <Text>{likes.length}</Text>
            </Flex>
          </Link>
          <Link>
            <Flex gap={1}>
              <Icon as={BiChat} color={"gray"} />
              <Text>{replies.length}</Text>
            </Flex>
          </Link>
          <Link>
            <Flex gap={1}>
              <Icon as={BiShare} color={"gray"} />
              <Text>Share</Text>
            </Flex>
          </Link>
        </Flex>
      </Box>
    </Flex>
  );
};

const TextWithAnchor = ({ text }: { text: string }) => {
  const words = text.split(" ");

  const renderWords = words.map((word: string, index: number) => {
    if (word.startsWith("#")) {
      const tag = word.substring(1);
      return (
        <Link key={index} href={`/tags/${tag}`} color={"green.400"}>
          {word}{" "}
        </Link>
      );
    } else {
      return <span key={index}>{word} </span>;
    }
  });

  return renderWords;
};

const getDuration = (date: string) => {
  const timeDifference = new Date().getTime() - new Date(date).getTime();
  const months = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 30));
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

  if (months > 0) {
    return `${months}m`;
  } else if (days > 0) {
    return `${days}d`;
  } else if (hours > 0) {
    return `${hours}h`;
  } else if (minutes > 0) {
    return `${minutes}ms`;
  } else {
    return `${seconds}s`;
  }
};

export default ThreadContainer;

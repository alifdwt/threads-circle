import ThreadCardType from "@/types/ThreadCard";
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
import { BsFillPatchCheckFill } from "react-icons/bs";
import { BiLike, BiChat, BiShare } from "react-icons/bi";

const ThreadContainer = (props: ThreadCardType) => {
  const {
    author_picture,
    author_name,
    author_username,
    thread,
    image,
    likes_count,
    replies_count,
    is_verified,
  } = props;

  return (
    <Flex gap={3} p={3} borderBottom={"1px solid gray"}>
      <Box>
        <Avatar name={author_name} src={author_picture} />
      </Box>
      <Box>
        <Link>
          <Flex gap={1}>
            <Heading size={"sm"}>{author_name}</Heading>
            {is_verified && (
              <Icon as={BsFillPatchCheckFill} color={"blue.500"} />
            )}
            <Text color={"gray"}>@{author_username}</Text>
          </Flex>
        </Link>
        <Text>{TextWithAnchor({ text: thread })}</Text>
        {image && <Image src={image} maxW={"300px"} />}
        <Flex gap={4} mt={2} color={"gray"}>
          <Link>
            <Flex gap={1}>
              <Icon as={BiLike} color={"gray"} />
              <Text>{likes_count}</Text>
            </Flex>
          </Link>
          <Link>
            <Flex gap={1}>
              <Icon as={BiChat} color={"gray"} />
              <Text>{replies_count}</Text>
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

export default ThreadContainer;

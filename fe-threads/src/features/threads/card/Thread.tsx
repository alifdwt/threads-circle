import ThreadCardType from "@/types/ThreadCard";
import {
  Box,
  Heading,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Button,
  Flex,
  Text,
  Avatar,
  IconButton,
  Image,
  Link,
  Icon,
} from "@chakra-ui/react";
import { BsThreeDotsVertical, BsFillPatchCheckFill } from "react-icons/bs";
import { BiLike, BiChat, BiShare } from "react-icons/bi";

const ThreadCard = (props: ThreadCardType) => {
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
    <Card m={4}>
      <CardHeader>
        <Flex gap="4">
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Avatar name="Segun Adebayo" src={author_picture} />

            <Box>
              <Heading size="sm">
                <Link>
                  {author_name} {"  "}
                  {is_verified && (
                    <Icon as={BsFillPatchCheckFill} color={"blue"} />
                  )}
                </Link>
              </Heading>
              <Link style={{ color: "grey" }}>@{author_username}</Link>
            </Box>
          </Flex>
          <IconButton
            variant="ghost"
            colorScheme="gray"
            aria-label="See menu"
            icon={<BsThreeDotsVertical />}
          />
        </Flex>
      </CardHeader>
      <CardBody>
        <Text>{thread}</Text>
      </CardBody>
      {image && <Image objectFit="cover" src={image} alt="Chakra UI" />}

      <Flex alignItems="center" justifyContent="space-between" px={4} mt={2}>
        <Link>
          <Icon as={BiLike} />
          {likes_count}
        </Link>
        <Link>
          {replies_count == 1
            ? replies_count + " comment"
            : replies_count + " comments"}
        </Link>
      </Flex>
      <CardFooter
        justify="space-between"
        flexWrap="wrap"
        sx={{
          "& > button": {
            minW: "136px",
          },
        }}
      >
        <Button flex="1" variant="ghost" leftIcon={<BiLike />}>
          Like
        </Button>
        <Button flex="1" variant="ghost" leftIcon={<BiChat />}>
          Comment
        </Button>
        <Button flex="1" variant="ghost" leftIcon={<BiShare />}>
          Share
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ThreadCard;

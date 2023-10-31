import {
  Flex,
  Avatar,
  Box,
  Link,
  Text,
  Image,
  HStack,
  Tooltip,
  SkeletonCircle,
  SkeletonText,
  // Menu,
  // MenuButton,
  // MenuList,
  // MenuItem,
  // Button,
  // IconButton,
} from "@chakra-ui/react";
import {
  BiSolidLike,
  BiChat,
  BiShare,
  // BiDotsVerticalRounded,
} from "react-icons/bi";
import ThreadAPI from "@/types/ThreadCardAPI";
import { useState, useEffect } from "react";
import { BsDot } from "react-icons/bs";
import CardProfile from "@/components/Sidebar/ProfileSection";
import { API } from "@/config/api";
import { useNavigate } from "react-router-dom";

const ThreadContainer = (props: { datum: ThreadAPI }) => {
  return (
    <>
      {props.datum.updated_at === "1000-01-01T00:00:00.000Z" ? (
        <Box
          padding="6"
          boxShadow="lg"
          bg="#141414"
          w={"100%"}
          borderBottom={"1px solid gray"}
        >
          <SkeletonCircle size="10" />
          <SkeletonText mt="4" noOfLines={2} spacing="4" skeletonHeight="2" />
        </Box>
      ) : (
        <ThreadCard datum={props.datum} />
      )}
    </>
  );
};

const ThreadCard = (props: { datum: ThreadAPI }) => {
  const navigate = useNavigate();

  const { id, content, image, user, replies, updated_at, likes } = props.datum;
  const [selectedProfile, setSelectedProfile] = useState(0);
  const isLiked = likes?.find((like) => like.user?.id === selectedProfile);

  useEffect(() => {
    const fetchStoredProfile = () => {
      const storedProfileId = localStorage.getItem("selectedProfile");
      if (storedProfileId) {
        setSelectedProfile(parseInt(storedProfileId));
      }
    };
    fetchStoredProfile();
  }, []);

  async function handleLike() {
    await API.post(`/like`, { userId: selectedProfile, threadId: id });
  }
  async function handleDislike() {
    await API.delete(`/like/${isLiked?.id}`);
  }

  return (
    <Flex
      gap={3}
      p={3}
      borderBottom={"1px solid gray"}
      _hover={{ bg: "whiteAlpha.100" }}
    >
      <Avatar size={"sm"} name={user?.full_name} src={user?.profile_picture} />
      <Box mb={4}>
        <HStack>
          <Tooltip
            label={<CardProfile {...user} />}
            bg={"black"}
            // openDelay={500}
          >
            <Link
              // href={`/profile/${user?.username}`}
              onClick={() => navigate(`/profile/${user?.username}`)}
              zIndex={1}
            >
              <Text
                display={"flex"}
                gap={1}
                fontWeight={"semibold"}
                color={"whiteAlpha.800"}
              >
                {user?.full_name}
                <Text
                  fontWeight={"light"}
                  display={"flex"}
                  color={"whiteAlpha.600"}
                >
                  @{user?.username} <BsDot color={"whiteAlpha.600"} size={24} />{" "}
                  {getDuration(updated_at)}
                </Text>
              </Text>
            </Link>
          </Tooltip>
        </HStack>
        <Box
          onClick={() => navigate(`/thread/${id}`)}
          w={"600px"}
          cursor={"pointer"}
        >
          <Text>{TextWithAnchor({ text: content })}</Text>
          {image !== "null" && <Image src={image as string} maxW={"350px"} />}
          <HStack spacing={6}>
            {isLiked ? (
              <Link onClick={handleDislike} href="#">
                <HStack color="whiteAlpha.600" mt={2}>
                  <BiSolidLike size={20} color={isLiked ? "red" : ""} />
                  <Text fontSize="sm" color="whiteAlpha.600">
                    {likes?.length}
                  </Text>
                </HStack>
              </Link>
            ) : (
              <Link onClick={handleLike} href="#">
                <HStack color="whiteAlpha.600" mt={2}>
                  <BiSolidLike size={20} color={isLiked ? "red" : ""} />
                  <Text fontSize="sm" color="whiteAlpha.600">
                    {likes?.length}
                  </Text>
                </HStack>
              </Link>
            )}
            <Link>
              <HStack color="whiteAlpha.600" mt={2}>
                <BiChat size={20} />
                <Text fontSize="sm" color="whiteAlpha.600">
                  {replies?.length}
                </Text>
              </HStack>
            </Link>
            <Link>
              <HStack color="whiteAlpha.600" mt={2}>
                <BiShare size={20} />
                <Text fontSize="sm" color="whiteAlpha.600">
                  Share
                </Text>
              </HStack>
            </Link>
            {/* <Menu>
              <MenuButton
                as={IconButton}
                icon={<BiDotsVerticalRounded />}
                variant={"outline"}
              >
                Options
              </MenuButton>
              <MenuList>
                <MenuItem>Edit</MenuItem>
                <MenuItem>Delete</MenuItem>
              </MenuList>
            </Menu> */}
          </HStack>
        </Box>
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

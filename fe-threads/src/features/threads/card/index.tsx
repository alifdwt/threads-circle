import {
  Flex,
  Avatar,
  Box,
  Link,
  Text,
  HStack,
  Spinner,
  Image,
  LinkBox,
  LinkOverlay,
  Button,
} from "@chakra-ui/react";
import { BiSolidLike, BiChat, BiShare } from "react-icons/bi";
import ThreadAPI from "@/types/ThreadCardAPI";
import { useState, useEffect } from "react";
import { BsDot } from "react-icons/bs";
import { API } from "@/config/api";
import { useNavigate } from "react-router-dom";
import OptionsCard from "./OptionsCard";
import { AiOutlineEdit } from "react-icons/ai";

const ThreadContainer = (props: {
  threads: ThreadAPI[] | undefined;
  type: string;
}) => {
  if (!props.threads) {
    return null;
  }
  return (
    <>
      {props.threads.length > 0 ? (
        <>
          {props.threads.map((datum: ThreadAPI) => (
            <ThreadCard key={datum.id} datum={datum} type={props.type} />
          ))}
        </>
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          height={"100vh"}
          alignItems={"center"}
          w={"100%"}
        >
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="#22c35e"
            size="xl"
          />
        </Box>
      )}
    </>
  );
};

const ThreadCard = (props: { datum: ThreadAPI; type: string }) => {
  const navigate = useNavigate();

  const { id, content, image, user, replies, created_at, updated_at, likes } =
    props.datum;
  const [selectedProfile, setSelectedProfile] = useState(0);
  const isLiked = likes?.find((like) => like.user?.id === selectedProfile);
  const isProfileThread = user?.id === selectedProfile;

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
    <LinkBox
      as={Flex}
      p={3}
      borderBottom={"1px solid gray"}
      _hover={{ bg: "whiteAlpha.100" }}
      justifyContent={"space-between"}
    >
      <Flex>
        <Avatar
          size={"sm"}
          name={user?.full_name}
          src={user?.profile_picture}
          m={2}
        />
        <Box>
          <LinkOverlay
            onClick={() => navigate(`/thread/${id}`)}
            w={"600px"}
            cursor={"pointer"}
            color={"transparent"}
          ></LinkOverlay>
          <Button
            onClick={() => navigate(`/profile/${user?.username}`)}
            display={"flex"}
            gap={2}
            variant={"link"}
          >
            <Text
              display={"flex"}
              gap={1}
              fontWeight={"semibold"}
              color={"whiteAlpha.800"}
            >
              {user?.full_name}
            </Text>
            <Text
              fontWeight={"light"}
              display={"flex"}
              color={"whiteAlpha.600"}
            >
              @{user?.username}
              {created_at !== updated_at && <AiOutlineEdit />}
              <BsDot color={"whiteAlpha.600"} size={24} />
              {getDuration(updated_at)}
            </Text>
          </Button>
          <Text w={"600px"}>
            <Text>{TextWithAnchor({ text: content })}</Text>
            {image !== "null" && <Image src={image as string} maxW={"60%"} />}
          </Text>
          {props.type === "threads" && (
            <HStack spacing={6}>
              {isLiked ? (
                <Button onClick={handleDislike} variant={"link"}>
                  <HStack color="whiteAlpha.600" mt={2}>
                    <BiSolidLike size={20} color={isLiked ? "#22c35e" : ""} />
                    <Text fontSize="sm" color="whiteAlpha.600">
                      {likes?.length}
                    </Text>
                  </HStack>
                </Button>
              ) : (
                <Button onClick={handleLike} variant={"link"}>
                  <HStack color="whiteAlpha.600" mt={2}>
                    <BiSolidLike size={20} color={isLiked ? "#22c35e" : ""} />
                    <Text fontSize="sm" color="whiteAlpha.600">
                      {likes?.length}
                    </Text>
                  </HStack>
                </Button>
              )}
              <Button variant={"link"}>
                <HStack color="whiteAlpha.600" mt={2}>
                  <BiChat size={20} />
                  <Text fontSize="sm" color="whiteAlpha.600">
                    {replies?.length}
                  </Text>
                </HStack>
              </Button>
              <Button variant={"link"}>
                <HStack color="whiteAlpha.600" mt={2}>
                  <BiShare size={20} />
                  <Text fontSize="sm" color="whiteAlpha.600">
                    Share
                  </Text>
                </HStack>
              </Button>
            </HStack>
          )}
        </Box>
      </Flex>
      <OptionsCard
        isProfileThread={isProfileThread}
        thread={props.datum}
        type={props.type}
      />
    </LinkBox>
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

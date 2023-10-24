import {
  Box,
  Heading,
  Text,
  Flex,
  Avatar,
  Button,
  Link,
} from "@chakra-ui/react";
import { API } from "@/config/api";
import UserListAPI from "@/types/UserListAPI";
import { useEffect, useState } from "react";

// const users = await API.get("/users");

const SuggestedFollower = () => {
  const [suggestion, setSuggestion] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await API.get("/users");
      setSuggestion(response.data.data);
    };
    fetchData();
  });
  return (
    <Box>
      <Heading fontSize={"xl"}>Suggested for you</Heading>
      {/* <Box>
        <Flex>
          <Box>
            <Avatar
              name="Segun Adebayo"
              src="https://bit.ly/sage-adebayo"
            />
          </Box>
          <Box>
            <Heading fontSize={"md"}>Segun Adebayo</Heading>
            <Text color={"gray"}>@segun_adebayo</Text>
          </Box>
          <Box>
            <Button>Follow</Button>
          </Box>
        </Flex>
      </Box> */}
      {suggestion.map((datum: UserListAPI) => (
        <Box my={3} key={datum.id}>
          <Flex justifyContent={"space-between"}>
            <Flex gap={2}>
              <Box>
                <Avatar name={datum.full_name} src={datum.profile_picture} />
              </Box>
              <Box>
                <Link href={`/${datum.username}`}>
                  <Heading fontSize={"md"}>{datum.full_name}</Heading>
                  <Text color={"gray"}>@{datum.username}</Text>
                </Link>
              </Box>
            </Flex>
            <Box>
              {/* {datum.is_followed ? (
                <Button
                  borderRadius={"15px"}
                  variant={"outline"}
                  color={"gray"}
                >
                  Following
                </Button>
              ) : (
                <Button borderRadius={"15px"} variant={"solid"}>
                  Follow
                </Button>
              )} */}
              <Button borderRadius={"15px"} variant={"outline"} color={"gray"}>
                Following
              </Button>
            </Box>
          </Flex>
        </Box>
      ))}
    </Box>
  );
};

export default SuggestedFollower;

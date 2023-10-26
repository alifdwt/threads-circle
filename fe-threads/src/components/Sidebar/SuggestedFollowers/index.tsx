import { Box, Text, Avatar, Card, HStack, Stack, Link } from "@chakra-ui/react";
import { API } from "@/config/api";
import UserListAPI from "@/types/UserListAPI";
import { useEffect, useState } from "react";
import FollowButton from "./FollowButton";

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
    <Card bg="whiteAlpha.200" p={4}>
      <Text color={"white"} fontWeight={"bold"}>
        Suggested for You
      </Text>
      {suggestion.map((datum: UserListAPI) => (
        <Link key={datum.id} href={`/profile/${datum.username}`}>
          <Box mt={3}>
            <Stack>
              <HStack justify={"space-between"}>
                <HStack spacing={3}>
                  <Avatar name={datum.full_name} src={datum.profile_picture} />
                  <Stack spacing={-4}>
                    <Text color={"white"}>{datum.full_name}</Text>
                    <Text color={"gray"}>@{datum.username}</Text>
                  </Stack>
                </HStack>
                <FollowButton />
              </HStack>
            </Stack>
          </Box>
        </Link>
      ))}
    </Card>
  );
};

export default SuggestedFollower;

import { Text, Card } from "@chakra-ui/react";
import { API } from "@/config/api";
import UserListAPI from "@/types/UserListAPI";
import { useEffect, useState } from "react";
import FollowCard from "./FollowCard";

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
        <FollowCard key={datum.id} datum={datum} />
      ))}
    </Card>
  );
};

export default SuggestedFollower;

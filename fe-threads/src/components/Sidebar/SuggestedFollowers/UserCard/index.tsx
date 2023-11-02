// import { useFollow } from "@/hooks/Follow/useFollows";
import { Box, Center, Spinner } from "@chakra-ui/react";
import FollowCard from "../FollowCard";
import { useEffect, useState } from "react";
import { API } from "@/config/api";
import UserListAPI from "@/types/UserListAPI";
import userDummy from "@/mocks/user";

const SuggestedUserContainer = (props: { userId: number }) => {
  const [user, setUser] = useState<UserListAPI>(userDummy[0]);
  useEffect(() => {
    const fetchuserData = async () => {
      const response = await API.get(`/user/${props.userId}`);
      setUser(response.data.data);
    };
    fetchuserData();
  });

  return (
    <Box>
      {user.updated_at === "1000-01-01T00:00:00.000Z" ? (
        <Center>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="green.800"
          />
        </Center>
      ) : (
        <FollowCard datum={user} />
      )}
    </Box>
  );
};

export default SuggestedUserContainer;

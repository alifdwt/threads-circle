import { API } from "@/config/api";
import UserListAPI from "@/types/UserListAPI";
import { Link, Flex, Stack, HStack, Avatar, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const FollowCard = ({ datum }: { datum: UserListAPI }) => {
  const navigate = useNavigate();
  const handleFollow = async () => {
    await API.post("/follow", { followingId: datum.id });
  };

  return (
    <Flex justifyContent={"space-between"} mb={4}>
      <Link
        key={datum.id}
        onClick={() => navigate(`/profile/${datum.username}`)}
      >
        <Stack>
          <HStack justify={"space-between"}>
            <HStack spacing={3}>
              <Avatar name={datum.full_name} src={datum.profile_picture} />
              <Stack spacing={-4}>
                <Text color={"white"}>{datum.full_name}</Text>
                <Text color={"gray"}>@{datum.username}</Text>
              </Stack>
            </HStack>
          </HStack>
        </Stack>
      </Link>
      <Link
        onClick={handleFollow}
        href="#"
        bg={"#22c35e"}
        color={"white"}
        px={5}
        py={2}
        borderRadius={"20px"}
        height={"40px"}
      >
        Follow
      </Link>
    </Flex>
  );
};

export default FollowCard;

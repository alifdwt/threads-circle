import { API } from "@/config/api";
import UserListAPI from "@/types/UserListAPI";
import { Link, Box, Stack, HStack, Avatar, Text } from "@chakra-ui/react";

const FollowCard = ({ datum }: { datum: UserListAPI }) => {
  const handleFollow = async () => {
    await API.post("/follow", { followingId: datum.id });
  };

  return (
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
            <Link
              onClick={handleFollow}
              href="#"
              bg={"#22c35e"}
              color={"white"}
              px={5}
              py={2}
              borderRadius={"20px"}
            >
              Follow
            </Link>
          </HStack>
        </Stack>
      </Box>
    </Link>
  );
};

export default FollowCard;

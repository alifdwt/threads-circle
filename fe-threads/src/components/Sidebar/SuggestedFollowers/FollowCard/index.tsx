import UserListAPI from "@/types/UserListAPI";
import { Link, Box, Stack, HStack, Avatar, Text } from "@chakra-ui/react";
import FollowButton from "../FollowButton";

const FollowCard = ({ datum }: { datum: UserListAPI }) => {
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
            <FollowButton />
          </HStack>
        </Stack>
      </Box>
    </Link>
  );
};

export default FollowCard;

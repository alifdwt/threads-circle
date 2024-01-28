import UserListAPI from "@/types/UserListAPI";
import {
  Link,
  Flex,
  Stack,
  HStack,
  Avatar,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import FollowButton from "./FollowButton";

const FollowCard = ({ datum }: { datum: UserListAPI }) => {
  const navigate = useNavigate();
  const color = useColorModeValue("black", "white");

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
                <Text color={color}>{datum.full_name}</Text>
                <Text color={"gray"}>@{datum.username}</Text>
              </Stack>
            </HStack>
          </HStack>
        </Stack>
      </Link>
      <FollowButton followingId={datum.id as number} />
    </Flex>
  );
};

export default FollowCard;

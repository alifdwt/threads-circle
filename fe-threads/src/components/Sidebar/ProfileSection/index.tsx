import UserListAPI from "@/types/UserListAPI";
import {
  Avatar,
  Box,
  Button,
  Card,
  Flex,
  HStack,
  Stack,
  Text,
} from "@chakra-ui/react";
import { VscVerifiedFilled } from "react-icons/vsc";

const CardProfile = (props: UserListAPI) => {
  const { full_name, username, profile_picture, profile_description } = props;
  return (
    <Card bg="whiteAlpha.200" p={4}>
      <Text color="white" fontWeight={"bold"}>
        My Profile
      </Text>
      <Box
        pos="relative"
        h="70px"
        mt={3}
        rounded="xl"
        // bg="linear-gradient(to top, #96fbc4 0%, #f9f586 100%)"
        bg="green"
        // border={"5px solid blue"}
      >
        <Box
          pos="absolute"
          bottom={-6}
          left={4}
          p={1}
          bg="blackAlpha.800"
          rounded="full"
          // border={"10px solid blue"}
        >
          <Avatar size="md" src={profile_picture} />
        </Box>
      </Box>
      <Flex justify="right" mt={-6}>
        <Button
          color="white"
          size="xs"
          rounded="full"
          variant="outline"
          mt={8}
          w="fit-content"
          _hover={{ bg: "gray" }}
        >
          Edit Profile
        </Button>
      </Flex>

      <Stack spacing={0}>
        <Text
          mt={3}
          fontSize="lg"
          fontWeight="semibold"
          color="white"
          display={"flex"}
          alignItems={"center"}
          gap={1}
          mb={"-5px"}
        >
          {full_name}{" "}
          <span style={{ color: "#1D9BF0" }}>
            <VscVerifiedFilled />
          </span>
        </Text>
        <Text fontSize="xs" color="whiteAlpha.600">
          @{username}
        </Text>
        <Text fontSize="sm" color="whiteAlpha.800" mb={"10px"}>
          {profile_description}
        </Text>
        <HStack fontSize="sm">
          <HStack>
            <Text color="whiteAlpha.800">291</Text>
            <Text color="whiteAlpha.600">Following</Text>
          </HStack>
          <HStack>
            <Text color="whiteAlpha.800">23</Text>
            <Text color="whiteAlpha.600">Followers</Text>
          </HStack>
        </HStack>
      </Stack>
    </Card>
  );
};

export default CardProfile;

import UserListAPI from "@/types/UserListAPI";
import {
  Box,
  Button,
  Card,
  Flex,
  HStack,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { VscVerifiedFilled } from "react-icons/vsc";
import ProfileModal from "./ProfileModal";
import ProfilePicture from "./ProfilePicture";

const CardProfile = ({ userData }: { userData: UserListAPI | undefined }) => {
  // const {
  //   full_name,
  //   username,
  //   profile_picture,
  //   profile_description,
  //   followers,
  //   following,
  // } = props.userData;
  return (
    <Card bg="whiteAlpha.200" p={4}>
      <Text color="white" fontWeight={"bold"}>
        Profile
      </Text>
      {userData ? (
        <>
          <Box pos="relative" h="70px" mt={3} rounded="xl" bg="mediumseagreen">
            <Box
              pos="absolute"
              bottom={-6}
              left={4}
              p={1}
              bg="black"
              rounded="full"
            >
              <ProfilePicture
                profile_src={userData.profile_picture}
                username={userData.username}
              />
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
            <Link href={`/profile/${userData.username}`}>
              <Text
                mt={3}
                fontSize="lg"
                fontWeight="semibold"
                color="white"
                display={"flex"}
                alignItems={"center"}
                gap={1}
                mb={"-5px"}
                _hover={{ textDecoration: "underline" }}
              >
                {userData.full_name}{" "}
                <span style={{ color: "#1D9BF0" }}>
                  <VscVerifiedFilled />
                </span>
              </Text>
              <Text
                fontSize="xs"
                color="whiteAlpha.600"
                _hover={{ textDecoration: "underline" }}
              >
                @{userData.username}
              </Text>
            </Link>
            <Text fontSize="sm" color="whiteAlpha.800" mb={"10px"}>
              {userData.profile_description}
            </Text>
            <HStack fontSize="sm">
              <HStack>
                <ProfileModal
                  title="following"
                  followCount={userData.following?.length}
                  follows={userData.following}
                />
              </HStack>
              <HStack>
                <ProfileModal
                  title="followers"
                  followCount={userData.followers?.length}
                  follows={userData.followers}
                />
              </HStack>
            </HStack>
          </Stack>
        </>
      ) : (
        <>
          <Text>Loading...</Text>
        </>
      )}
    </Card>
  );
};

export default CardProfile;

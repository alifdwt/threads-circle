import PasswordInput from "@/components/RegisterPage/PasswordInput";
import UserListAPI from "@/types/UserListAPI";
import {
  Avatar,
  Box,
  Button,
  CloseButton,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import useUpdateUser from "./hooks/useUpdateUser";

const EditProfile = (props: { user: UserListAPI }) => {
  const [fullName, setFullName] = useState(props.user.full_name);
  const [profileDescription, setProfileDescription] = useState(
    props.user.profile_description
  );
  const [username, setUsername] = useState(props.user.username);
  const [email, setEmail] = useState(props.user.email);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    image,
    setImage,
    handleChange,
    handleUpdateUser,
    handlePasswordChange,
    handleFileUpload,
    mutation,
  } = useUpdateUser(props.user.id as number);

  return (
    <>
      <Button
        // color="white"
        size="xs"
        rounded="full"
        variant="outline"
        mt={8}
        w="fit-content"
        _hover={{ bg: "gray.500" }}
        onClick={onOpen}
      >
        Edit Profile
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bg="blackAlpha.800" color="white">
            Edit{" "}
            <Text color={"#22c35e"} as={"span"}>
              @{props.user.username}
            </Text>{" "}
            Profile
          </ModalHeader>
          <ModalCloseButton color={"white"} />
          <ModalBody
            pb={6}
            bg="blackAlpha.800"
            color="white"
            overflowY={"auto"}
          >
            <Flex pos={"relative"} rounded={"xl"} bg={"mediumseagreen"}>
              <Box
                h={"fit-content"}
                position={"relative"}
                left={4}
                bottom={-12}
              >
                <Button
                  bg="transparent"
                  _hover={{ bg: "transparent" }}
                  position="absolute"
                  top={-3}
                  right={-3}
                  onClick={() => setImage(null)}
                  color={"white"}
                >
                  <CloseButton />
                </Button>
                <Box
                  as={Button}
                  bg="transparent"
                  variant={"link"}
                  onClick={handleFileUpload}
                >
                  <Avatar
                    name={fullName}
                    src={
                      !image
                        ? props.user.profile_picture
                        : URL.createObjectURL(image)
                    }
                    size={"xl"}
                    border={"3px solid black"}
                    _hover={{
                      border: "3px solid #22c35e",
                    }}
                  />
                </Box>
              </Box>
            </Flex>
            <Flex mt={12} flexDirection={"column"} gap={4}>
              <FormControl>
                <FormLabel>Full Name</FormLabel>
                <Input
                  type="text"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    handleChange("full_name", e.target.value);
                  }}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Input
                  type="text"
                  value={profileDescription}
                  onChange={(e) => {
                    setProfileDescription(e.target.value);
                    handleChange("profile_description", e.target.value);
                  }}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Username</FormLabel>
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    handleChange("username", e.target.value);
                  }}
                />
              </FormControl>

              <Text textAlign={"center"}>Profile Settings</Text>

              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    handleChange("email", e.target.value);
                  }}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Password</FormLabel>
                <PasswordInput
                  handleChange={handlePasswordChange}
                  name="password"
                />
              </FormControl>
            </Flex>
          </ModalBody>

          <ModalFooter bg="blackAlpha.800">
            <Button
              mr={3}
              colorScheme="whatsapp"
              onClick={() => {
                handleUpdateUser();
                mutation.isSuccess ? onClose() : null;
              }}
            >
              {mutation.isPending ? <Spinner /> : "Save Changes"}
            </Button>
            <Button onClick={onClose} colorScheme="red">
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditProfile;

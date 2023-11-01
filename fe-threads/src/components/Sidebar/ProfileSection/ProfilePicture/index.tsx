import {
  Avatar,
  Flex,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";

const ProfilePicture = (props: { profile_src: string; username: string }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Link href="#" onClick={onOpen}>
        <Avatar name={props.username} src={props.profile_src} size={"md"} />
      </Link>

      <Modal isOpen={isOpen} onClose={onClose} size={"sm"}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton color={"white"} />
          <ModalBody bg={"blackAlpha.800"}>
            <Flex justifyContent={"center"}>
              <Avatar
                name={props.username}
                src={props.profile_src}
                w={"100%"}
                h={"100%"}
              />
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfilePicture;

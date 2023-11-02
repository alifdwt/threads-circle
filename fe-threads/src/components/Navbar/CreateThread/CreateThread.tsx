import {
  Box,
  Button,
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
  useDisclosure,
  Image,
  Spinner,
} from "@chakra-ui/react";
import useCreateThread from "./hooks/useCreateThread";
import { BiImageAdd, BiWindowClose } from "react-icons/bi";

const CreateThread = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    thread,
    image,
    setImage,
    mutation,
    // user,
    handlePost,
    handleThreadChange,
    handleFileUpload,
  } = useCreateThread();
  return (
    <>
      <Button onClick={onOpen} rounded="full" colorScheme="whatsapp">
        Create Thread
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel htmlFor="title">What is happening?</FormLabel>
              <Input
                id="title"
                placeholder="What is happening?"
                value={thread}
                onChange={handleThreadChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel htmlFor="image">Upload Image</FormLabel>
              <Box
                as={Button}
                bg="transparent"
                cursor="pointer"
                color="#04a51e"
                _hover={{ color: "purple", bg: "transparent" }}
                onClick={handleFileUpload}
              >
                <BiImageAdd style={{ transition: "color 150ms ease-in-out" }} />
              </Box>
            </FormControl>
            {image && (
              <Box as={Flex} align="center" justify="center">
                <Box w="fit-content" position="relative">
                  <Button
                    bg="transparent"
                    _hover={{ bg: "transparent" }}
                    position="absolute"
                    top={0}
                    right={0}
                    onClick={() => setImage(null)}
                  >
                    <BiWindowClose color="white" />
                  </Button>
                  <Image src={URL.createObjectURL(image)} />
                </Box>
              </Box>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="green"
              mr={3}
              isDisabled={image === null && thread === ""}
              onClick={handlePost}
            >
              {mutation.isPending ? <Spinner /> : "Post"}
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateThread;

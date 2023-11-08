// import { API } from "@/config/api";
import ThreadAPI from "@/types/ThreadCardAPI";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  MenuItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { BsPen } from "react-icons/bs";
import useEdit from "./hooks/useEdit";
import { BiImageAdd, BiWindowClose } from "react-icons/bi";

const EditModal = (props: { thread: ThreadAPI; type: string }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    content,
    image,
    setImage,
    mutation,
    handleChange,
    handleEdit,
    handleFileUpload,
  } = useEdit({
    identity: props.thread.id,
    type: props.type,
  });

  return (
    <>
      <MenuItem
        icon={<BsPen />}
        bg={"#262626"}
        _hover={{ bg: "#22c35e" }}
        onClick={onOpen}
      >
        Edit {props.type}
      </MenuItem>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Edit {props.type} {props.thread.id}
          </ModalHeader>
          <ModalBody>
            <FormControl>
              <FormLabel htmlFor="title">{props.type}</FormLabel>
              <Input
                id="title"
                placeholder={props.thread.content}
                value={content}
                onChange={handleChange}
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
              isDisabled={image === null && props.thread.content === ""}
              onClick={handleEdit}
              isLoading={mutation.isPending}
              loadingText="Posting..."
            >
              Post {props.type}
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditModal;

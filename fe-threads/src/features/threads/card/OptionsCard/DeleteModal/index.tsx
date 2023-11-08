import { API } from "@/config/api";
import {
  Button,
  MenuItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { BsTrash } from "react-icons/bs";

const DeleteModal = (props: { threadId: number; type: string }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDeleteThread = async () => {
    await API.delete(`/thread/${props.threadId}`);
  };

  const handleDeleteReply = async () => {
    await API.delete(`/reply/${props.threadId}`);
  };

  return (
    <>
      <MenuItem
        icon={<BsTrash />}
        bg={"#262626"}
        _hover={{ bg: "red" }}
        onClick={onOpen}
      >
        Delete {props.type}
      </MenuItem>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete {props.type}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to delete this {props.type}?
          </ModalBody>

          <ModalFooter>
            {props.type === "threads" ? (
              <Button colorScheme="red" onClick={handleDeleteThread}>
                Delete {props.type}
              </Button>
            ) : props.type === "replies" ? (
              <Button colorScheme="red" onClick={handleDeleteReply}>
                Delete {props.type}
              </Button>
            ) : null}
            {/* <Button colorScheme="red" onClick={handleDeleteThread}>
              Delete
            </Button> */}
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteModal;

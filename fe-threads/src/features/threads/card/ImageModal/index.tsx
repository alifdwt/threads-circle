import { ThreadPageCard } from "@/components/ThreadPage";
import { API } from "@/config/api";
import repliesDummy from "@/mocks/replies";
import ReplyAPI from "@/types/ReplyListAPI";
import ThreadAPI from "@/types/ThreadCardAPI";
import {
  Box,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

const ImageModal = (props: { thread: ThreadAPI }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [reply, setReply] = useState<ReplyAPI[]>(repliesDummy);

  useEffect(() => {
    const fetchRepliesData = async () => {
      const response = await API.get(`/replies/thread/${props.thread.id}`);
      setReply(response.data.data);
    };
    fetchRepliesData();
  });
  return (
    <>
      <Image
        onClick={onOpen}
        src={props.thread.image as string}
        maxW={"60%"}
        cursor={"pointer"}
      />

      <Modal isOpen={isOpen} onClose={onClose} size={"full"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bg={"#262626"} color={"white"}>
            Thread by @{props.thread.user?.username}
          </ModalHeader>
          <ModalCloseButton color={"white"} />
          <ModalBody display={"flex"} bg={"#262626"}>
            <Image
              src={props.thread.image as string}
              flex={4}
              maxW={"80vw"}
              maxH={"80vh"}
              objectFit={"contain"}
            />
            <Box
              flex={2}
              bg={"#373737"}
              color={"white"}
              pl={5}
              //   borderRadius={"20px"}
            >
              <ThreadPageCard
                thread={props.thread}
                reply={reply}
                type={"image"}
              />
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ImageModal;

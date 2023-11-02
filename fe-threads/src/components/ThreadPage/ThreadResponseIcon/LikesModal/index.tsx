import FollowCard from "@/components/Sidebar/SuggestedFollowers/FollowCard";
import LikeAPI from "@/types/LikeListAPI";
import {
  Button,
  HStack,
  Text,
  AvatarGroup,
  Avatar,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";

const LikesModal = (props: { likes_count: number; like_data: LikeAPI[] }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        color="whiteAlpha.600"
        // mt={2}
        bg={"whiteAlpha.200"}
        p={3}
        borderRadius={"10px"}
        gap={3}
        onClick={onOpen}
      >
        <HStack>
          {/* <BiSolidLike size={20} /> */}
          <Text fontSize="sm" color="whiteAlpha.600">
            {props.likes_count}
          </Text>
        </HStack>
        <AvatarGroup max={2} size={"xs"}>
          {props.like_data?.map((like) => (
            <Avatar
              key={like.user?.id}
              name={like.user?.full_name}
              src={like.user?.profile_picture}
            />
          ))}
        </AvatarGroup>
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color={"white"} bg={"blackAlpha.800"}>
            Likes
          </ModalHeader>
          <ModalCloseButton color={"white"} />
          <ModalBody color={"white"} bg={"blackAlpha.800"}>
            {props.likes_count === 0 ? (
              <Text>There is no likes yet!</Text>
            ) : (
              <>
                {props.like_data.map((like) => (
                  <FollowCard key={like.user?.id} datum={like.user} />
                ))}
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default LikesModal;

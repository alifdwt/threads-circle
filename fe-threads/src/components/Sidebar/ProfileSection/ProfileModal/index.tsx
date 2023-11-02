import FollowAPI from "@/types/FollowListAPI";
import {
  HStack,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import FollowCardModal from "./FollowsList";

const ProfileModal = (props: {
  title: string;
  followCount: number | undefined;
  follows: FollowAPI[] | undefined;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Link onClick={onOpen} color={"white"}>
        <HStack>
          <Text fontWeight={"bold"}>{props.followCount}</Text>
          <Text color={"grey"}>{props.title}</Text>
        </HStack>
      </Link>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color={"white"} bg={"blackAlpha.800"}>
            {props.title[0].toUpperCase() + props.title.slice(1)}
          </ModalHeader>
          <ModalCloseButton color={"white"} />
          <ModalBody color={"white"} bg={"blackAlpha.800"}>
            {props.followCount === 0 ? (
              <Text>There is no {props.title} yet!</Text>
            ) : (
              <>
                {props.follows?.map((datum: FollowAPI) => (
                  <FollowCardModal
                    key={datum.id}
                    followId={datum.id}
                    type={props.title}
                  />
                ))}
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;

import { API } from "@/config/api";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Link,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef, useState } from "react";

const UnfollowButton = (props: { followingId: number }) => {
  const [isHovering, setIsHovering] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);

  const handleUnfollow = async () => {
    await API.delete(`/follow/${props.followingId}`);
  };

  return (
    <>
      <Link
        onClick={onOpen}
        fontWeight={"bold"}
        variant={"outline"}
        border={"1px solid gray"}
        color={"gray"}
        px={5}
        py={2}
        borderRadius={"20px"}
        height={"40px"}
        width={"120px"}
        textAlign={"center"}
        _hover={{
          textDecoration: "none",
          bg: "red.500",
          color: "white",
          border: "none",
        }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {isHovering ? "Unfollow" : "Following"}
      </Link>

      <AlertDialog
        isOpen={isOpen}
        onClose={onClose}
        leastDestructiveRef={cancelRef}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>Unfollow</AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to unfollow?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                No
              </Button>
              <Button
                colorScheme="red"
                ml={3}
                onClick={() => {
                  handleUnfollow();
                  onClose();
                }}
              >
                Yes
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default UnfollowButton;

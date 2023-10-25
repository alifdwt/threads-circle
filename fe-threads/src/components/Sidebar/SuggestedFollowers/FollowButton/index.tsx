import { Button } from "@chakra-ui/react";
import { useState } from "react";

const FollowButton = () => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <Button
      borderRadius={"15px"}
      variant={"outline"}
      color={"gray"}
      width={"100px"}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      _hover={{ bg: "red.500", color: "white" }}
    >
      {isHovering ? "Unfollow" : "Following"}
    </Button>
  );
};

export default FollowButton;

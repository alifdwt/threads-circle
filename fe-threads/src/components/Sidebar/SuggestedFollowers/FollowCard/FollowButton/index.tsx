import { API } from "@/config/api";
import useProfileSelector from "@/hooks/SelectedProfile/useProfileSelector";
import { Link } from "@chakra-ui/react";
import { useFollows } from "../hooks/useFollow";
import { useState } from "react";

const FollowButton = (props: { followingId: number }) => {
  const [isHovering, setIsHovering] = useState(false);
  const { selectedProfile } = useProfileSelector();
  const { getFollows } = useFollows();
  const usersFollowed = getFollows
    ?.filter((entry) => entry.follower.id === selectedProfile)
    .map((entry) => entry.following.id);
  const isFollowed = usersFollowed?.find((id) => id === props.followingId);

  const handleFollow = async () => {
    await API.post("/follow", { followingId: props.followingId });
  };
  const handleUnfollow = async () => {
    await API.delete(`/follow/${props.followingId}`);
  };
  return (
    <>
      {isFollowed ? (
        <Link
          onClick={handleUnfollow}
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
      ) : (
        <Link
          onClick={handleFollow}
          //   href="#"
          bg={"#22c35e"}
          color={"white"}
          px={5}
          py={2}
          borderRadius={"20px"}
          height={"40px"}
          _hover={{ textDecoration: "none" }}
        >
          Follow
        </Link>
      )}
    </>
  );
};

export default FollowButton;

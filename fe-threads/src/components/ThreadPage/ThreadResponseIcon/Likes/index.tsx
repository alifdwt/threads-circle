import { API } from "@/config/api";
import useProfileSelector from "@/hooks/SelectedProfile/useProfileSelector";
import LikeAPI from "@/types/LikeListAPI";
import { ButtonGroup, IconButton } from "@chakra-ui/react";
import { BiSolidLike } from "react-icons/bi";
import LikesModal from "../LikesModal";

const ThreadLikesCard = (props: {
  likes_count: number;
  like_data: LikeAPI[];
  threadId: number;
}) => {
  const { selectedProfile } = useProfileSelector();
  const isLiked = props.like_data?.find(
    (like) => like.user?.id === selectedProfile
  );
  // console.log(props.like_data);

  const handleLike = async () => {
    await API.post("/like", {
      userId: selectedProfile,
      threadId: props.threadId,
    });
  };
  const handleDisLike = async () => {
    await API.delete(`/like/${isLiked?.id}`);
  };
  return (
    <ButtonGroup isAttached>
      <IconButton
        aria-label="Like"
        icon={<BiSolidLike />}
        color={isLiked ? "#22c35e" : "whiteAlpha.600"}
        bg={isLiked ? "white" : "whiteAlpha.200"}
        _hover={{ color: "#22c35e", bg: "white" }}
        onClick={isLiked ? handleDisLike : handleLike}
      />
      <LikesModal likes_count={props.likes_count} like_data={props.like_data} />
    </ButtonGroup>
  );
};

export default ThreadLikesCard;

import { API } from "@/config/api";
import useProfileSelector from "@/hooks/SelectedProfile/useProfileSelector";
import LikeAPI from "@/types/LikeListAPI";
import { ButtonGroup, IconButton, useColorModeValue } from "@chakra-ui/react";
import { BiSolidLike } from "react-icons/bi";
import LikesModal from "../LikesModal";

const ThreadLikesCard = (props: {
  likes_count: number;
  like_data: LikeAPI[];
  threadId: number;
}) => {
  const { selectedProfile } = useProfileSelector();
  const color = useColorModeValue("black", "white");
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
        color={isLiked ? color : `${color}Alpha.600`}
        bg={isLiked ? "#22c35e" : `${color}Alpha.200`}
        _hover={{ color: "#22c35e", bg: color }}
        onClick={isLiked ? handleDisLike : handleLike}
      />
      <LikesModal likes_count={props.likes_count} like_data={props.like_data} />
    </ButtonGroup>
  );
};

export default ThreadLikesCard;

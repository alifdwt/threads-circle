import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuOptionGroup,
  Button,
} from "@chakra-ui/react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { BsBookmarkPlus, BsExclamationCircle } from "react-icons/bs";
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";
import ThreadAPI from "@/types/ThreadCardAPI";

const OptionsCard = (props: {
  isProfileThread: boolean;
  thread: ThreadAPI;
  type: string;
}) => {
  return (
    <Menu>
      <MenuButton as={Button} variant={"ghost"}>
        <BiDotsVerticalRounded size={20} color={"white"} />
      </MenuButton>
      <MenuList bg={"#262626"}>
        <MenuOptionGroup title="Options" textAlign={"center"}>
          <MenuItem
            icon={<BsBookmarkPlus />}
            bg={"#262626"}
            _hover={{ bg: "#22c35e" }}
          >
            Bookmark
          </MenuItem>
          <MenuItem
            icon={<BsExclamationCircle />}
            bg={"#262626"}
            _hover={{ bg: "#22c35e" }}
          >
            Report
          </MenuItem>
        </MenuOptionGroup>
        {props.isProfileThread && (
          <MenuOptionGroup title="Thread" textAlign={"center"}>
            <EditModal thread={props.thread} type={props.type} />
            <DeleteModal threadId={props.thread.id} type={props.type} />
          </MenuOptionGroup>
        )}
      </MenuList>
    </Menu>
  );
};

export default OptionsCard;

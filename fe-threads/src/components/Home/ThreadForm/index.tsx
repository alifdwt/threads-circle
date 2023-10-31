// import { ProfileId } from "@/types/ProfileId";
import useUser from "@/hooks/Users/useUser";
import useThreads from "../hooks/useThread";
import {
  InputGroup,
  InputLeftElement,
  Input,
  Button,
  Avatar,
  Box,
  Flex,
} from "@chakra-ui/react";
import { BiImageAdd, BiListPlus, BiLocationPlus } from "react-icons/bi";
import useProfileSelector from "@/pages/Home/ProfileSelector/hooks/useProfileSelector";

const ThreadFormNew = () => {
  const { handlePost, handleChange, handleButtonClick, fileInputRef } =
    useThreads();
  const { selectedProfile } = useProfileSelector();
  const { getUser } = useUser({ userId: selectedProfile });

  return (
    <Box>
      <form onSubmit={handlePost} encType="multipart/form-data">
        <InputGroup size={"lg"} border={"1px solid transparent"}>
          <InputLeftElement width={"4.5rem"}>
            <Avatar
              name={getUser?.profile_picture}
              src={getUser?.profile_picture}
              size={"sm"}
              top={"2"}
            />
          </InputLeftElement>
          <Input
            placeholder="What is Happening"
            type="text"
            pr={"4.5rem"}
            pl={"4rem"}
            py={"2rem"}
            onChange={handleChange}
            name="content"
            _focus={{ color: "white" }}
          />
        </InputGroup>
        <Flex
          justifyContent={"space-between"}
          p={2}
          borderBottom={"1px solid gray"}
        >
          <Flex ml={5} gap={2}>
            <label htmlFor="file-upload">
              <Button
                variant={"link"}
                color={"green"}
                size={"lg"}
                onClick={handleButtonClick}
              >
                <BiImageAdd />
              </Button>
            </label>
            <input
              id="file-upload"
              type="file"
              name="image"
              style={{ display: "none" }}
              onChange={handleChange}
              ref={fileInputRef}
            />
            <Button variant={"link"} color={"green"} size={"lg"}>
              <BiLocationPlus />
            </Button>
            <Button variant={"link"} color={"green"} size={"lg"}>
              <BiListPlus />
            </Button>
          </Flex>
          <Box>
            <Button
              h="1.75rem"
              colorScheme="whatsapp"
              type="submit"
              w={"100px"}
            >
              Post
            </Button>
          </Box>
        </Flex>
      </form>
    </Box>
  );
};

export default ThreadFormNew;

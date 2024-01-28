// import { ProfileId } from "@/types/ProfileId";
import { useUser } from "@/hooks/Users/useUser";
import {
  InputGroup,
  InputLeftElement,
  Input,
  Button,
  Avatar,
  Box,
  Flex,
  Image,
  Spinner,
  useColorModeValue,
} from "@chakra-ui/react";
import { BiImageAdd, BiListPlus, BiLocationPlus } from "react-icons/bi";
import { AiOutlineCloseCircle } from "react-icons/ai";
import useProfileSelector from "@/hooks/SelectedProfile/useProfileSelector";
import useCreateThread from "@/components/Navbar/CreateThread/hooks/useCreateThread";

const ThreadFormNew = (props: { identity: number; type: string }) => {
  const color = useColorModeValue("black", "white");
  const { selectedProfile } = useProfileSelector();
  const { getUser } = useUser({ userId: selectedProfile });
  const {
    thread,
    image,
    setImage,
    mutation,
    handlePost,
    handleThreadChange,
    handleFileUpload,
  } = useCreateThread({
    identity: props.identity,
    type: props.type,
  });

  return (
    <Box>
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
          onChange={handleThreadChange}
          name="content"
          _focus={{ color: color }}
        />
      </InputGroup>
      <Flex
        justifyContent={"space-between"}
        p={2}
        borderBottom={"1px solid gray"}
        bg={color === "black" ? "gray.200" : "gray.800"}
      >
        <Flex ml={5} gap={2}>
          {image && (
            <Box h={"fit-content"} position={"relative"}>
              <Button
                bg="transparent"
                _hover={{ bg: "transparent" }}
                position="absolute"
                top={-5}
                right={-5}
                onClick={() => setImage(null)}
                color={"white"}
              >
                <AiOutlineCloseCircle />
              </Button>
              <Image src={URL.createObjectURL(image)} maxHeight={"30px"} />
            </Box>
          )}
        </Flex>
        <Flex>
          <Box
            as={Button}
            variant={"link"}
            color={"#22c35e"}
            size={"lg"}
            onClick={handleFileUpload}
          >
            <BiImageAdd />
          </Box>
          <Button variant={"link"} color={"#22c35e"} size={"lg"}>
            <BiLocationPlus />
          </Button>
          <Button variant={"link"} color={"#22c35e"} size={"lg"}>
            <BiListPlus />
          </Button>
          <Button
            h="1.75rem"
            colorScheme="whatsapp"
            w={"100px"}
            isDisabled={image === null && thread === ""}
            onClick={handlePost}
          >
            {mutation.isPending ? <Spinner /> : "Post"}
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default ThreadFormNew;

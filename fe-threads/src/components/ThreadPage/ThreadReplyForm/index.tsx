import { API } from "@/config/api";
import { HStack, Avatar, Input, Box, Button } from "@chakra-ui/react";
import { BiImageAdd } from "react-icons/bi";
import {
  ChangeEvent,
  useState,
  //  useEffect
} from "react";

type formInputData = {
  content: string;
  image: string;
  // userId: number;
  threadId: number;
};

const ThreadReplyForm = (props: { threadId: number }) => {
  const { threadId } = props;
  // const [selectedProfile, setSelectedProfile] = useState<number>(1);
  // useEffect(() => {
  //   const storedProfile = localStorage.getItem("selectedProfile");
  //   if (storedProfile) {
  //     setSelectedProfile(JSON.parse(storedProfile));
  //   }
  // }, []);

  const [form, setForm] = useState<formInputData>({
    content: "",
    image: "",
    // userId: selectedProfile,
    threadId: threadId,
  });

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handlePost() {
    await API.post("/reply", {
      ...form,
      // userId: selectedProfile,
      threadId: threadId,
    });
  }
  return (
    <HStack mt={5} justify="space-between">
      <HStack>
        <Avatar size="sm" mr={3} />
        <Input
          variant="unstyled"
          color="whiteAlpha.800"
          placeholder="What is happening?"
          onChange={handleChange}
          name="content"
        />
        <Input
          variant="unstyled"
          color="whiteAlpha.400"
          placeholder="Image"
          onChange={handleChange}
          name="image"
        />
      </HStack>
      <HStack>
        <Box cursor="pointer">
          <BiImageAdd size={25} color="green" />
        </Box>
        <Button
          colorScheme="whatsapp"
          size="xs"
          px={3}
          rounded="full"
          onClick={handlePost}
        >
          Post
        </Button>
      </HStack>
    </HStack>
  );
};

export default ThreadReplyForm;

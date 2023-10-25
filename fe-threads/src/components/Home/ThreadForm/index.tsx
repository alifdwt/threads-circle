import { API } from "@/config/api";
import userDummy from "@/mocks/user";
import ProfileId from "@/types/ProfileId";
import UserListAPI from "@/types/UserListAPI";
import {
  InputGroup,
  InputLeftElement,
  Input,
  Button,
  Avatar,
  Box,
  Flex,
} from "@chakra-ui/react";
import { ChangeEvent, useState, useEffect } from "react";

type formInputData = {
  content: string;
  image: string;
  userId: number;
};

const ThreadForm = (props: ProfileId) => {
  const [profile, setProfile] = useState<UserListAPI>(userDummy);
  const { profileNum } = props;
  useEffect(() => {
    const fetchData = async () => {
      const response = await API.get(`/user/${profileNum}`);
      setProfile(response.data.data);
    };
    fetchData();
  });
  const [form, setForm] = useState<formInputData>({
    content: "",
    image: "",
    userId: profile.id,
  });

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }
  // console.log(form);

  async function handlePost() {
    console.log(form);
    await API.post("/thread", form);
    // refetch()
  }

  return (
    <Box>
      <InputGroup size={"lg"} border={"1px solid transparent"}>
        <InputLeftElement width={"4.5rem"}>
          <Avatar
            name={profile.full_name}
            src={profile.profile_picture}
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
        />
        <Input
          placeholder="Image"
          type="text"
          pr={"4.5rem"}
          pl={"4rem"}
          py={"2rem"}
          onChange={handleChange}
          name="image"
        />
      </InputGroup>
      <Flex justifyContent={"center"} mt={2}>
        <Input
          placeholder="userId"
          type="number"
          onChange={handleChange}
          name="userId"
          w={"20%"}
        />
        <Button
          h="1.75rem"
          size="sm"
          colorScheme="green"
          onClick={handlePost}
          w={"20%"}
        >
          Post
        </Button>
      </Flex>
    </Box>
    // <Stack spacing={3} p={5}>
    //   <Input placeholder="What is Happening" />
    //   <Input placeholder="Image" />
    //   <Button>Post</Button>
    // </Stack>
  );
};

export default ThreadForm;

// import UploadWidget from "@/components/UploadWidget";
import UploadWidget from "@/components/UploadWidget";
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
  Link,
} from "@chakra-ui/react";
import { ChangeEvent, useState, useEffect } from "react";
import { BiImageAdd, BiListPlus, BiLocationPlus } from "react-icons/bi";

type formInputData = {
  content: string;
  image: string;
  userId: number;
};

const ThreadForm = (props: ProfileId) => {
  const { profileNum } = props;

  const [profile, setProfile] = useState<UserListAPI>(userDummy[0]);
  const [cloudinary, setCloudinary] = useState(null);
  const [widget, setWidget] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await API.get(`/user/${profileNum}`);
      setProfile(response.data.data);
    };
    fetchData();

    setCloudinary(window.cloudinary);
    if (cloudinary) {
      const newWidget = window.cloudinary.createUploadWidget(
        {
          cloudName: "dxirtmo5t",
          uploadPreset: "peg7fz8v",
          folder: `Circle/Threads/${profile.username}`,
        },
        function (error, result) {
          if (!error && result && result.event === "success") {
            setImageUrl(result.info.secure_url);
          }
        }
      );
      setWidget(newWidget);
    }
  }, [profileNum, cloudinary]);
  const [form, setForm] = useState<formInputData>({
    content: "",
    image: imageUrl,
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
    await API.post("/thread", { ...form, userId: profileNum, image: imageUrl });
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
          _focus={{ color: "white" }}
        />
      </InputGroup>
      <Flex
        justifyContent={"space-between"}
        p={2}
        borderBottom={"1px solid gray"}
      >
        <Flex ml={5} gap={2}>
          <Button
            onClick={() => widget?.open()}
            variant={"link"}
            color={"green"}
            size={"lg"}
          >
            <BiImageAdd />
          </Button>
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
            onClick={handlePost}
            w={"100px"}
          >
            Post
          </Button>
        </Box>
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

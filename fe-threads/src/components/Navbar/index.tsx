// import NavbarListType from "@/types/NavbarList";
import NavbarListType from "@/types/NavbarList";
import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { BiLogOut } from "react-icons/bi";
import {
  BiSolidHomeCircle,
  BiSearchAlt,
  BiHeart,
  BiUserCircle,
} from "react-icons/bi";
import CreatePost from "./CreatePost";
import { useState, useEffect } from "react";
import UserListAPI from "@/types/UserListAPI";
import userDummy from "@/mocks/user";
import { API } from "@/config/api";
import { useNavigate } from "react-router-dom";

const navbarList: NavbarListType[] = [
  {
    id: 1,
    name: "Home",
    link: "/home",
    icon: <BiSolidHomeCircle />,
  },
  {
    id: 2,
    name: "Search",
    link: "/search",
    icon: <BiSearchAlt />,
  },
  {
    id: 3,
    name: "Follows",
    link: "/follows",
    icon: <BiHeart />,
  },
  {
    id: 4,
    name: "Profile",
    link: "/profile",
    icon: <BiUserCircle />,
  },
];

// type NavbarList = {
//   username: string | undefined;
// };

const Navbar = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const storedProfile = localStorage.getItem("selectedProfile");
    if (storedProfile) {
      setSelectedProfile(JSON.parse(storedProfile));
    }
  }, []);

  const [selectedProfile, setSelectedProfile] = useState<number>(1);
  const [profile, setProfile] = useState<UserListAPI>(userDummy[0]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await API.get(`/user/${selectedProfile}`);
      setProfile(response.data.data);
    };
    fetchData();
  });
  return (
    <Stack h={"full"} justify={"space-between"}>
      <Flex
        position={"sticky"}
        top={5}
        flexDirection={"column"}
        justifyContent={"space"}
      >
        <Box>
          <Link href="/" _hover={{ textDecoration: "none" }}>
            <Heading color={"green"} pl={3}>
              Circle
            </Heading>
          </Link>
          <Stack mt={4}>
            {navbarList.map((item) => (
              <Link
                key={item.id}
                onClick={() => {
                  if (item.name === "Profile") {
                    navigate(`/profile/${profile.username}`);
                  } else {
                    navigate(item.link);
                  }
                }}
                _hover={{ textDecoration: "none", bg: "whiteAlpha.100" }}
                borderRadius={"15px"}
                p={3}
              >
                <HStack>
                  {item.icon}
                  <Text>{item.name}</Text>
                </HStack>
              </Link>
            ))}
            <CreatePost />
          </Stack>
        </Box>
        <Box>
          <Button
            fontWeight="light"
            color="white"
            display="flex"
            leftIcon={<BiLogOut size={30} />}
            colorScheme="teal"
            variant="unstyled"
          >
            Logout
          </Button>
        </Box>
      </Flex>
    </Stack>
  );
};

export default Navbar;

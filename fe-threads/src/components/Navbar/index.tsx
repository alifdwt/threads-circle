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
  // useColorMode,
} from "@chakra-ui/react";
import { BiLogOut } from "react-icons/bi";
import {
  BiSolidHomeCircle,
  BiSearchAlt,
  BiHeart,
  BiUserCircle,
} from "react-icons/bi";
import CreateThread from "./CreateThread/CreateThread";
import { useNavigate } from "react-router-dom";
import useProfileSelector from "@/hooks/SelectedProfile/useProfileSelector";
import { useUser } from "@/hooks/Users/useUser";
import { useDispatch } from "react-redux";
import { AUTH_LOGOUT } from "@/store/RootReducer";

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

const Navbar = () => {
  // const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedProfile } = useProfileSelector();
  const { getUser } = useUser({ userId: selectedProfile });

  const handleLogout = () => {
    dispatch(AUTH_LOGOUT());
    navigate("/");
  };
  return (
    <Stack h={"full"}>
      <Flex position={"sticky"} top={5} flexDirection={"column"}>
        <Box>
          <Link
            onClick={() => navigate("/")}
            _hover={{ textDecoration: "none" }}
          >
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
                    navigate(`/profile/${getUser?.username}`);
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
            <CreateThread />
          </Stack>
        </Box>
        <Box mt={20}>
          <Button
            fontWeight="light"
            color="white"
            display="flex"
            leftIcon={<BiLogOut size={30} />}
            colorScheme="teal"
            variant="unstyled"
            onClick={handleLogout}
          >
            Logout
          </Button>
          {/* <Button onClick={toggleColorMode}>
            Toggle {colorMode === "light" ? "Dark" : "Light"}
          </Button> */}
        </Box>
      </Flex>
    </Stack>
  );
};

export default Navbar;

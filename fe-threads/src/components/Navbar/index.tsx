// import NavbarListType from "@/types/NavbarList";
import NavbarListType from "@/types/NavbarList";
import { Box, Flex, Heading, Icon, Link } from "@chakra-ui/react";
import {} from "react-icons/bi";
import {
  BiSolidHomeCircle,
  BiSearchAlt,
  BiHeart,
  BiUserCircle,
} from "react-icons/bi";
import CreatePost from "./CreatePost";

const navbarList: NavbarListType[] = [
  {
    id: 1,
    name: "Home",
    link: "#",
    icon: BiSolidHomeCircle,
  },
  {
    id: 2,
    name: "Search",
    link: "/search",
    icon: BiSearchAlt,
  },
  {
    id: 3,
    name: "Follows",
    link: "/follows",
    icon: BiHeart,
  },
  {
    id: 4,
    name: "Profile",
    link: "/profile",
    icon: BiUserCircle,
  },
];

const Navbar = () => {
  return (
    <Box position={"sticky"} top={0}>
      <Heading color={"green"}>Circle</Heading>
      <Flex flexDirection={"column"} gap={2} py={4}>
        {navbarList.map((item) => (
          <Link
            key={item.id}
            href={item.link}
            fontSize={"lg"}
            fontWeight={"semibold"}
          >
            <Icon as={item.icon} /> {item.name}
          </Link>
        ))}
      </Flex>
      {/* <Button bg="green" color="white" w={"100%"} borderRadius={"15px"}>
        Create Post
      </Button> */}
      <CreatePost />
    </Box>
  );
};

export default Navbar;

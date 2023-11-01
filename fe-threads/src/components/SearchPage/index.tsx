import { Flex } from "@chakra-ui/react";
import SearchBox from "./SearchBox";
import SearchTabs from "./SearchTabs";
import { useEffect, useState } from "react";
import { API } from "@/config/api";

const HeadingPage = () => {
  const [getUsers, setGetUsers] = useState([]);
  useEffect(() => {
    const response = async () => {
      const data = await API.get("/users").then((res) => res.data.data);
      setGetUsers(data);
    };
    response();
  });
  const [search, setSearch] = useState("");
  //   console.log(getUsers);
  return (
    <Flex flexDirection={"column"} gap={4}>
      <SearchBox searchTerm={search} onSearch={setSearch} />
      <SearchTabs searchTerm={search} userData={getUsers} />
      {/* <Heading textAlign={"center"}>Ini Search</Heading> */}
    </Flex>
  );
};

export default HeadingPage;

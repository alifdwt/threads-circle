import { Flex } from "@chakra-ui/react";
import SearchBox from "./SearchBox";
import SearchTabs from "./SearchTabs";
import { useEffect, useState } from "react";
import { API } from "@/config/api";

const SearchPage = () => {
  const [getUsers, setGetUsers] = useState([]);
  const [getThreads, setGetThreads] = useState([]);
  useEffect(() => {
    const usersResponse = async () => {
      const data = await API.get("/users").then((res) => res.data.data);
      setGetUsers(data);
    };
    usersResponse();

    const threadsResponse = async () => {
      const data = await API.get("/threads").then((res) => res.data.data);
      setGetThreads(data);
    };
    threadsResponse();
  });
  const [search, setSearch] = useState("");
  //   console.log(getUsers);
  return (
    <Flex flexDirection={"column"} gap={4}>
      <SearchBox searchTerm={search} onSearch={setSearch} />
      <SearchTabs
        searchTerm={search}
        userData={getUsers}
        threadData={getThreads}
      />
      {/* <Heading textAlign={"center"}>Ini Search</Heading> */}
    </Flex>
  );
};

export default SearchPage;

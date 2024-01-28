import FollowCard from "@/components/Sidebar/SuggestedFollowers/FollowCard";
import ThreadContainer from "@/features/threads/card";
import ThreadAPI from "@/types/ThreadCardAPI";
import UserListAPI from "@/types/UserListAPI";
import {
  Flex,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useColorModeValue,
} from "@chakra-ui/react";

const SearchTabs = (props: {
  searchTerm: string;
  userData: UserListAPI[];
  threadData: ThreadAPI[];
}) => {
  const color = useColorModeValue("black", "white");
  const filteredUser = props.userData.filter((user) =>
    user.username.toLowerCase().includes(props.searchTerm.toLowerCase())
  );

  const filteredThreads = props.threadData.filter((thread) =>
    // thread.title.toLowerCase().includes(props.searchTerm.toLowerCase()) ||
    thread.content.toLowerCase().includes(props.searchTerm.toLowerCase())
  );
  // console.log(filteredThreads);

  return (
    <Tabs isFitted>
      <TabList>
        <Tab _selected={{ color: "white", bg: "green.400" }} color={color}>
          Users
        </Tab>
        <Tab _selected={{ color: "white", bg: "green.400" }} color={color}>
          Threads
        </Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <Flex flexDirection={"column"} gap={4}>
            {filteredUser.length > 0 ? (
              <>
                {filteredUser.map((user) => (
                  <FollowCard key={user.id} datum={user} />
                ))}
              </>
            ) : (
              <Heading textAlign={"center"}>No users found</Heading>
            )}
          </Flex>
        </TabPanel>
        <TabPanel>
          <Flex flexDirection={"column"}>
            {filteredThreads.length > 0 ? (
              <ThreadContainer threads={filteredThreads} type="threads" />
            ) : (
              <Heading textAlign={"center"}>No threads found</Heading>
            )}
          </Flex>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default SearchTabs;

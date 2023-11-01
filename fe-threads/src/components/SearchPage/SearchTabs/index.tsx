import FollowCard from "@/components/Sidebar/SuggestedFollowers/FollowCard";
import UserListAPI from "@/types/UserListAPI";
import {
  Flex,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";

const SearchTabs = (props: { userData: UserListAPI[]; searchTerm: string }) => {
  const filteredUser = props.userData.filter((user) =>
    user.username.toLowerCase().includes(props.searchTerm.toLowerCase())
  );
  //   console.log(filteredUser);

  return (
    <Tabs isFitted>
      <TabList>
        <Tab _selected={{ color: "white", bg: "green.400" }}>Users</Tab>
        <Tab _selected={{ color: "white", bg: "green.400" }}>Threads</Tab>
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
          <Heading>Ini buat Threads</Heading>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default SearchTabs;

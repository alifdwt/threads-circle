import ThreadContainer from "@/features/threads/card";
// import ThreadCard from "@/features/threads/card/Thread";
// import threadsData from "@/mocks/threads";
import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ThreadForm from "./ThreadForm";
import ThreadAPI from "@/types/ThreadCardAPI";
import { API } from "@/config/api";

const HomeTimeline = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await API.get("/threads");
      setData(response.data.data);
    };
    fetchData();
  });
  return (
    <Box border={"1px solid gray"}>
      <ThreadForm />
      {data.map((datum: ThreadAPI) => (
        <ThreadContainer
          key={datum.id}
          id={datum.id}
          author_picture={datum.user.profile_picture}
          author_name={datum.user.full_name}
          author_username={datum.user.username}
          thread={datum.content}
          image={datum.image}
          likes_count={0}
          replies_count={0}
          is_verified={false}
          is_followed={true}
        />
      ))}
      {/* <Tabs isFitted variant={"enclosed"}>
        <TabList>
          <Tab>All</Tab>
          <Tab>Following</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            {data.map((datum) => (
              <ThreadContainer
                key={datum.id}
                id={datum.id}
                author_picture={datum.author_picture}
                author_name={datum.author_name}
                author_username={datum.author_username}
                thread={datum.thread}
                image={datum.image}
                likes_count={datum.likes_count}
                replies_count={datum.replies_count}
                is_verified={datum.is_verified}
                is_followed={datum.is_followed}
              />
            ))}
          </TabPanel>
          <TabPanel>
            {followedData.map((datum) => (
              <ThreadContainer
                key={datum.id}
                id={datum.id}
                author_picture={datum.author_picture}
                author_name={datum.author_name}
                author_username={datum.author_username}
                thread={datum.thread}
                image={datum.image}
                likes_count={datum.likes_count}
                replies_count={datum.replies_count}
                is_verified={datum.is_verified}
                is_followed={datum.is_followed}
              />
            ))}
          </TabPanel>
        </TabPanels>
      </Tabs> */}
    </Box>
  );
};

export default HomeTimeline;

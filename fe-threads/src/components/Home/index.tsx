import ThreadContainer from "@/features/threads/card";
// import ThreadCard from "@/features/threads/card/Thread";
// import threadsData from "@/mocks/threads";
import { Box } from "@chakra-ui/react";
import ThreadForm from "./ThreadForm";
import ThreadAPI from "@/types/ThreadCardAPI";
import { API } from "@/config/api";
// import { useQuery } from "@tanstack/react-query";
import ProfileId from "@/types/ProfileId";
import { useEffect, useState } from "react";

const HomeTimeline = (props: ProfileId) => {
  const { profileNum } = props;
  // const { data: thread, refetch } = useQuery({
  //   queryKey: ["threads"],
  //   queryFn: async () => await API.get("/threads").then((res) => res.data.data),
  // });
  const [thread, setThread] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await API.get("/threads");
      setThread(response.data.data);
    };
    fetchData();
  });

  // console.log(thread.map((datum) => datum.image));

  return (
    <Box border={"1px solid gray"}>
      <ThreadForm profileNum={profileNum} />
      {thread.map((datum: ThreadAPI) => (
        <ThreadContainer
          key={datum.id}
          id={datum.id}
          content={datum.content}
          image={datum.image}
          user={datum.user}
          replies={datum.replies}
          likes={datum.likes}
          created_at={datum.created_at}
          updated_at={datum.updated_at}
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

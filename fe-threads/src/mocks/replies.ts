import ReplyAPI from "@/types/ReplyListAPI";

const repliesDummy: ReplyAPI[] = [
  {
    id: 1,
    content: "Ayo gas! Kita berangkat",
    image: "null",
    created_at: "2023-10-25T09:28:05.785Z",
    updated_at: "2023-10-25T09:28:05.785Z",
    user: {
      id: 2,
      username: "patrickstar123",
      full_name: "Patrick Star",
      email: "patrick@gmail.com",
      password: "patrick123",
      profile_picture:
        "https://upload.wikimedia.org/wikipedia/en/thumb/3/33/Patrick_Star.svg/220px-Patrick_Star.svg.png",
      profile_description: "Spongebob's best friend and neighbor",
      created_at: "2023-10-25T07:19:53.839Z",
      updated_at: "2023-10-25T07:19:53.839Z",
    },
    thread: {
      id: 1,
      content: "Mari kita ke konser musik kolosal di taman Bikini Bottom!",
      image: "null",
      created_at: "2023-10-25T07:22:16.631Z",
      updated_at: "2023-10-25T07:22:16.631Z",
    },
  },
];

export default repliesDummy;

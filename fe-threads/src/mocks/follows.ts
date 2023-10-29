import FollowAPI from "@/types/FollowListAPI";

const followsDummy: FollowAPI[] = [
  {
    id: 1,
    created_at: "2023-10-29T12:11:47.847Z",
    updated_at: "1000-01-01T00:00:00.000Z",
    follower: {
      id: 1,
      username: "spongebob123",
      full_name: "Spongebob Squarepants",
      email: "spongebob@gmail.com",
      password: "sponge123",
      profile_picture:
        "https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/SpongeBob_SquarePants_character.svg/220px-SpongeBob_SquarePants_character.svg.png",
      profile_description: "The main character of the show",
      created_at: "2023-10-25T07:19:11.325Z",
      updated_at: "2023-10-25T07:19:11.325Z",
    },
    following: {
      id: 3,
      username: "squidward_tentacles",
      full_name: "Squidward Tentacles",
      email: "squidward@gmail.com",
      password: "squidward123",
      profile_picture:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Squidward_Tentacles.svg/150px-Squidward_Tentacles.svg.png",
      profile_description: "Spongebob's grumpy neighbor and coworker",
      created_at: "2023-10-25T07:27:38.650Z",
      updated_at: "2023-10-25T07:27:38.650Z",
    },
  },
  {
    id: 2,
    created_at: "2023-10-29T12:11:47.847Z",
    updated_at: "1000-01-01T00:00:00.000Z",
    follower: {
      id: 3,
      username: "squidward_tentacles",
      full_name: "Squidward Tentacles",
      email: "squidward@gmail.com",
      password: "squidward123",
      profile_picture:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Squidward_Tentacles.svg/150px-Squidward_Tentacles.svg.png",
      profile_description: "Spongebob's grumpy neighbor and coworker",
      created_at: "2023-10-25T07:27:38.650Z",
      updated_at: "2023-10-25T07:27:38.650Z",
    },
    following: {
      id: 1,
      username: "spongebob123",
      full_name: "Spongebob Squarepants",
      email: "spongebob@gmail.com",
      password: "sponge123",
      profile_picture:
        "https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/SpongeBob_SquarePants_character.svg/220px-SpongeBob_SquarePants_character.svg.png",
      profile_description: "The main character of the show",
      created_at: "2023-10-25T07:19:11.325Z",
      updated_at: "2023-10-25T07:19:11.325Z",
    },
  },
  {
    id: 3,
    created_at: "2023-10-29T12:11:47.847Z",
    updated_at: "1000-01-01T00:00:00.000Z",
    follower: {
      id: 4,
      username: "mrkrabs123",
      full_name: "Eugene H. Krabs",
      email: "krabs@gmail.com",
      password: "krabs123",
      profile_picture:
        "https://upload.wikimedia.org/wikipedia/en/thumb/f/f8/Mr._Krabs.svg/220px-Mr._Krabs.svg.png",
      profile_description: "Spongebob's boss and owner of the Krusty Krab",
      created_at: "2023-10-26T03:06:48.612Z",
      updated_at: "2023-10-26T03:06:48.612Z",
    },
    following: {
      id: 1,
      username: "spongebob123",
      full_name: "Spongebob Squarepants",
      email: "spongebob@gmail.com",
      password: "sponge123",
      profile_picture:
        "https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/SpongeBob_SquarePants_character.svg/220px-SpongeBob_SquarePants_character.svg.png",
      profile_description: "The main character of the show",
      created_at: "2023-10-25T07:19:11.325Z",
      updated_at: "2023-10-25T07:19:11.325Z",
    },
  },
];

export default followsDummy;

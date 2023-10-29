import ThreadAPI from "@/types/ThreadCardAPI";

const threadDummy: ThreadAPI[] = [
  {
    id: 15,
    content: "Keren gan! #Keren",
    image: null,
    created_at: "2023-10-26T04:04:31.903Z",
    updated_at: "1000-01-01T00:00:00.000Z",
    user: {
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
    replies: [],
    likes: [],
  },
  {
    id: 14,
    content: "Pada mulanya adalah firman!",
    image:
      "https://e1.pxfuel.com/desktop-wallpaper/906/8/desktop-wallpaper-jellyfish-fields.jpg",
    created_at: "2023-10-26T04:03:26.376Z",
    updated_at: "1000-01-01T00:00:00.000Z",
    user: {
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
    replies: [],
    likes: [],
  },
  {
    id: 13,
    content: "Meong meong meong",
    image: "null",
    created_at: "2023-10-26T03:12:54.915Z",
    updated_at: "1000-01-01T00:00:00.000Z",
    user: {
      id: 5,
      username: "gary_snail",
      full_name: "Gary the Snail",
      email: "gary@gmail.com",
      password: "$2b$10$HJY2orMY0LDh3QUTIOVgL.wAVGGYCIWaJ7J9hZyJkIjXejVk8LTMC",
      profile_picture: "gary.jpg",
      profile_description: "Spongebob's pet snail",
      created_at: "2023-10-26T03:08:34.279Z",
      updated_at: "2023-10-26T03:08:34.279Z",
    },
    replies: [],
    likes: [],
  },
  {
    id: 12,
    content: "Halo gayz",
    image: "null",
    created_at: "2023-10-26T03:12:00.489Z",
    updated_at: "1000-01-01T00:00:00.000Z",
    user: {
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
    replies: [],
    likes: [],
  },
  {
    id: 11,
    content: "Halo gayz",
    image: "null",
    created_at: "2023-10-26T03:11:23.307Z",
    updated_at: "1000-01-01T00:00:00.000Z",
    user: {
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
    replies: [],
    likes: [],
  },
  {
    id: 10,
    content: "Hanya test saja",
    image: "null",
    created_at: "2023-10-25T08:22:07.988Z",
    updated_at: "1000-01-01T00:00:00.000Z",
    user: {
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
    replies: [
      {
        id: 2,
        content: "Keren banget Mas Squidward!",
        image: null,
        created_at: "2023-10-25T10:34:07.215Z",
        updated_at: "2023-10-25T10:34:07.215Z",
      },
    ],
    likes: [
      {
        id: 1,
        created_at: "2023-10-25T10:45:07.296Z",
        updated_at: "2023-10-25T10:45:07.296Z",
      },
    ],
  },
  {
    id: 9,
    content:
      "Screen Novelties created character models based on the works of Rankin/Bass for the show's stop-motion episodes.",
    image:
      "https://upload.wikimedia.org/wikipedia/en/thumb/1/14/SpongeBob_SquarePants_characters_by_Screen_Novelties.jpg/220px-SpongeBob_SquarePants_characters_by_Screen_Novelties.jpg",
    created_at: "2023-10-25T07:48:10.430Z",
    updated_at: "1000-01-01T00:00:00.000Z",
    user: {
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
    replies: [],
    likes: [],
  },
];

export default threadDummy;

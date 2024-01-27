export const metaCreator = (title: string, description: string, image: string) => {
  return [
    { title: `${title} | UYD` },
    {
      name: "description",
      content: description,
    },
    {
      property: "og:title",
      content: title,
    },
    {
      property: "og:description",
      content: description,
    },
    {
      property: "og:image",
      content: `https://useyourdream.com${image}`,
    },
    {
      property: "og:image:secure_url",
      content: `https://useyourdream.com${image}`,
    },
    {
      property: "twitter:title",
      content: title,
    },
    {
      property: "twitter:description",
      content: description,
    },
    {
      property: "twitter:image",
      content: `https://useyourdream.com${image}`,
    },
  ];
};

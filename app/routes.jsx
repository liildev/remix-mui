// @mui material components
import { Icon } from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";

const routes = [
  {
    name: "pages",
    icon: <Icon>dashboard</Icon>,
    columns: 2,
    rowsPerColumn: 2,
    collapse: [
      {
        name: "personal insights",
        collapse: [
          {
            name: "dream analyser",
            route: "/dream-analyser",
          },
          // {
          //   name: "home",
          //   route: "/",
          // },
          // {
          //   name: "videos",
          //   route: "/videos",
          // },
          {
            name: "guides",
            route: "/guides",
          },
        ],
      },
      {
        name: "main",
        collapse: [
          {
            name: "home",
            route: "/",
          },
          {
            name: "shop (coming soon)",
          },
        ],
      },
      {
        name: "support",
        collapse: [
          // {
          //   name: "contact us",
          //   route: "/support/contact-us",
          // },
          {
            name: "privacy policy",
            route: "/support/privacy",
          },
          {
            name: "disclaimers",
            route: "/support/disclaimers",
          },
        ],
      },
    ],
  },
  {
    name: "guides",
    icon: <MenuBookIcon />,
    collapse: [
      {
        name: "death related dreams",
        route: "/guides/death-related-dreams",
      },
      {
        name: "dreaming about your ex",
        route: "/guides/dreaming-about-your-ex",
      },
      {
        name: "dreams about flying",
        route: "/guides/dreams-about-flying",
      },
      {
        name: "dreams about snakes",
        route: "/guides/dreams-about-snakes",
      },
      {
        name: "Ex boyfriend dreams",
        route: "/guides/ex-boyfriend-dreams",
      },
      {
        name: "lucid dreams intro",
        route: "/guides/lucid-dreams-meaning",
      },
      {
        name: "nightmares explained",
        route: "/guides/nightmares-explained",
      },
      {
        name: "recurring dreams",
        route: "/guides/recurring-dreams",
      },
      {
        name: "spiritual meaning: dreaming about your ex",
        route: "/guides/spiritual-meaning-dreaming-about-ex",
      },
      {
        name: "teeth falling out",
        route: "/guides/teeth-falling-out",
      },
    ],
  },
  // {
  //   name: "account",
  //   icon: <Icon>contacts</Icon>,
  //   collapse: [
  //     {
  //       name: "sign in",
  //       route: "/sign-in",
  //     },
  //     {
  //       name: "sign up",
  //       route: "/sign-up",
  //     },
  //   ],
  // },
];

export default routes;

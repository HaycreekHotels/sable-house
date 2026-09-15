import { rooms } from "./data/accommodations";

const siteUrl = "https://www.sabalhouse.com";

export default function sitemap() {
  const roomPages = rooms.map((room) => ({
    url: `${siteUrl}/stay/accommodations/${room.slug}`,
  }));

  return [
    {
      url: `${siteUrl}/`,
    },

    {
      url: `${siteUrl}/our-story/making-of-sabal-house`,
    },

    {
      url: `${siteUrl}/stay/accommodations`,
    },

    ...roomPages,

    {
      url: `${siteUrl}/accessibility`,
    },

    {
      url: `${siteUrl}/privacy`,
    },
  ];
}

import { rooms } from "./data/accommodations";

const siteUrl = "https://www.sabalhouse.com";

export default function sitemap() {
  const lastModified = new Date();

  const roomPages = rooms.map((room) => ({
    url: `${siteUrl}/stay/accommodations/${room.slug}`,
    lastModified,
  }));

  return [
    {
      url: `${siteUrl}/`,
      lastModified,
    },

    {
      url: `${siteUrl}/our-story/making-of-sabal-house`,
      lastModified,
    },

    {
      url: `${siteUrl}/stay/accommodations`,
      lastModified,
    },

    ...roomPages,
    {
      url: `${siteUrl}/stay/offers`,
      lastModified,
    },
    {
      url: `${siteUrl}/dine/oak-steakhouse`,
      lastModified,
    },

    {
      url: `${siteUrl}/accessibility`,
      lastModified,
    },

    {
      url: `${siteUrl}/privacy`,
      lastModified,
    },
    {
      url: `${siteUrl}/faq`,
      lastModified,
    },
    {
      url: `${siteUrl}/explore/beyond-the-square`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/explore/savannah-in-season`,
      lastModified,
      changeFrequency: "daily",
      priority: 0.8,
    },
  ];
}

const siteUrl = "https://www.sabalhouse.com";

export default function robots() {
  return {
    rules: {
      userAgent: "*",

      allow: "/",

      disallow: ["/api/"],
    },

    sitemap: `${siteUrl}/sitemap.xml`,
  };
}

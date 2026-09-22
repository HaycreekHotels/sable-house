const siteUrl = "https://www.sabalhouse.com";

export default function robots() {
  const isPreview = process.env.VERCEL_ENV === "preview";

  if (isPreview) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },

    sitemap: `${siteUrl}/sitemap.xml`,
  };
}

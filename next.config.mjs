/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        // Optional: restrict to specific paths if needed
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

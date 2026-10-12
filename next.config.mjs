/** @type {import('next').NextConfig} */
const nextConfig = {
  // ⚡ HARDENED SECURITY ACCESS PERIMETER FOR EXTERNAL MEDIA PROVIDERS
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**", // Allows all image transformations and subfolder paths seamlessly
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
  
  experimental: {
    serverActions: {
      bodySizeLimit: "50mb",
    },
  },
};

export default nextConfig;

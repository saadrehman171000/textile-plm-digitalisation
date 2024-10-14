/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
      domains: ['i.imgur.com', 'images.unsplash.com'], // Add necessary domains here
  },
  experimental: {
      instrumentationHook: true,  // Opt-in to the experimental instrumentation hook
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'i.pravatar.cc' },
      { protocol: 'https', hostname: 'picsum.photos' },
    ],
  },
  // disable swc minify or experimental barrel optimization
  experimental: {
    optimizePackageImports: [],
    serverComponentsExternalPackages: ['sequelize', 'mysql2'],
  }
};
export default nextConfig;

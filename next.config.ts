import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  turbopack: {
    root: __dirname, // 현재 디렉토리 root 설정
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'picsum.photos', pathname: '/**' },
      { protocol: 'https', hostname: 'fastly.picsum.photos', pathname: '/**' },
    ]
  },
};

export default nextConfig;

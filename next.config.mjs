/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
      remotePatterns: [
          {
              protocol: 'https',
              hostname: 'files.edgestore.dev',
              port: '',
              pathname: '/**',
          },
          {
              protocol: 'https',
              hostname: 'images.unsplash.com',
              port: '',
              pathname: '/**',
          },
          {
              protocol: 'https',
              hostname: 'apod.nasa.gov',
              port: '',
              pathname: '/**',
          },
          {
              protocol: 'http',
              hostname: 'mars.jpl.nasa.gov',
              port: '',
              pathname: '/msl-raw-images/**',
          },
      ],
  },
};

export default nextConfig;

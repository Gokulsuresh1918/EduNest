/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['files.edgestore.dev', 'images.unsplash.com','apod.nasa.gov','mars.jpl.nasa.gov'], 
        eslint: {
            ignoreDuringBuilds:true,
        }
    },
};

export default nextConfig;

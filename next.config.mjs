/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        formats: ['image/webp','image/avif'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                pathname: '/dqggb6cgz/image/upload/**'
            }
        ]
    },
    experimental: {
        serverComponentsExternalPackages: ['argon2', 'nodemailer']
    }
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'pbxt.replicate.delivery',
                port: '',
            }, {
                protocol: 'https',
                hostname: 'i.imgur.com',
                port: '',
            },
        ]
    }
}

module.exports = nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['images.unsplash.com',
        'hebbkx1anhila5yf.public.blob.vercel-storage.com',
      ],
      
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
  };
  
export default nextConfig;
  

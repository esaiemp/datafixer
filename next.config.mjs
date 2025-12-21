/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
   output: 'export',        // <-- enable static HTML export
  trailingSlash: true,  
}

export default nextConfig

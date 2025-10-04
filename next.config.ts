/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: false,
    dirs: ['src/app', 'src/components', 'src/lib'],
  },
  // Add this to ignore specific directories
  
}

module.exports = nextConfig
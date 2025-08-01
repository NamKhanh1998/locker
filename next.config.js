module.exports = {
  transpilePackages: ['react-tweet', '@7kprotocol/sdk-ts'],
  images: {
    domains: [],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    dangerouslyAllowSVG: true, // Allow rendering SVGs
    // contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;", // Add CSP for security
  },
  env: {
    NEXT_PUBLIC_NEXT_API: process.env.NEXT_PUBLIC_NEXT_API,
  },
  compiler: {
    styledComponents: true,
  },
}

import { DefaultSeoProps } from 'next-seo'

export const SEO: DefaultSeoProps = {
  title: 'Bubbo',
  titleTemplate: '%s | Crypto Bubbles & Market Trends on SUI',
  defaultTitle: 'BUBO - Real-time Crypto Bubbles & Market Trends on SUI',
  description:
    'BUBO - Crypto Heatmap & Crypto Bubbles Track real-time crypto trends on the SUI network with dynamic visualizations.',
  twitter: {
    cardType: 'summary_large_image',
    handle: '@bubbofun',
    site: '@bubbofun',
  },
  canonical: 'https://bubbo.fun/',
  openGraph: {
    url: 'https://bubbo.fun/',

    type: 'website',
    title: 'BUBO - Crypto Bubbles & Crypto Heatmap & Market Trends on SUI',
    description:
      'BUBO - Crypto Heatmap & Crypto Bubbles Track real-time crypto trends on the SUI network with dynamic visualizations.',
    images: [
      {
        url: 'https://bubbo.vercel.app/intro.png',
        alt: 'Bubbo - Crypto Bubbles on SUI',
        type: 'image/png',
        width: 1200,
        height: 630,
      },
    ],

    siteName: 'Bubbo',
    locale: 'en_US',
  },
}

export const PAGE_SEO = {
  about: {
    title: 'Bubbo',
    titleTemplate: '%s | Crypto Tracking & Market Trends on SUI',
    description:
      'BUBO - Crypto Heatmap & Crypto Bubbles Track real-time crypto trends on the SUI network with dynamic visualizations.',
  },
  heatmap: {
    title: 'Heatmap',
    titleTemplate: '%s | Crypto Heatmap & Market Trends on SUI',
    description:
      'BUBO - Crypto Heatmap & Crypto Bubbles Track real-time crypto trends on the SUI network with dynamic visualizations.',
  },
  swap: {
    title: 'Swap',
    titleTemplate: '%s | Bubo Swap',
    description: `Swap tokens instantly with the best rates and top-tier security on Bubo Swap.
By using an advanced aggregator to integrate liquidity from top DEXs on the SUI network, Bubo ensures you always get optimized rates — faster, smoother, and more cost-efficient.`,
  },
  send: {
    title: 'Send',
    titleTemplate: '%s | Bubo Send',
    description: `Swap tokens instantly with the best rates and top-tier security on Bubo Swap.
By using an advanced aggregator to integrate liquidity from top DEXs on the SUI network, Bubo ensures you always get optimized rates — faster, smoother, and more cost-efficient.`,
  },

  gallery: {
    title: 'Gallery',
    titleTemplate: '%s | Bubo Gallery',
    description:
      'A visual journey through the moments of BUBO and its vibrant community.',
  },
  radar: {
    title: 'Radar',
    titleTemplate: '%s | Bubo Radar',
    description:
      'Compare volume and performance. Filter by category or chain to quickly spot promising tokens.',
  },
  capof: {
    title: 'CapOf',
    titleTemplate: '%s | Bubo CapOf',
    description:
      'The "Market Cap of" feature lets users compare the market caps of tokens, providing insights into their value and growth potential.',
  },
  holdersMap: {
    title: 'Holders Map',
    titleTemplate: '%s | Bubo Holders Map',
    description:
      'The "Holders Map" feature visualizes token holder distribution through interactive bubbles, helping users identify wallet clusters, whale activities, and token dynamics at a glance.',
  },
  multisend: {
    title: 'Multisend',
    titleTemplate: '%s | Bubo Multisend',
    description:
      'The "Multisend" feature allows users to send tokens to multiple addresses in one transaction, saving time and gas fees.',
  },
}

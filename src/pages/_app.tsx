import { AppPropsWithLayout } from '@/models'
import { MainLayout } from '@/components/layout'
import { DefaultSeo } from 'next-seo'
import { dynaPuff, inter } from '@/fonts'
import '@/styles/globals.css'
import { SEO } from '../../next-seo.config'
import { ToastContainer } from 'react-toastify'
import { themes } from '@/config'
import {
  createNetworkConfig,
  SuiClientProvider,
  WalletProvider,
} from '@mysten/dapp-kit'
import { getFullnodeUrl } from '@mysten/sui/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '@mysten/dapp-kit/dist/index.css'
import 'aos/dist/aos.css'
import 'tippy.js/dist/tippy.css'
import AOS from 'aos'
import { useEffect } from 'react'
import { GoogleAnalytics } from '@next/third-parties/google'
import { useFetchUserBalances } from '@/components/Swap/hooks/useFetchUserBalances'
import { darkTheme } from '@/styles/style'
import { useFetchTrendingPools } from '@/components/Swap/hooks/useFetchTrendingPools'

const { networkConfig } = createNetworkConfig({
  localnet: { url: getFullnodeUrl('localnet') },
  mainnet: { url: getFullnodeUrl('mainnet') },
})
const queryClient = new QueryClient()

const GlobalHooks = () => {
  useFetchUserBalances()
  useFetchTrendingPools()

  return null
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component?.Layout || MainLayout

  useEffect(() => {
    AOS.init({
      duration: 1000,
    })
  }, [])

  return (
    <main className={dynaPuff.className}>
      <style
        jsx
        global
      >{`
        html {
          background-color: ${themes.backgroundColor};
        }
        body {
          font-family: ${dynaPuff.style.fontFamily};
        }
      `}</style>
      <DefaultSeo {...SEO} />
      <GoogleAnalytics gaId="G-6R4HR23Z32" />
      <QueryClientProvider client={queryClient}>
        <SuiClientProvider
          networks={networkConfig}
          defaultNetwork="localnet"
        >
          <WalletProvider
            autoConnect
            theme={darkTheme}
          >
            <Layout>
              <ToastContainer theme="dark" />
              <GlobalHooks />
              <Component {...pageProps} />
            </Layout>
          </WalletProvider>
        </SuiClientProvider>
      </QueryClientProvider>
    </main>
  )
}

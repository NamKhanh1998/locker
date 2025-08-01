import axios from 'axios'

const getMarketInfo = async () => {
  const btcTrend = await axios.get(
    'https://cdi-website-three.vercel.app/indices/api/v1/trend-indicator?symbol=xbx&history=false'
  )

  const fearAndGreedIndex = await axios.get('https://api.alternative.me/fng/')

  return {
    btcTrend: btcTrend?.data,
    fearAndGreedIndex: fearAndGreedIndex?.data,
  }
}

const marketInfoService = {
  getMarketInfo,
}

export default marketInfoService

import { useQuery } from '@tanstack/react-query'
import { getCoinsMeta } from './useFetchTokensMeta'
import { isSuiTokenType } from '../utils'
import { atom, useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { useCallback } from 'react'
import { ICurrency } from '../state'
import { uniqBy } from 'lodash'

export const importedTokensAtom = atomWithStorage<ICurrency[]>(
  'users_import_tokens',
  []
)

const getTokenDetail = async (address: string) => {
  const res = await getCoinsMeta(address)

  return {
    coingeckoId: '',
    symbol: res?.symbol || '',
    name: res?.name || '',
    address,
    pairAddress: '',
    website: '',
    twitter: '',
    telegram: '',
    decimals: res?.decimals,
    logoUrl: res?.iconUrl,
    import: true,
  }
}

export const useManageImportToken = (
  address: string,
  enabled: boolean = false
) => {
  const [tokens, setTokens] = useAtom(importedTokensAtom)

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['coinMeta', address],
    queryFn: () => getTokenDetail(address),
    enabled: isSuiTokenType(address) && enabled,
    staleTime: 600 * 1000,
    retry: 3,
  })

  return {
    fetchedToken: data,

    tokens,
  }
}

export const useTokensImport = () => {
  const [tokens, setTokens] = useAtom(importedTokensAtom)

  const onImportToken = useCallback((token: ICurrency) => {
    setTokens((p) => uniqBy([...p, token], 'address'))
  }, [])

  const onRemoveToken = useCallback((token: ICurrency) => {
    setTokens((p) => {
      const newData = [...p]?.filter(
        (_) => _?.address?.toLowerCase() !== token?.address?.toLowerCase()
      )

      return newData
    })
  }, [])

  return {
    tokens,
    onImportToken,
    onRemoveToken,
  }
}

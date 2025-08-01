import { useMemo } from 'react'
import { SwapTokensList } from '../config/swapList'
import { useTokensImport } from './useManageImportToken'
import { uniqBy } from 'lodash'

export const useCombineTokenList = () => {
  const { tokens: importedTokens } = useTokensImport()

  const swapList = useMemo(() => {
    return uniqBy([...SwapTokensList, ...importedTokens], 'address')
  }, [SwapTokensList, importedTokens])

  return swapList
}

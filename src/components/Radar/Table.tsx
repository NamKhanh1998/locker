import { poppins } from '@/fonts'
import useDebounce from '@/hooks/useDebounce'
import { orderBy } from 'lodash'
import { useMemo, useState } from 'react'
import styled from 'styled-components'
import { CoingeckoCoinData } from '../Bubbles/data.type'
import { useFetchAndManageCoins } from '../Bubbles/hooks/useFetchCoins'
import Flex from '../commonStyled/Flex'
import { NarrativeType } from '../Heatmap/type'
import { filterTokens } from '../Swap/utils'
import RadarOptions from './RadarOptions'
import TableContent from './TableContent'
import { initOptions, IOptions } from './type'
import TokenModal from '../TokenModal'
import { useManageOptions } from '../Bubbles/hooks/useManageOptions'
import { Chain } from '../Bubbles/bubbles.types'
import { devices } from '@/config'
import LogoLoading from '../Loading/LoadingLogo'

const TableWrap = styled(Flex)`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  height: 100%;

  flex-direction: column;
  &::-webkit-scrollbar {
    display: none;
  }
  background: center center / cover rgba(23, 37, 52, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.2);
  max-width: calc(100vw - 20px);
  border-radius: 8px;

  @media ${devices.mobileM} {
    max-width: calc(100vw - 30px);
  }
`

const Table = () => {
  const [options, setOptions] = useState<IOptions>(initOptions)
  const [search, setSearch] = useState<string>('')

  const {
    options: { chain },
  } = useManageOptions()

  const { fullData, isLoading } = useFetchAndManageCoins()

  const debounceQuery = useDebounce(search, 300)

  const filteredData = useMemo(() => {
    if (!fullData) return []

    let data = fullData

    if (options.narrative && chain === Chain.SUI) {
      data = fullData?.filter((token: CoingeckoCoinData) => {
        if (options.narrative === NarrativeType.NEW) {
          return token?.new
        } else {
          return token?.narratives?.includes(options.narrative!)
        }
      })
    }

    if (debounceQuery) {
      data = filterTokens(data, debounceQuery)
    }

    if (options.sortBy) {
      data = orderBy(
        data,
        (_) => _?.[options.sortBy!] || 0,
        options.sortDirection!
      )
    } else {
      data = orderBy(data, (_) => _?.marketCap || 0, 'desc')
    }

    return data
  }, [fullData, options, debounceQuery, chain])

  return (
    <>
      <TableWrap
        className={poppins.className}
        suppressHydrationWarning
      >
        <RadarOptions
          options={options}
          setOptions={setOptions}
          searchValue={search}
          setSearchValue={setSearch}
        />
        {isLoading ? (
          <LogoLoading />
        ) : (
          <TableContent
            data={filteredData!}
            options={options}
            setOptions={setOptions}
            isLoading={isLoading}
          />
        )}
      </TableWrap>
      <TokenModal />
    </>
  )
}

export default Table

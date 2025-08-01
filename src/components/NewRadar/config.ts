export const ColWidth = {
  name: 160,
  price: 100,
  change: 80,
  volume: 120,
  mkc: 120,
  liquidity: 100,
  age: 100,
  top10: 100,
  devHold: 100,
  quickBuy: 110,
}

export const ColAlign = {
  name: 'left',
  price: 'right',
  change: 'right',
  volume: 'right',
  mkc: 'right',
  liquidity: 'right',
  age: 'right',
  top10: 'right',
  devHold: 'right',
  quickBuy: 'right',
}

export const HeadersItem = [
  {
    name: 'Name',
    isFirst: true,
    width: ColWidth.name,
    align: ColAlign.name,
    pl: 0,
    pr: 0,
  },
  {
    name: 'Price',
    width: ColWidth.price,
    align: ColAlign.price,
    pl: 0,
    pr: 0,
  },
  {
    name: '1H',
    width: ColWidth.change,
    pl: 0,
    pr: 0,
  },
  {
    name: '6H',
    width: ColWidth.change,
    pl: 0,
    pr: 0,
  },
  {
    name: '24H',
    width: ColWidth.change,
    pl: 0,
    pr: 0,
  },
  {
    name: '6h Volume',
    width: ColWidth.volume,
    pl: 0,
    pr: 0,
  },
  {
    name: '24h Volume',
    width: ColWidth.volume,
    pl: 0,
    pr: 0,
  },
  {
    name: 'Market cap',
    width: ColWidth.mkc,
    pl: 0,
    pr: 0,
  },
  {
    name: 'Liquidity',
    width: ColWidth.liquidity,
    pl: 0,
    pr: 0,
  },
  {
    name: 'Age',
    width: ColWidth.age,
    pl: 0,
    pr: 0,
  },
  {
    name: 'Top 10',
    width: ColWidth.top10,
    pl: 0,
    pr: 0,
  },
  {
    name: 'Dev Hold',
    width: ColWidth.devHold,
    pl: 0,
    pr: 0,
  },
  {
    name: 'Quick Buy',
    width: ColWidth.quickBuy,
    pl: 0,
    pr: 0,
  },
]

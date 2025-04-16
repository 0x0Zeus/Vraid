export interface marketData {
  net: string
  title: string
  volume: number
  prices: price[]
}

interface price {
  outcome: number
  chance: number
  yes: number
  no: number
}
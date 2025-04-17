export interface marketData {
  net: string
  title: string
  volume: number
  prices: price[]
}

export interface eventData {
  slug: string;
  title: string;
  icon: string;
  des: string;
  volume: number;
  buy: price[];
  sell: price[];
  chart: {
    name: string
    uv: number
    pv: number
    amt: number
  }[];
}

export interface price {
  outcome: number
  chance: number
  yes: number
  no: number
}

export interface EventContextType {
  event: eventData | undefined;
  setEvent: (data: eventData | undefined) => void;
}

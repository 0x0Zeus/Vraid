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
  chosenIndex: ChosenDataType;
  market: 'sell' | 'buy';
  setEvent: (data: eventData | undefined) => void;
  setChosenIndex: (data: ChosenDataType) => void;
  setMarket: (data: 'sell' | 'buy') => void;
}

export interface ChosenDataType {
  type: 'yes' | 'no' | null;
  num: number
}

export interface OrderType {
  tradeYes: string,
  price: number,
  shares: number,
  total: number
}

export interface AuthContextType {
  user: User;
  setUser: (user: User) => void;
  logout: () => void;
}

export interface User {
  email: string;
  username: string;
  logined: boolean;
}
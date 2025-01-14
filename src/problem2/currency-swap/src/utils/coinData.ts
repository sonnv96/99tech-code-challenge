import INCHIcon from "../assets/tokens/1INCH.svg";
import AAVEIcon from "../assets/tokens/AAVE.svg";
import BTCIcon from "../assets/tokens/BTC.svg";
import ETHIcon from "../assets/tokens/ETH.svg";

export type CoinDataType = {
  code: string;
  id: string;
  name: string;
  icon: string;
};
export const coinDataInitial: CoinDataType = {
  code: "",
  id: "",
  name: "",
  icon: "",
};

const coinData: CoinDataType[] = [
  {
    code: "1INCH",
    id: "1inch",
    name: "1INCH",
    icon: INCHIcon,
  },
  {
    code: "AAVE",
    id: "aave",
    name: "AAVE",
    icon: AAVEIcon,
  },
  {
    code: "BTC",
    id: "bitcoin",
    name: "BTC",
    icon: BTCIcon,
  },
  {
    code: "ETH",
    id: "ethereum",
    name: "ETH",
    icon: ETHIcon,
  },
];

export default coinData;

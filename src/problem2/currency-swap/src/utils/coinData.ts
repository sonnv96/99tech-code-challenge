import INCHIcon from "../assets/tokens/1INCH.svg";
import AAVEIcon from "../assets/tokens/AAVE.svg";
import BTCIcon from "../assets/tokens/BTC.svg";
import ETHIcon from "../assets/tokens/ETH.svg";
import ACTIcon from "../assets/tokens/ACT.svg";
import NEARIcon from "../assets/tokens/NEAR.svg";
import UsdIcon from "../assets/tokens/USD.svg";
import ZENIcon from "../assets/tokens/ZEN.svg";

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
  {
    code: "ACT",
    id: "act",
    name: "ACT",
    icon: ACTIcon,
  },
  {
    code: "NEAR",
    id: "near",
    name: "Near",
    icon: NEARIcon,
  },
  {
    code: "NEAR",
    id: "near",
    name: "Near",
    icon: NEARIcon,
  },
  {
    code: "USD",
    id: "usd",
    name: "Usd",
    icon: UsdIcon,
  },
  {
    code: "ZEN",
    id: "zen",
    name: "Zen",
    icon: ZENIcon,
  },
];

export default coinData;

import { useEffect, useState } from "react";
import "./App.css";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import coinData, { coinDataInitial, CoinDataType } from "./utils/coinData";
import axios from "axios";
import {
  handleInputNumber,
  isNumberOrDecimal,
} from "./utils/handleInputNumber";
import useDebounce from "./hooks/useDebounce";
import { getCurrentTime } from "./utils/getCurrentTime";
import exchangeIcon from "./assets/exchange.svg";

function App() {
  const [coinSelected, setCoinSelected] =
    useState<CoinDataType>(coinDataInitial);
  const [amount, setAmount] = useState<string | number>(0);
  const [amountResult, setAmountResult] = useState<number>(0);
  const [coinSwapSelected, setCoinSwapSelected] =
    useState<CoinDataType>(coinDataInitial);
  useEffect(() => {
    console.log(coinSelected);
  }, [coinSelected]);

  const debouncedSwap = useDebounce(amount, 400);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/simple/price?ids=${coinSelected.id},${coinSwapSelected.id}&vs_currencies=usd`
        );
        const fromCoinPriceInUsd = response.data[coinSelected.id].usd;
        const toCoinPriceInUsd = response.data[coinSwapSelected.id].usd;
        const conversionRate = fromCoinPriceInUsd / toCoinPriceInUsd;
        setAmountResult(Number(debouncedSwap) * conversionRate);
      } catch (err) {
        console.log(err);
      }
    };
    if (
      isNumberOrDecimal(debouncedSwap?.toString()) &&
      Number(debouncedSwap) > 0 &&
      coinSelected.id &&
      coinSwapSelected.id
    ) {
      fetchData();
    }
  }, [debouncedSwap, coinSelected.id, coinSwapSelected.id]);
  return (
    <>
      <h1 className="!font-bold">SWAP CURRENCY</h1>
      <div className="border border-black rounded-2xl mo:w-[375px] tablet:w-full p-6 mt-10 m-auto">
        <div className="tablet:flex items-center gap-3 mo:grid">
          <div className="text-left">
            <Label htmlFor="terms">Enter amount</Label>
            <Input
              maxLength={9}
              value={amount}
              onChange={(e) => {
                console.log(e.target.value);
                setAmount(handleInputNumber(e.target.value));
              }}
              type="amount"
              placeholder="Enter amount"
            />
          </div>
          <div className="text-left">
            <Label className="text-left mb-3" htmlFor="terms">
              Select coin
            </Label>
            <Select
              onValueChange={(value) =>
                setCoinSelected(
                  coinData.find((cd) => cd.id === value) ?? coinDataInitial
                )
              }
            >
              <SelectTrigger className="w-full min-w-[180px]">
                <SelectValue placeholder="Choose coin" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {/* <SelectLabel>Fruits</SelectLabel> */}
                  {coinData.map((cd) => (
                    <SelectItem key={cd.id} value={cd.id}>
                      <div className="!flex !items-center gap-3">
                        <div>
                          <img src={cd.icon} />
                        </div>
                        <div>{cd.name}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="w-5 h-5 tablet:pt-[33px] m-auto mt-3 tablet:mt-0">
            <img src={exchangeIcon} className="rotate-90 tablet:rotate-0" />
          </div>
          <div className="text-left">
            <Label className="text-left mb-3" htmlFor="terms">
              Select currency
            </Label>{" "}
            <Select
              onValueChange={(value) =>
                setCoinSwapSelected(
                  coinData.find((cd) => cd.id === value) ?? coinDataInitial
                )
              }
            >
              <SelectTrigger className="w-full min-w-[180px]">
                <SelectValue placeholder="Choose currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {coinData.map((cd) => (
                    <SelectItem key={cd.id} value={cd.id}>
                      <div className="!flex !items-center gap-3">
                        <div>
                          <img src={cd.icon} />
                        </div>
                        <div>{cd.name}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        {isNumberOrDecimal(amount?.toString()) &&
          Number(amount) > 0 &&
          coinSelected.id &&
          coinSwapSelected.id && (
            <>
              <div className="flex items-center gap-2 mt-6 tablet:text-[24px] font-bold justify-center flex-wrap">
                <span>{Number(amount)?.toFixed(6)}</span>
                <img src={coinSelected?.icon} />{" "}
                <span className="break-words">=</span>
                <span>{amountResult?.toFixed(6)}</span>
                <img src={coinSwapSelected?.icon} />
              </div>
              <div className="mt-2 text-gray-500 font-semibold tablet:text-[16px] mo:text-[12px]">
                {getCurrentTime()}
              </div>
            </>
          )}
      </div>
    </>
  );
}

export default App;

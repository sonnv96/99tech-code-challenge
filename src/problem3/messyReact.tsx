import { v4 as uuidv4 } from "uuid";

// INITIAL CODE
interface WalletBalance {
  currency: string;
  amount: number;
}
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}

interface Props extends BoxProps {}
const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  const getPriority = (blockchain: any): number => {
    switch (blockchain) {
      case "Osmosis":
        return 100;
      case "Ethereum":
        return 50;
      case "Arbitrum":
        return 30;
      case "Zilliqa":
        return 20;
      case "Neo":
        return 20;
      default:
        return -99;
    }
  };

  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain);
        if (lhsPriority > -99) {
          if (balance.amount <= 0) {
            return true;
          }
        }
        return false;
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);
        if (leftPriority > rightPriority) {
          return -1;
        } else if (rightPriority > leftPriority) {
          return 1;
        }
      });
  }, [balances, prices]);

  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed(),
    };
  });

  const rows = sortedBalances.map(
    (balance: FormattedWalletBalance, index: number) => {
      const usdValue = prices[balance.currency] * balance.amount;
      return (
        <WalletRow
          className={classes.row}
          key={index}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      );
    }
  );

  return <div {...rest}>{rows}</div>;
};

// END INITIAL CODE

// -------------------------------------------------------------------------------------------------------------- /

// NEW CODE IMPROVED
interface WalletBalance {
  currency: string;
  amount: number;
}

// interface should inherit (Number 1 in contributing)
interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

interface WalletBalanceCustomData extends FormattedWalletBalance {
  id: string;
  priority?: number;
}

// removed (Number 2 in contributing)
// interface Props extends BoxProps {}
const WalletPage: React.FC<BoxProps> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  const getPriority = (blockchain: any): number => {
    switch (blockchain) {
      case "Osmosis":
        return 100;
      case "Ethereum":
        return 50;
      case "Arbitrum":
        return 30;
      case "Zilliqa":
        return 20;
      case "Neo":
        return 20;
      default:
        return -99;
    }
  };

  // (Number 5 in contributing)
  const sortedBalances = useMemo(() => {
    return balances
      .reduce((acc: WalletBalanceCustomData[], balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain);
        if (lhsPriority > -99 && balance.amount <= 0) {
          acc.push({
            ...balance,
            formatted: balance.amount.toFixed(),
            priority: balancePriority,
            id: uuidv4(),
          });
        }

        return acc;
      }, [])
      .sort((lhs, rhs) => {
        if (lhs.priority > rhs.priority) {
          return -1;
        } else if (rhs.priority > lhs.priority) {
          return 1;
        }
        return 0;
      })
      .map(({ priority, ...balance }) => balance);
    // (Number 3 in contributing)
  }, [balances]);

  // removed (Number 4 in contributing)
  // const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
  //   return {
  //     ...balance,
  //     formatted: balance.amount.toFixed(),
  //   };
  // });

  const rows = sortedBalances.map((balance: WalletBalanceCustomData) => {
    const usdValue = prices[balance.currency] * balance.amount;
    return (
      <WalletRow
        className={classes.row}
        // (Number 6 in contributing)
        key={balance.id}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
    );
  });

  return <div {...rest}>{rows}</div>;
};

// END NEW CODE

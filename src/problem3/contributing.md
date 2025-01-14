
# explain

1. Can inherit from interface instead of creating a new interface

2. Props inherits from BoxProps but Props does not have any new properties, it is not necessary, BoxProps can be used directly

3. Dependency in useMemo has redundant prices, because the array processing has nothing to do with prices, so it is not necessary to remove prices in the dependency, this makes sortedBalances run again unnecessarily

4. Re-mapping data and assigning to formattedBalances will not make any sense because the formattedBalances variable is not used later, but only uses sortedBalances

5. I have improved the useMemo sortedBalances function to optimize:

- Iterate through the array once instead of three times

- Reduce the number of times to calculate getPriority

6. Do not use the index key, here I used uuid instead, because WalletBlance does not have an id field
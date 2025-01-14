import { useEffect, useState } from 'react';

const useDebounce = <T = object>(val: T, ms = 500) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(val);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(val);
    }, ms);
    return () => {
      clearTimeout(handler);
    };
  }, [val, ms]);
  return debouncedValue;
};

export default useDebounce;

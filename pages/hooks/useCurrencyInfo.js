//   https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json
// https://v6.exchangerate-api.com/v6/59d560835c4e8d4f996adc83/latest/USD  - log rocket
// https://open.er-api.com/v6/latest/INR
import { useAmp } from "next/amp";
import { useState, useEffect } from "react";

const useCurrencyInfo = (currency) => {
  const [data, setData] = useState({});
  useEffect(() => {
    (async () => {
      const response = await (await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currency}.json`)).json();
      setData(response[currency]);
    })();
    // console.log(data);
  }, []);
  // console.log(data);
  return data;
};

export default useCurrencyInfo;

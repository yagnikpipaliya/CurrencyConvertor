// https://blog.logrocket.com/build-dynamic-currency-converter-ecommerce-react-app/
import { useState, useEffect } from "react";
import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [amount1, setAmount1] = useState("");
  const [amount2, setAmount2] = useState("");
  const [fromCurrency, setFromCurrency] = useState("inr");
  const [toCurrency, setToCurrency] = useState("USD");
  const [rates, setRates] = useState();
  const [ratesFetched, setRatesFetched] = useState(false);

  const getRates = async () => {
    // fetch the data from API
    const response = await (await fetch(`https://v6.exchangerate-api.com/v6/59d560835c4e8d4f996adc83/latest/inr`)).json();
    // save the rates in the state
    console.log(response.conversion_rates)
    if (response.result === "success") {
      setRates(response.conversion_rates);
      setAmount1(response.conversion_rates.INR)
      setAmount2(response.conversion_rates.USD)
      setRatesFetched(true);
    }
  };

  useEffect(() => {
    getRates();
  }, []);

  useEffect(() => {
    // const calculateOutput = 
    (async () => {
      // fetch the selected from currency rates
      const response = await(await fetch(`https://v6.exchangerate-api.com/v6/59d560835c4e8d4f996adc83/latest/${fromCurrency}`)).json();
      const fetchedRates = response.conversion_rates;
      const CurrencyRate = fetchedRates[toCurrency];
      console.log(CurrencyRate)
      const output = amount1 * CurrencyRate;
      setAmount2(output);
    })();
  }, [amount1,fromCurrency,toCurrency]);

  // useEffect(() => {
  //   // const calculateOutput = 
  //   (async () => {
  //     // fetch the selected from currency rates
  //     const response = await(await fetch(`https://v6.exchangerate-api.com/v6/59d560835c4e8d4f996adc83/latest/${fromCurrency}`)).json();
  //     const fetchedRates = response.conversion_rates;
  //     const CurrencyRate = fetchedRates[fromCurrency];
  //     const output = amount1 * CurrencyRate;
  //     setAmount1(output);
  //   })();
  // }, [amount2,fromCurrency,toCurrency]);

  const handleInputChange1 = async (e) => {
    // const [data, setData] = useState({});
    // useEffect(() => {
    //   (async () => {
    //     const response = await (await fetch(`https://v6.exchangerate-api.com/v6/59d560835c4e8d4f996adc83/latest/${currency1}`)).json();
    //     setData(response[currency]);
    //   })();
    // }, [amount1])

    const value = e.target.value;
    setAmount1(value);
    const response = await(await fetch(`https://v6.exchangerate-api.com/v6/59d560835c4e8d4f996adc83/latest/${fromCurrency}`)).json();
      const fetchedRates = response.conversion_rates;
      const CurrencyRate = fetchedRates[toCurrency];
      const output = amount1 * CurrencyRate;
      setAmount2(output);
    // setAmount2(value*2);
    
  };

  const handleInputChange2 = (e) => {
    const value = e.target.value;
    setAmount1(value * 2);
    setAmount2(value);
  };
  return (
    <div className="text-black">
      <label className="text-white">
        Input 1:
        <input className="text-black" type="number" value={amount1} onChange={handleInputChange1} />
      </label>
      <select id="from" value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
        {ratesFetched ? (
          Object.keys(rates).map((currency, index) => (
            <option key={index} value={currency}>
              {currency}
            </option>
          ))
        ) : (
          <option defaultValue>INR</option>
        )}
      </select>

      <label className="text-white">
        Input 2:
        <input className="text-black" type="number" value={amount2} onChange={handleInputChange2} />
      </label>
      <select id="to" value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
        {ratesFetched ? (
          Object.keys(rates).map((currency, index) => (
            <option key={index} value={currency}>
              {currency}
            </option>
          ))
        ) : (
          <option defaultValue>USD</option>
        )}
      </select>
    </div>
    // <main
    //   className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    // >
    //   <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
    //     <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
    //       Get started by editing&nbsp;
    //       <code className="font-mono font-bold">src/pages/index.js</code>
    //     </p>
    //     <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
    //       <a
    //         className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
    //         href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         By{' '}
    //         <Image
    //           src="/vercel.svg"
    //           alt="Vercel Logo"
    //           className="dark:invert"
    //           width={100}
    //           height={24}
    //           priority
    //         />
    //       </a>
    //     </div>
    //   </div>

    //   <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40 before:lg:h-[360px]">
    //     <Image
    //       className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
    //       src="/next.svg"
    //       alt="Next.js Logo"
    //       width={180}
    //       height={37}
    //       priority
    //     />
    //   </div>

    //   <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
    //     <a
    //       href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
    //       className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <h2 className={`mb-3 text-2xl font-semibold`}>
    //         Docs{' '}
    //         <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
    //           -&gt;
    //         </span>
    //       </h2>
    //       <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
    //         Find in-depth information about Next.js features and API.
    //       </p>
    //     </a>

    //     <a
    //       href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
    //       className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <h2 className={`mb-3 text-2xl font-semibold`}>
    //         Learn{' '}
    //         <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
    //           -&gt;
    //         </span>
    //       </h2>
    //       <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
    //         Learn about Next.js in an interactive course with&nbsp;quizzes!
    //       </p>
    //     </a>

    //     <a
    //       href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
    //       className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <h2 className={`mb-3 text-2xl font-semibold`}>
    //         Templates{' '}
    //         <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
    //           -&gt;
    //         </span>
    //       </h2>
    //       <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
    //         Discover and deploy boilerplate example Next.js&nbsp;projects.
    //       </p>
    //     </a>

    //     <a
    //       href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
    //       className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <h2 className={`mb-3 text-2xl font-semibold`}>
    //         Deploy{' '}
    //         <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
    //           -&gt;
    //         </span>
    //       </h2>
    //       <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
    //         Instantly deploy your Next.js site to a shareable URL with Vercel.
    //       </p>
    //     </a>
    //   </div>
    // </main>
  );
}

// https://blog.logrocket.com/build-dynamic-currency-converter-ecommerce-react-app/
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Inter } from "next/font/google";
import axios from "axios";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [amount1, setAmount1] = useState(0);
  const [amount2, setAmount2] = useState(0);
  const [currency1, setCurrency1] = useState("inr");
  const [currency2, setCurrency2] = useState("usd");
  const [exchangeRates, setExchangeRates] = useState(null);
  const [date, setDate] = useState("");
  const d = new Date();
  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        setExchangeRates(null);
        const response = await axios.get(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency1}.json`);
        setExchangeRates(response.data[currency1]);
        setDate(`${d.getDate() + " " + d.toLocaleString("default", { month: "short" }) + ", " + d.toLocaleString([], { hour: "2-digit", minute: "2-digit" })}`);
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
      }
    };
    fetchExchangeRates();
  }, [currency1]); // currency2

  const handleAmount1Change = (e) => {
    const value = e.target.value;
    setAmount1(value);
    setAmount2((parseFloat(value) * exchangeRates[currency2]).toFixed(2));
  };

  const handleAmount2Change = (e) => {
    const value = e.target.value;
    setAmount2(value);
    setAmount1((parseFloat(value) / exchangeRates[currency2]).toFixed(2));
  };

  const handleCurrency1Change = (e) => {
    const selectedCurrency = e.target.value;
    setCurrency1(e.target.value);
    setAmount1(0);
    setAmount2(0);
  };

  const handleCurrency2Change = (e) => {
    const selectedCurrency = e.target.value;
    setCurrency2(selectedCurrency);
    setAmount2((parseFloat(amount1) * exchangeRates[selectedCurrency]).toFixed(2));
  };

  const blockInvalidChar = (e) =>
    ["+", "-", "*", "/", "=", "&", "^", "%", "$", "₹", "#", "@", "!", "~", "`", '"', "?", "<", ">", ":", ";", "[", "]", "{", "}", "|", "_", "(", ")"].includes(e.key) &&
    e.preventDefault();

  return (
    <>
      <div className="flex h-screen text-white items-center justify-center">
        <div className=" m-auto px-4 py-8 justify-center max-w-sm w-full">
          {exchangeRates && <div className="flex items-center font-sans text-2xl h-7 text-[#9aa0a6]">1 {currency1.toUpperCase()} equals</div>}
          <div className="font-sans font-semibold text-4xl leading-[57px] color-[#e8eaed] ">
            {exchangeRates ? `${exchangeRates[currency2].toFixed(2)} ${currency2.toUpperCase()} ` : "Loading..."}
          </div>
          <div className="text-[#9aa0a6] text-lg mt-2 mb-5">{date} · Disclaimer</div>
          <div className="w-full relative flex justify-between pb-0 top-0">
            <div className="relative w-full block">
              <div className="p-1 caret-[#8ab4f8] border-[2px] border-solid border-[#5f6368] rounded-md color-[#9aa0a6] overflow-hidden flex mb-5 hover:border-[#8ab4f8] hover:border-[2px] ">
                <input
                  type="number"
                  value={amount1}
                  onChange={handleAmount1Change}
                  min={0}
                  step={1}
                  onKeyDown={blockInvalidChar}
                  className="w-[50%] outline-0 m-0 overflow-hidden text-left leading-6 py-1 pl-2 pr-3 bg-[#202124] text-xl h-12 text-[#bdc1c6] "
                />
                <div className="bg-[#202124] overflow-hidden relative h-12 inline-block grow-[2]">
                  <div className="border-l-[2px] solid border-[#3c4043] absolute top-2 bottom-2 z-[3]"></div>
                  <select
                    value={currency1}
                    onChange={handleCurrency1Change}
                    className="outline-0  z-[1] leading-10 h-12 w-full absolute text-white text-right ml-1 bg-[#202124] pr-3 appearance-none "
                  >
                    {exchangeRates &&
                      Object.keys(exchangeRates).map((currency) => (
                        <option key={currency} value={currency} className="focus:bg-black">
                          {currency.toUpperCase()}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
              <div className="p-1 caret-[#8ab4f8] border-[2px] border-solid border-[#5f6368] rounded-md color-[#9aa0a6] overflow-hidden flex mb-3 hover:border-[#8ab4f8] hover:border-[2px]">
                <input
                  type="number"
                  value={amount2}
                  onChange={handleAmount2Change}
                  min={0}
                  step={1}
                  onKeyDown={blockInvalidChar}
                  className="w-[50%] outline-0 m-0 overflow-hidden text-left leading-6 py-1 pl-2 pr-3 bg-[#202124] text-xl h-12 text-[#bdc1c6] "
                />
                <div className="bg-[#202124] overflow-hidden relative h-12 inline-block grow-[2]">
                  <div className="border-l-[2px] solid border-[#3c4043] absolute top-2 bottom-2 z-[3]"></div>
                  <select
                    value={currency2}
                    onChange={handleCurrency2Change}
                    className="outline-0  z-[1] leading-10 h-12 w-full absolute text-white text-right ml-1 bg-[#202124] pr-3 appearance-none "
                  >
                    {exchangeRates &&
                      Object.keys(exchangeRates).map((currency) => (
                        <option key={currency} value={currency} className="">
                          {currency.toUpperCase()}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

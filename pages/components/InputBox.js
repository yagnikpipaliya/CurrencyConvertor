import React from "react";

const InputBox = ({
  label,
  amount,
  onAmountChange,
  onCurrencyChange,
  currencyKey = [],
  currencyOptions = [],
  currencyName = [],
  selectCurrency = "usd",
  amountDisable = false,
  className = "",
}) => {
//   console.log(currencyKey);
  return (
    <div className="rounded-md text-sm flex">
      <div className="w-1/2">
        <label htmlFor={label} className="text-black/40 mb-2 inline-block">
          {label}
        </label>
        <input
          type="number"
          className="outline-none w-full bg-transparent py-1.5"
          id={label}
          placeholder="Amount"
          value={amount}
          disabled={amountDisable}
          onChange={(e) => {
            onAmountChange && onAmountChange(Number(e.target.value));
          }}
        />
      </div>
      <div className="w-1/2 flex flex-wrap justify-end text-right">
        <p className="text-black/40 mb-2 w-full">Currency Type</p>
        <select
          className="text-black rounded-md px-1 py-1 bg-gray-100 cursor-pointer outline-none"
          value={selectCurrency}
          onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
          name=""
          id=""
        >
          {currencyOptions.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default InputBox;

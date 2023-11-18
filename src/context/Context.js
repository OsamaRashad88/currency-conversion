import React, { createContext, useEffect, useState } from "react";
export const currencyContext = createContext();

export function CurrencyContexttProvider(props) {
  const [amount, setAmount] = useState(1);
  const [currencyOne, setCurrencyOne] = useState("EUR");
  const [currencyTwo, setCurrencyTwo] = useState("USD");
  const [historicalRatesArray, setHistoricalRatesArray] = useState([]);
  const [lastDays, setLastDays] = useState([]);
  useEffect(() => {
    const getLastDayOfMonth = (year, month) => {
      return new Date(year, month + 1, 0).getDate();
    };

    const getLastDays = () => {
      const endDate = new Date(2023, 9, 30); // October 30, 2023
      const startDate = new Date(2022, 10, 1); // November 1, 2022

      const lastDaysArray = [];

      let currentDate = endDate;

      while (currentDate >= startDate) {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const lastDay = getLastDayOfMonth(year, month);

        const formattedDate = `${year}-${(month + 1)
          .toString()
          .padStart(2, "0")}-${lastDay.toString().padStart(2, "0")}`;
        lastDaysArray.push(formattedDate);

        // Move to the previous month
        currentDate.setMonth(month - 1, 1);
      }
      return lastDaysArray.reverse(); // Reverse the array to get the correct order
    };
    console.log(lastDays);

    setLastDays(getLastDays());
  }, [currencyOne, currencyTwo]);
  return (
    <currencyContext.Provider
      value={{
        amount,
        setAmount,
        currencyOne,
        setCurrencyOne,
        currencyTwo,
        setCurrencyTwo,
        historicalRatesArray,
        setHistoricalRatesArray,
        lastDays,
        setLastDays,
      }}
    >
      {props.children}
    </currencyContext.Provider>
  );
}

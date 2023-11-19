import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { currencyContext } from "../context/Context";
import MyChart from "./Charts";
import Charts from "./Charts";

interface DetailsProps {
  // Define any props if needed
}

const API_KEY = "69543df49080abd8fc2007d5a37e5120";

const Details: React.FC<DetailsProps> = () => {
  const {
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
  } = React.useContext(currencyContext);

  const [allCurrencies, setAllCurrencies] = useState<string[]>([]);
  const { from, to } = useParams<{ from: string; to: string }>();
  const [result, setResult] = useState<number | string>(0);
  const [currencyName, setCurrencyName] = useState<string>("");
  const [rate, setRate] = useState<number | undefined>();

  async function getCurrencyFullName() {
    let res = await axios.get<{ symbols: { [key: string]: string } }>(
      `http://data.fixer.io/api/symbols?access_key=${API_KEY}`
    );
    setCurrencyName(res.data.symbols[currencyOne]);
  }

  async function getAllcurrencies() {
    let { data } = await axios.get<{ rates: { [key: string]: number } }>(
      `http://data.fixer.io/api/latest?access_key=${API_KEY}`
    );
    setAllCurrencies(Object.keys(data.rates));
  }

  function updateRate() {
    // convert from euro
    if (currencyOne === "EUR") {
      axios
        .get<{ rates: { [key: string]: number } }>(
          `http://data.fixer.io/api/latest?access_key=${API_KEY}&base=${currencyOne}&symbols=${currencyTwo}`
        )
        .then((res) => {
          setRate(res.data.rates[currencyTwo]);
        });
    }

    if (currencyTwo === "EUR") {
      axios
        .get<{ rates: { [key: string]: number } }>(
          `http://data.fixer.io/api/latest?access_key=${API_KEY}&base=${currencyTwo}&symbols=${currencyOne}`
        )
        .then((res) => {
          setRate(res.data.rates[currencyOne]);
        });
    }
  }

  useEffect(() => {
    getCurrencyFullName();
  }, []);

  useEffect(() => {
    getAllcurrencies();
  }, []);

  useEffect(() => {
    updateRate();
  }, [currencyTwo]);
  useEffect(() => {
    setCurrencyTwo(to);
    setResult(0);
    setHistoricalRatesArray([]);
  }, [to]);

  async function calculate() {
    if (currencyOne === "EUR") {
      setResult(amount * (rate || 0));
    }

    if (currencyTwo === "EUR") {
      setResult(amount / (rate || 1));
    }

    if (historicalRatesArray.length > 1) {
      setHistoricalRatesArray([]);
    }
    console.log(currencyTwo);
    for (const dateItem of lastDays) {
      if (currencyOne === "EUR") {
        const url = `http://data.fixer.io/api/${dateItem}?access_key=${API_KEY}&base=${currencyOne}&symbols=${currencyTwo}`;
        const { data } = await axios.get<{ rates: { [key: string]: number } }>(
          url
        );
        setHistoricalRatesArray((prevvalue) => [
          ...prevvalue,
          data.rates[currencyTwo],
        ]);
      } else {
        const url = `http://data.fixer.io/api/${dateItem}?access_key=${API_KEY}&base=${currencyTwo}&symbols=${currencyOne}`;
        const { data } = await axios.get<{ rates: { [key: string]: number } }>(
          url
        );
        setHistoricalRatesArray((prevvalue) => [
          ...prevvalue,
          data.rates[currencyOne],
        ]);
      }
    }
  }

  return (
    <>
      <div className="details">
        <h2>
          {currencyName}
          {currencyOne === "EUR" && "European Union"}
        </h2>
        <div className="convert-details">
          <div>
            <input
              defaultValue={amount}
              type="number"
              id="amount"
              name="amount"
              onChange={(e) => setAmount(e.target.value)}
            ></input>
          </div>

          <div>
            <h5>from</h5>
            <select disabled>
              <option value={currencyOne}>{currencyOne}</option>
            </select>
          </div>
          <div>
            <h5>TO</h5>
            <select
              value={to}
              onChange={(e) => {
                setCurrencyTwo(e.target.value);
                setHistoricalRatesArray([]);
              }}
            >
              {allCurrencies.map((currency) => (
                <option key={currency}>{currency}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="buttons">
          <button disabled>Details</button>
          <button onClick={calculate}>convert</button>
        </div>
        <h5>
          {result ? result : ""}
          {result ? currencyTwo : ""}
        </h5>
        <Charts></Charts>
      </div>
    </>
  );
};

export default Details;

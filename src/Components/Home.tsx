import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { amountContext } from "../context/Amountcontext";

const API_KEY = "eed0498ddd3fae19044796749deee771";

const Home: React.FC = () => {
  const { amount, setAmount } = useContext(amountContext);

  const [currencyOne, setCurrencyOne] = useState<string>("EUR");
  const [currencyTwo, setCurrencyTwo] = useState<string>("USD");
  const [rate, setRate] = useState<number | undefined>();
  const [allCurrencies, setAllCurrencies] = useState<string[]>([]);
  const [result, setResult] = useState<number | undefined>();
  const [noteMsg, setNoterMsg] = useState<string>("");
  const [favoriteCurrencies, setFavoriteCurrencies] = useState<string[]>([
    currencyTwo,
    "AUD",
    "CAD",
    "CHF",
    "CNY",
    "GBP",
    "JPY",
    "EGP",
    "AED",
    "BHD",
  ]);
  const [favoriteRates, setFavoriteRates] = useState<Record<string, number>>(
    {}
  );

  async function updateRate() {
    //convert from euro
    if (currencyOne == "EUR") {
      let data = await axios
        .get(
          `http://data.fixer.io/api/latest?access_key=${API_KEY}&base=${currencyOne}&symbols=${favoriteCurrencies}`
        )
        .then((res) => {
          console.log(res.data.rates);
          setRate(res.data.rates[currencyTwo]);
          setFavoriteRates(res.data.rates);
        });
    }
    if (currencyTwo == "EUR") {
      let data = await axios
        .get(
          `http://data.fixer.io/api/latest?access_key=${API_KEY}&base=${currencyTwo}&symbols=${currencyOne}`
        )
        .then((res) => {
          setRate(res.data.rates[currencyOne]);
          setFavoriteCurrencies([currencyOne]);
        });
    }
    if (currencyOne != "EUR" && currencyTwo != "EUR") {
      setNoterMsg("you can only transfer from / to euro");
    }
  }

  useEffect(() => {
    updateRate();
  }, [currencyOne, currencyTwo]);

  async function getAllcurrencies() {
    let { data } = await axios.get(
      `http://data.fixer.io/api/latest?access_key=${API_KEY}`
    );
    setAllCurrencies(Object.keys(data.rates));
  }
  useEffect(() => {
    getAllcurrencies();
  }, []);

  function getResult() {
    if (currencyOne === "EUR") {
      setResult(amount * (rate || 0));
    }

    if (currencyTwo === "EUR") {
      setResult(amount / (rate || 1));
    }

    if (currencyOne !== "EUR" && currencyTwo !== "EUR") {
      setRate(0);
    }
  }

  function swap() {
    setCurrencyOne(currencyTwo);
    setCurrencyTwo(currencyOne);
  }

  return (
    <>
      <h1>currencies exchange</h1>
      <h5>convert from / to EUR</h5>
      <div className="Home">
        <div>
          <label htmlFor="amount">amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            placeholder="please enter an amount"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </div>

        <div>
          <p>From</p>
          <select
            value={currencyOne}
            onChange={(e) => {
              setCurrencyOne(e.target.value);
            }}
          >
            {allCurrencies.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div>
          <p>TO</p>
          <select
            value={currencyTwo}
            onChange={(e) => {
              setCurrencyTwo(e.target.value);
            }}
          >
            {allCurrencies.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="buttons">
          <button onClick={() => getResult()} disabled={amount === 0}>
            convert
          </button>
          <button onClick={swap} disabled={amount === 0}>
            swap
          </button>
        </div>
      </div>
      <div className="results-details">
        <h3>Result ={isNaN(result || 0) ? "" : result}</h3>
        <p> {noteMsg}</p>
        <Link to={`/${currencyOne}/${currencyTwo}`}>
          <button disabled={currencyOne !== "EUR" && currencyTwo !== "EUR"}>
            details
          </button>
        </Link>
      </div>
      <div className="container">
        <div className="row">
          {result && currencyOne == "EUR"
            ? Object.keys(favoriteRates).map((item) => (
                <div key={item} className="col-md-4">
                  <p>{item}</p>
                  <div className="favorite-currency">
                    {favoriteRates[item] * amount}
                  </div>
                </div>
              ))
            : ""}
        </div>
      </div>
    </>
  );
};

export default Home;

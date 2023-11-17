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
  const [errorMsg, setErrorMsg] = useState<string>("");
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
    let data = await axios
      .get(
        `http://data.fixer.io/api/latest?access_key=${API_KEY}&base=${currencyOne}&symbols=${favoriteCurrencies}`
      )
      .then((res) => {
        console.log(res.data.rates);
        setRate(res.data.rates[currencyTwo]);
        setFavoriteRates(res.data.rates);
      })
      .catch((e) =>
        setErrorMsg("Note:free account only support converstion from / to EUR")
      );
  }

  useEffect(() => {
    updateRate();
  }, [currencyOne, currencyTwo]);

  async function fetchdata() {
    let { data } = await axios.get(
      `http://data.fixer.io/api/latest?access_key=${API_KEY}`
    );
    setAllCurrencies(Object.keys(data.rates));
  }
  useEffect(() => {
    fetchdata();
  }, []);

  function getResult() {
    if (currencyOne === "EUR" || currencyTwo === "EUR") {
      setResult(amount * (rate || 0));
      setErrorMsg("");
    }

    if (currencyTwo === "EUR") {
      setResult(amount / (rate || 1));
    }

    if (currencyOne !== "EUR" && currencyTwo !== "EUR") {
      setRate(0);
      setErrorMsg("");
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
        <p> {errorMsg}</p>
        <Link to={`/${currencyOne}/${currencyTwo}`}>
          <button>details</button>
        </Link>
      </div>
      <div className="container">
        <div className="row">
          {result &&
            Object.keys(favoriteRates).map((item) => (
              <div key={item} className="col-md-4">
                <p>{item}</p>
                <div className="favorite-currency">{favoriteRates[item]}</div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Home;

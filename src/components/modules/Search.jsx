import { useEffect, useState } from "react";
import { searchCoin } from "../../services/cryptoApi";
import { RotatingLines } from "react-loader-spinner";

import styles from "./Search.module.css";

function Search({ currency, setCurrency }) {
  const [isLoading, setIsLoading] = useState(false);
  const [text, setText] = useState("");
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    setCoins([]);
    if (!text) {
      setIsLoading(false);
      return;
    }
    const search = async () => {
      try {
        const res = await fetch(searchCoin(text), {
          signal: controller.signal,
        });
        const json = await res.json();
        if (json.coins) {
          setCoins(json.coins);
          setIsLoading(false);
        } else {
          alert(json.status.error_message);
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          alert(error.message);
        }
      }
    };
    setIsLoading(true);
    search();

    return () => {
      controller.abort();
    };
  }, [text]);

  return (
    // Change the currency of coins and data
    <div className={styles.searchBox}>
      <input
        type="text"
        placeholder="Search"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
        <option value="usd">USD</option>
        <option value="eur">EUR</option>
        <option value="jpy">JPY</option>
        <option value="gbp">GBP</option>
        <option value="aud">AUD</option>
        <option value="chf">CHF</option>
        <option value="cny">CNY</option>
      </select>
      
      {
        //Creating a search function in coins

        (!!coins.length || isLoading) && (
          <div className={styles.searchResult}>
            {isLoading && (
              <RotatingLines
                width="50px"
                height="50px"
                strokeColor="#3874ff"
                strokeWidth="2"
              />
            )}
            <ul>
              {coins.map((coin) => (
                <li key={coin.id}>
                  <img src={coin.thumb} alt={coin.name} />
                  <p>{coin.name}</p>
                </li>
              ))}
            </ul>
          </div>
        )
      }
    </div>
  );
}

export default Search;

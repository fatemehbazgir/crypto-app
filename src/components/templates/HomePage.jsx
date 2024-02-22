import React, { useEffect, useState } from "react";
import TableCoin from "../modules/TableCoin";
import { getCoinList } from "../../services/cryptoApi";
import Pagination from "../modules/Pagination";
import Search from "../modules/Search";

function HomePage() {
  const [page, setPage] = useState(1);
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currency, setCurrency] = useState("usd");

  //Fetch data from api
  useEffect(() => {
    setIsLoading(true);
    const getData = async () => {
     try {
      const res = await fetch(getCoinList(page, currency));
      const json = await res.json();
      setCoins(json);
      setIsLoading(false);
     } catch (error) {
      alert(error)
     }
    };
    getData();
  }, [page,currency]);

  return (
    <div>
      <Search currency={currency} setCurrency={setCurrency} />
      <TableCoin coins={coins} isLoading={isLoading} currency={currency} />
      <Pagination page={page} setPage={setPage} />
    </div>
  );
}

export default HomePage;

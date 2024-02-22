import React, { useEffect, useState } from "react";

import { getCoinList } from "../../services/cryptoApi";
import Pagination from "../modules/Pagination";
import TableCoin from "../modules/TableCoin";
import Search from "../modules/Search";
import Chart from "../modules/Chart";

function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [currency, setCurrency] = useState("usd");
  const [chart, setChart] = useState(null);
  const [coins, setCoins] = useState([]);
  const [page, setPage] = useState(1);

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
        alert(error);
      }
    };
    getData();
  }, [page, currency]);

  return (
    <div>
      <Search currency={currency} setCurrency={setCurrency} />
      <TableCoin
        coins={coins}
        isLoading={isLoading}
        currency={currency}
        setChart={setChart}
      />
      <Pagination page={page} setPage={setPage} />
      {!!chart && <Chart chart={chart} setChart={setChart} />}
    </div>
  );
}

export default HomePage;

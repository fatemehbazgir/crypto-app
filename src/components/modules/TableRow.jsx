import styles from "./TableRow.module.css";

import chartDown from "../../assets/chart-down.svg";
import chartUp from "../../assets/chart-up.svg";
import { marketChart } from "../../services/cryptoApi";

// Extract table data
function TableRow({ coin, currency, setChart }) {
  const {
    id,
    image,
    name,
    symbol,
    current_price,
    price_change_percentage_24h: price_change,
    total_volume,
  } = coin;

  const showHandler = async () => {
    try {
      const res = await fetch(marketChart(id));
      const json = await res.json();
      setChart({ ...json, coin});
    } catch (error) {
      setChart(null);
    }
  };
  return (
    <tr>
      <td>
        <div className={styles.symbol} onClick={showHandler}>
          <img src={image} alt={name} />
          <span>{symbol.toUpperCase()}</span>
        </div>
      </td>
      <td>{name}</td>
      <td>
        {" "}
        {currency === "usd"
          ? "$"
          : currency === "eur"
          ? "€"
          : currency === "jpy"
          ? "¥"
          : currency === "gbp"
          ? "£"
          : currency === "aud"
          ? "A$"
          : currency === "chf"
          ? "Fr"
          : "元"}
        {current_price.toLocaleString()}
      </td>
      <td className={price_change > 0 ? styles.success : styles.error}>
        {price_change.toFixed(2)}%
      </td>
      <td>{total_volume.toLocaleString()}</td>
      <td>
        <img src={price_change > 0 ? chartUp : chartDown} alt={name} />
      </td>
    </tr>
  );
}

export default TableRow;

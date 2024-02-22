function Search({ currency, setCurrency }) {
  return (
    <div>
      <input type="text" />
      <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
        <option value="usd">USD</option>
        <option value="eur">EUR</option>
        <option value="jpy">JPY</option>
        <option value="gbp">GBP</option>
        <option value="aud">AUD</option>
        <option value="chf">CHF</option>
        <option value="cny">CNY</option>
      </select>
    </div>
  );
}

export default Search;

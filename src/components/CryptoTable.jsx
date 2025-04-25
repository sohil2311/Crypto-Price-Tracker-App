import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCryptoData, updateRandomData } from "../redux/cryptoSlice";
import { formatNumber } from "../utils/format";
import Chart7D from "./Chart7D";
import { BiCaretDown, BiCaretUp } from "react-icons/bi";

const getColorClass = (val) => (val >= 0 ? "text-green-500" : "text-red-500");
const Arrow = ({ val }) =>
  val >= 0 ? (
    <BiCaretUp className="inline" />
  ) : (
    <BiCaretDown className="inline" />
  );

export default function CryptoTable() {
  const dispatch = useDispatch();
  const { assets, status, error } = useSelector((state) => state.crypto);

  useEffect(() => {
    dispatch(fetchCryptoData());
    const interval = setInterval(() => dispatch(updateRandomData()), 1500);
    return () => clearInterval(interval);
  }, [dispatch]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr className="text-sm text-gray-600">
            <th className="p-3 text-left">#</th>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-right">Price</th>
            <th className="p-3 text-right">1h %</th>
            <th className="p-3 text-right">24h %</th>
            <th className="p-3 text-right">7d %</th>
            <th className="p-3 text-right">Market Cap</th>
            <th className="p-3 text-right">Volume (24h)</th>
            <th className="p-3 text-right">Circulating Supply</th>
            <th className="p-3 text-right">Last 7 Days</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((coin, i) => (
            <tr key={coin.id} className="hover:bg-gray-50 border-b">
              <td className="p-3">{i + 1}</td>
              <td className="p-3 flex items-center">
                <img
                  src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${coin.id}.png`}
                  alt="logo"
                  className="w-6 h-6"
                />
                <div className="p-3 text-right flex items-center gap-2">
                  <div className="font-semibold">{coin.name} </div>
                  <div className="text-sm text-gray-400">{coin.symbol}</div>
                </div>
              </td>
              <td className="p-3 text-right">
                ${Number(coin.quote.USD.price).toFixed(2)}
              </td>
              <td className="p-3 text-right">
                <div
                  className={`flex items-center justify-end ${getColorClass(
                    coin.quote.USD.percent_change_1h
                  )}`}
                >
                  <Arrow val={coin.quote.USD.percent_change_1h} />
                  {Math.abs(coin.quote.USD.percent_change_1h).toFixed(2)}%
                </div>
              </td>

              <td className="p-3 text-right">
                <div
                  className={`flex items-center justify-end ${getColorClass(
                    coin.quote.USD.percent_change_24h
                  )}`}
                >
                  <Arrow val={coin.quote.USD.percent_change_24h} />
                  {Math.abs(coin.quote.USD.percent_change_24h).toFixed(2)}%
                </div>
              </td>

              <td className="p-3 text-right">
                <div
                  className={`flex items-center justify-end ${getColorClass(
                    coin.quote.USD.percent_change_7d
                  )}`}
                >
                  <Arrow val={coin.quote.USD.percent_change_7d} />
                  {Math.abs(coin.quote.USD.percent_change_7d).toFixed(2)}%
                </div>
              </td>

              <td className="p-3 text-right">
                ${coin.quote.USD.market_cap.toLocaleString()}
              </td>
              <td className="p-3 text-right">
                ${coin.quote.USD.volume_24h.toLocaleString()}
              </td>
              <td className="p-3 text-right">
                <div className="flex justify-end gap-2">
                  <div>
                    {" "}
                    {formatNumber(
                      Number(coin.circulating_supply).toFixed(2)
                    )}{" "}
                  </div>
                  <div>{coin.symbol}</div>
                </div>
              </td>
              <td className="p-3 text-right">
                <Chart7D symbol={coin.symbol} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
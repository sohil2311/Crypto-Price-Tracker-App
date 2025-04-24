import { LineChart, Line, ResponsiveContainer, Tooltip } from "recharts";

const generateRandomData = () => {
  const data = [];
  let price = Math.random() * 1000 + 100;
  for (let i = 0; i < 7; i++) {
    price += (Math.random() - 0.5) * 50;
    data.push({ day: `Day ${i + 1}`, price: Number(price.toFixed(2)) });
  }
  return data;
};

export default function Chart7D({ symbol }) {
  const data = generateRandomData();

  return (
    <div className="w-[80px] h-[40px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <Tooltip
            formatter={(val) => `$${val}`}
            contentStyle={{ fontSize: "10px" }}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
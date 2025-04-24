export default function Chart7D({ symbol }) {
    const chartURL = `https://cryptohistorycharts.com/images/${symbol?.toLowerCase()}.svg`;
    return (
      <img src={chartURL} alt={`${symbol} 7D chart`} className="w-24 h-10 object-contain" onError={(e) => e.target.style.display = 'none'} />
    );
  }
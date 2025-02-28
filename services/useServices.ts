import { GET } from "./apiServices";

export default function useServices() {
  async function getBitcoinData(interval: string) {
    const response = await GET(
      `https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=${interval}`
    );
    return response.data.map(
      (item: [number, string, string, string, string, string]) => ({
        time: item[0] / 1000,
        open: parseFloat(item[1]),
        high: parseFloat(item[2]),
        low: parseFloat(item[3]),
        close: parseFloat(item[4]),
        volume: parseFloat(item[5]),
      })
    );
  }

  async function getBitcoinPrice(time: number) {
    const response = await GET(
      `https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1m&limit=1${
        time ? `&endTime=${time * 1000}` : ""
      }`
    );
    const data = response.data[0];
    return {
      time: data[0] / 1000,
      open: parseFloat(data[1]),
      high: parseFloat(data[2]),
      low: parseFloat(data[3]),
      close: parseFloat(data[4]),
    };
  }

  return {
    getBitcoinData,
    getBitcoinPrice,
  };
}

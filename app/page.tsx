"use client";

import DefaultLayout from "./layouts/DefaultLayout";
import CandlestickChart from "./candlestick-chart/page";
import VolumeChart from "./volume-chart/page";
import { useEffect, useState, useRef } from "react";
import useServices from "@/services/useServices";

export default function Home() {
  interface BitcoinData {
    time: number;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
  }

  const [data, setData] = useState<BitcoinData[]>([]);
  const [interval, setInterval] = useState("1m");
  const { getBitcoinData, getBitcoinPrice } = useServices();
  const [currentPrice, setCurrentPrice] = useState<number | null>(null);
  const [price1MinuteAgo, setPrice1MinuteAgo] = useState<number | null>(null);
  const candlestickChartRef = useRef<HTMLDivElement>(null);
  const volumeChartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getBitcoinData(interval);
      setData(res);
    };
    fetchData();
  }, [interval]);

  const handleFetchCurrentPrice = async () => {
    const price = await getBitcoinPrice(Math.floor(Date.now() / 1000));
    setCurrentPrice(price.close);
  };

  const handleFetchPrice1MinuteAgo = async () => {
    const oneMinuteAgo = Math.floor(Date.now() / 1000) - 60;
    const price = await getBitcoinPrice(oneMinuteAgo);
    setPrice1MinuteAgo(price.close);
  };

  return (
    <DefaultLayout>
      <div className="sm:p-28 p-4 mt-10 text-[var(--text)]">
        <h1 className="text-2xl font-bold mb-4">Bitcoin Chart</h1>

        <div className="flex space-x-4 mb-4">
          {["1m", "5m", "30m", "1h", "4h", "1d"].map((time) => (
            <button
              key={time}
              onClick={() => setInterval(time)}
              className={`px-4 py-2 rounded ${
                interval === time ? "bg-[#F0B90B] text-white" : "bg-gray-300"
              }`}
            >
              {time}
            </button>
          ))}
        </div>
        <div className="flex gap-4 mb-4">
          <button
            onClick={handleFetchCurrentPrice}
            className="p-2 bg-green-500 text-white rounded"
          >
            Lấy giá Bitcoin hiện tại
          </button>

          <button
            onClick={handleFetchPrice1MinuteAgo}
            className="p-2 bg-yellow-500 text-white rounded"
          >
            Lấy giá Bitcoin cách đây 1 phút
          </button>
        </div>
        <div className="mb-4">
          {currentPrice !== null && (
            <p className="text-lg text-green-500">
              Giá Bitcoin hiện tại: ${currentPrice.toFixed(2)}
            </p>
          )}
          {price1MinuteAgo !== null && (
            <p className="text-lg text-yellow-500">
              Giá Bitcoin 1 phút trước: ${price1MinuteAgo.toFixed(2)}
            </p>
          )}
        </div>
        {data.length > 0 && (
          <div className="flex flex-col gap-24">
            <div
              className="w-full"
              ref={candlestickChartRef}
              id="candlestick-chart"
            >
              <h2 className="text-xl font-bold">Candlestick Chart</h2>
              <CandlestickChart data={data} />
            </div>
            <div className="w-full" ref={volumeChartRef} id="volume-chart">
              <h2 className="text-xl font-bold">Volume Chart</h2>
              <VolumeChart data={data} />
            </div>
          </div>
        )}
      </div>
    </DefaultLayout>
  );
}

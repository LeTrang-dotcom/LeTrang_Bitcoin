"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navlinks({ candlestickChartRef, volumeChartRef }) {
  const [activeTab, setActiveTab] = useState("home");

  const isActiveTab = (tab: string) => tab === activeTab;

  const handleCandlestickClick = () => {
    setActiveTab("candlestick");
    if (candlestickChartRef?.current) {
      candlestickChartRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleVolumeClick = () => {
    setActiveTab("volume");
    if (volumeChartRef?.current) {
      volumeChartRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <ul className="flex flex-row justify-between gap-10">
        <li>
          <Link
            href="#"
            className={`hover:bg-transparent hover:border-b-2 text-[10px] sm:text-lg text-[var(--text)] ${
              isActiveTab("home") ? "border-b-2" : ""
            }`}
            onClick={() => setActiveTab("home")}
          >
            HOME
          </Link>
        </li>
        <li>
          <Link
            href="#candlestick-chart"
            className={`hover:bg-transparent hover:border-b-2 text-[10px] sm:text-lg text-[var(--text)]  ${
              isActiveTab("candlestick") ? "border-b-2" : ""
            }`}
            onClick={handleCandlestickClick}
          >
            CANDLESTICK CHART
          </Link>
        </li>
        <li>
          <Link
            href="#volume-chart"
            className={`hover:bg-transparent hover:border-b-2 text-[var(--text)] text-[10px] sm:text-lg ${
              isActiveTab("volume") ? "border-b-2" : ""
            }`}
            onClick={handleVolumeClick}
          >
            VOLUME CHART
          </Link>
        </li>
      </ul>
    </>
  );
}

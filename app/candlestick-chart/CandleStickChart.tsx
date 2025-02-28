"use client";

import { createChart, ISeriesApi } from "lightweight-charts";
import { useEffect, useRef } from "react";

import { Time } from "lightweight-charts";

interface CandlestickData {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
}

interface CandlestickChartProps {
  data: CandlestickData[];
}

export default function CandlestickChart({ data }: CandlestickChartProps) {
  const chartContainer = useRef<HTMLDivElement>(null);
  const chartRef = useRef<ReturnType<typeof createChart> | null>(null);
  const seriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);

  useEffect(() => {
    if (chartContainer.current && !chartRef.current) {
      const chart = createChart(chartContainer.current, {
        width: chartContainer.current.clientWidth,
        height: 300,
      });
      chartRef.current = chart;

      seriesRef.current = chart.addCandlestickSeries();
      seriesRef.current.setData(
        data.map((item) => ({
          time: item.time as Time,
          open: item.open,
          high: item.high,
          low: item.low,
          close: item.close,
        }))
      );

      const resizeObserver = new ResizeObserver(() => {
        chart.applyOptions({
          width: chartContainer.current?.clientWidth,
          height: 300,
        });
      });
      resizeObserver.observe(chartContainer.current);

      return () => {
        resizeObserver.disconnect();
      };
    }
  }, []);

  useEffect(() => {
    if (seriesRef.current && data.length > 0) {
      seriesRef.current.setData(
        data.map((item) => ({
          time: item.time as Time,
          open: item.open,
          high: item.high,
          low: item.low,
          close: item.close,
        }))
      );
    }
  }, [data]);

  return <div ref={chartContainer} className="w-full h-full" />;
}

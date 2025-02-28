"use client";

import { createChart, UTCTimestamp } from "lightweight-charts";
import { useEffect, useRef } from "react";

interface VolumeData {
  time: number;
  volume: number;
  open: number;
  close: number;
}

interface VolumeChartProps {
  data: VolumeData[];
}

const VolumeChart = ({ data }: VolumeChartProps) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartContainerRef.current) {
      const chart = createChart(chartContainerRef.current, {
        width: chartContainerRef.current.clientWidth,
        height: 120,
      });

      const volumeSeries = chart.addHistogramSeries({
        color: "#26a69a",
        priceFormat: {
          type: "volume",
        },
      });
      volumeSeries.setData(
        data.map((item) => ({
          time: item.time as unknown as UTCTimestamp,
          value: item.volume,
          color: item.close > item.open ? "#26a69a" : "#ef5350",
        }))
      );

      const resizeObserver = new ResizeObserver(() => {
        chart.applyOptions({ width: chartContainerRef.current!.clientWidth });
      });
      resizeObserver.observe(chartContainerRef.current);

      return () => {
        resizeObserver.disconnect();
        chart.remove();
      };
    }
  }, [data]);

  return <div ref={chartContainerRef} className="w-full h-[120px]" />;
};

export default VolumeChart;

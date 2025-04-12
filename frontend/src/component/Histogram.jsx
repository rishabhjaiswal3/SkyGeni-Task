import { useEffect, useMemo, useRef } from "react";
import * as d3 from "d3";

const MARGIN = { top: 30, right: 30, bottom: 40, left: 50 };
const COLORS = ["#e0ac2b", "#e85252", "#6689c6", "#9a6fb0", "#a53253"];

export const Histogram = ({ width, height, data }) => {
  const axesRef = useRef(null);
  const boundsWidth = width - MARGIN.left - MARGIN.right;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  // Get unique quarters
  const allQuarters = data[0]?.quarter ?? [];

  const xScale = useMemo(() => {
    return d3
      .scaleBand()
      .domain(allQuarters)
      .range([0, boundsWidth])
      .padding(0.2);
  }, [data, width]);

  // Transform data for stacking
  const stackedData = useMemo(() => {
    return allQuarters.map((quarter, index) => {
      let y0 = 0;
      const stack = data.map((group) => {
        const value = group.values[index];
        const bar = { name: group.name, value, y0, y1: y0 + value };
        y0 += value;
        return bar;
      });
      return { quarter, stack };
    });
  }, [data]);

  const yMax = d3.max(stackedData, (d) => d.stack[d.stack.length - 1].y1);

  const yScale = useMemo(() => {
    return d3.scaleLinear().domain([0, yMax]).range([boundsHeight, 0]).nice();
  }, [yMax, height]);

  const colorScale = d3
    .scaleOrdinal()
    .domain(data.map((d) => d.name))
    .range(COLORS);

  useEffect(() => {
    const svg = d3.select(axesRef.current);
    svg.selectAll("*").remove();

    const xAxis = d3.axisBottom(xScale);
    svg
      .append("g")
      .attr("transform", `translate(0,${boundsHeight})`)
      .call(xAxis);

    const yAxis = d3.axisLeft(yScale).tickFormat(d3.format(".2s"));
    svg.append("g").call(yAxis);
  }, [xScale, yScale, boundsHeight]);

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${MARGIN.left},${MARGIN.top})`}>
        {stackedData.map((group, i) =>
          group.stack.map((bar, j) => (
            <rect
              key={`${group.quarter}-${bar.name}`}
              x={xScale(group.quarter)}
              y={yScale(bar.y1)}
              width={xScale.bandwidth()}
              height={yScale(bar.y0) - yScale(bar.y1)}
              fill={colorScale(bar.name)}
              opacity={0.8}
            />
          ))
        )}
      </g>
      <g ref={axesRef} transform={`translate(${MARGIN.left},${MARGIN.top})`} />
    </svg>
  );
};

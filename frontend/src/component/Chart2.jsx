import { DonutChart } from "./DonutChart";

const data = [
    {name:"Mark", value: 70},
    {name:"Robert", value: 30},
]


export const Chart2 = ({ width = 700, height = 400 }) => (
  <DonutChart data={data} width={width} height={height} />
);

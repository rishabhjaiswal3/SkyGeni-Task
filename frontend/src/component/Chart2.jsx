import { DonutChart } from "./DonutChart";

const data = [
    {name:"Mark", value: 90},
    {name:"Robert", value: 12},
    {name:"Emily", value: 34},
    {name:"Marion", value: 53},
    {name:"Nicolas", value: 58},
]


export const Chart2 = ({ width = 700, height = 400 }) => (
  <DonutChart data={data} width={width} height={height} />
);

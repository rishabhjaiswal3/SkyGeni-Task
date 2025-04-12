import { Histogram } from "./component/Histogram";
import { Chart2 } from "./component/Chart2";
import { getData } from "./component/data";
import { useEffect, useState } from "react";
function App() {

  const [data, setData] =  useState([]);
  useEffect(() => {
    const ab = getData();
    console.log("my data is ",ab)
    setData(ab);
  },[])

  let height = 500;
  let width = 720;
  return (
    <>
    <Histogram width={width} height={height} data={data} />
    <Chart2 height={height} width={width} />
    </>
  )
}

export default App

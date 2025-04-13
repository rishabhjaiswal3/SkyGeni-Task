import { DonutChart } from "./DonutChart";
import { useState, useEffect } from "react";

export const Chart2 = ({ width = 700, height = 400, data  }) => {

  const [newData, setNewData] =  useState([]);
  useEffect(() => {
    const finalData = data.map((_data)=> {
      return {name: _data.name,value:_data.totalAcv}
    })
    setNewData(finalData);
  },[data])

  return <DonutChart data={newData} width={width} height={height} />
};

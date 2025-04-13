import { Histogram } from "./component/Histogram";
import { Chart2 } from "./component/Chart2";
import { useEffect, useState } from "react";
import api from "./api";
import CustomizedTables from "./component/CustomizaTable";

function App() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async (type = '') => {
    setLoading(true);
    try {
      const response = await api.get(`/data?type=${type}`);
      const responseData = response.data;

      if (responseData?.status === true && Array.isArray(responseData.data)) {
        setData(responseData.data);
      } else {
        setError("Unexpected data format");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData('TEAM');
  }, []);

  let height = 500;
  let width = 720;

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Histogram width={width} height={height} newData={data} />
      <Chart2 height={height} width={width} data = {data}/>
      <CustomizedTables  data={data}/>
    </>
  );
}

export default App;

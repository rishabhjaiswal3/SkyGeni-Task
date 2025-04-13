import { useEffect, useState } from "react";
import api from "./api";
import { Box, CircularProgress, Typography } from "@mui/material";
import { Dashboard } from "./component/Dashboard";

function App() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dataType, setDataType] = useState("");

  const fetchData = async (type = "") => {
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
    fetchData(dataType);
  }, [dataType]);

  return (
    <Box sx={{ p: 2 }}>
      {loading && (
        <Box display="flex" justifyContent="center" my={2}>
          <CircularProgress />
        </Box>
      )}
      {error && (
        <Typography color="error" align="center" my={2}>
          {error}
        </Typography>
      )}
      <Dashboard data={data} dataType={ dataType } setDataType={ setDataType } />
    </Box>
  );
}

export default App;
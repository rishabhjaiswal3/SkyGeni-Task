import { Histogram } from "./component/Histogram";
import { Chart2 } from "./component/Chart2";
import { useEffect, useState } from "react";
import api from "./api";
import CustomizedTables from "./component/CustomizaTable";
import {
  Card,
  CardContent,
  Box,
  Grid,
  Typography,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from "@mui/material";

function App() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const isMedium = useMediaQuery(theme.breakpoints.between("sm", "md"));

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
    fetchData("TEAM");
  }, []);

  const getHistogramRatio = () => {
    const width = isSmall ? 420 : isMedium ? 700 : 960;
    const height = isSmall ? 250 : isMedium ? 310 : 460;
    return { width, height };
  };

  const getChart2Ratio = () => {
    const width = isSmall ? 360 : isMedium ? 470 : 520;
    const height = isSmall ? 360 : isMedium ? 470 : 520;
    return { width, height };
  };

  const histogram = getHistogramRatio();
  const chart2 = getChart2Ratio();

  const Header = () => {
    return (
      <Box sx={{display:'flex',justifyContent:'center'}}> 
      <span>
      Hello ACV Mix By Cust Type 
      </span>
      </Box>
    )
  }

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

      <Card elevation={8} sx={{ borderRadius: 2 }}>
        <CardContent>
          <Header />
          <Grid
            container
            spacing={2}
            justifyContent="space-between"
          >
            <Grid item xs={12} md={8}>
              <Box width="100%">
                <Histogram
                  newData={data}
                  height={histogram.height}
                  width={histogram.width}
                />
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              md={4}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Chart2 data={data} height={chart2.height} width={chart2.width} />
            </Grid>
            <Grid item xs={12} style={{ width: "100%" }}>
              <CustomizedTables data={data} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}

export default App;
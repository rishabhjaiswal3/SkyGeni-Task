import {
    Card,
    CardContent,
    Grid,
    Box,
    useMediaQuery,
    useTheme,
  } from "@mui/material";
  import { Histogram } from "./HistogramChart/Histogram";
  import { DonutChartFig } from "./DonutChart/DonutChartFig";
  import CustomizedTables from "./Table/CustomizaTable";
  import { Header } from "./Header";
  
  export const Dashboard = ({ data, dataType, setDataType }) => {
    

    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
    const isMedium = useMediaQuery(theme.breakpoints.between("sm", "md"));
  
    const histogram = {
      width: isSmall ? 420 : isMedium ? 700 : 960,
      height: isSmall ? 250 : isMedium ? 310 : 460,
    };
  
    const donut = {
      width: isSmall ? 360 : isMedium ? 470 : 520,
      height: isSmall ? 360 : isMedium ? 470 : 520,
    };
  
    return (
      <Card elevation={8} sx={{ borderRadius: 2 }}>
        <CardContent>
        <Header dataType= {dataType} setDataType={setDataType} />
          <Grid container spacing={2} justifyContent="space-between">
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
              <DonutChartFig
                data={data}
                height={donut.height}
                width={donut.width}
              />
            </Grid>
            <Grid item xs={12} style={{width:"100%"}}>
              <CustomizedTables data={data} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  };
  
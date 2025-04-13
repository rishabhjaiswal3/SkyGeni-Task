import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

export default function CustomizedTables({ data }) {
  if (!data || !data.length) return null;

  const quarters = data[0].quarters;

  return (
    <Paper sx={{ width: "100%" }}>
      <TableContainer sx={{ maxHeight: 320 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center" rowSpan={2}>
                Closed Fiscal Quarter
              </TableCell>
              {quarters.map((quarter) => (
                <TableCell key={quarter} align="center" colSpan={3}>
                  {quarter}
                </TableCell>
              ))}
              <TableCell align="center" rowSpan={2}>
                Result
              </TableCell>
            </TableRow>
            <TableRow>
              {quarters.map((q) => (
                <React.Fragment key={q}>
                  <TableCell align="center"># of Oops</TableCell>
                  <TableCell align="center">ACV</TableCell>
                  <TableCell align="center">% of Total</TableCell>
                </React.Fragment>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell align="center">{item.name}</TableCell>
                {item.quarters.map((_, idx) => (
                  <React.Fragment key={idx}>
                    <TableCell align="center">{item.counts[idx]}</TableCell>
                    <TableCell align="center">{item.values[idx]}</TableCell>
                    <TableCell align="center">
                      {item.percents[idx].toFixed(2)}%
                    </TableCell>
                  </React.Fragment>
                ))}
                <TableCell align="center">{item.totalCount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

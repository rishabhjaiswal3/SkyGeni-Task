import { MenuItem, Select,Box,FormControl,InputLabel } from "@mui/material";
export const Header = ({dataType, setDataType}) => {

    const handleChange = (event) => {
      setDataType(event.target.value);
    };
    
    return (
      <Box sx={{display:'flex',justifyContent:'space-between'}}> 
      <span style={{fontWeight:"bold"}}>
         Hello ACV Mix By Cust Type 
      </span>
      <Box sx={{ minWidth: 120,height:20}}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Data Type</InputLabel>
        <Select
          id="demo-simple-select"
          value={dataType}
          label="Data Type"
          onChange={handleChange}
        >
          <MenuItem value=''>Customer</MenuItem>
          <MenuItem value='ACCOUNT_INDUSTRY'>Account Industry</MenuItem>
          <MenuItem value='ACV_RANGE'>ACV Range</MenuItem>
          <MenuItem value='TEAM'>Team</MenuItem>
        </Select>
      </FormControl>
    </Box>
      </Box>
    )
}

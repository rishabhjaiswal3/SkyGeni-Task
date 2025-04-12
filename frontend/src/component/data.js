export const getData = () => {
  const originalData = [
    { count: 46, acv: 1322309.99, closed_fiscal_quarter: "2023-Q3", Cust_Type: "Existing Customer" },
    { count: 14, acv: 983031.39, closed_fiscal_quarter: "2023-Q3", Cust_Type: "New Customer" },
    { count: 45, acv: 1124856.95, closed_fiscal_quarter: "2023-Q4", Cust_Type: "Existing Customer" },
    { count: 10, acv: 387300, closed_fiscal_quarter: "2023-Q4", Cust_Type: "New Customer" },
    { count: 51, acv: 1360047.16, closed_fiscal_quarter: "2024-Q1", Cust_Type: "Existing Customer" },
    { count: 6, acv: 313189.25, closed_fiscal_quarter: "2024-Q1", Cust_Type: "New Customer" },
    { count: 23, acv: 647821.48, closed_fiscal_quarter: "2024-Q2", Cust_Type: "Existing Customer" },
    { count: 6, acv: 224643.3, closed_fiscal_quarter: "2024-Q2", Cust_Type: "New Customer" },
  ];

  const grouped = {};
  
  for (const item of originalData) {
    const { Cust_Type, closed_fiscal_quarter, acv, count } = item;

    if (!grouped[Cust_Type]) {
      grouped[Cust_Type] = {

      };
    }

    if (!grouped[Cust_Type][closed_fiscal_quarter]) {
      grouped[Cust_Type][closed_fiscal_quarter] = { acv: 0, count: 0, };
    }

    grouped[Cust_Type][closed_fiscal_quarter].acv += acv;
    grouped[Cust_Type][closed_fiscal_quarter].count += count;
  }

  const result = [];
  let finalACV = 0;
  for (const [custType, data] of Object.entries(grouped)) {
    const acvs = [];
    const quarters = [];
    const counts = [];
    let totalCount = 0;
    let totalAcv = 0;

    for (const [quarter, { acv, count }] of Object.entries(data)) {
      quarters.push(quarter);
      acvs.push(acv);
      counts.push(count);
      totalCount +=  count;
      totalAcv += acv;
    }

    let per = 0;
    let percentages = [];
    acvs.forEach((acv)=> {
      console.log("ACV ",acv);
      console.log("total ACV",totalAcv);
      per = (acv * 100)/ totalAcv;
      percentages.push(per);

    })

    result.push({
      name: custType,     
      values: acvs,
      percentages,
      totalCount,
      totalAcv,
      quarter: quarters,
      count: counts,
    });
    finalACV += totalCount;
  }

  return result;
};

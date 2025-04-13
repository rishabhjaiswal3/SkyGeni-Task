import {
  Request,
  Response,
  NextFunction,
} from "express";
import accountIndustryJson from "../data/account_industry.json";
import acvRangeJSON from "../data/acv_range.json";
import customerTypeJSON from "../data/customer_type.json";
import teamJSON from "../data/team.json";
import {
  TEAM_TYPE,
  CUSTOMER_TYPE,
  ACV_RANGE,
  ACCOUNT_INDUSTRY,
} from "../model";

const makeDataFormat = (
  originalData:
    | TEAM_TYPE[]
    | CUSTOMER_TYPE[]
    | ACV_RANGE[]
    | ACCOUNT_INDUSTRY[],
  MAIN_Key: "Cust_Type" | "Acct_Industry" | "Team" | "ACV_Range"
) => {
  // step1 grouped data according to need

  const grouped: Record<
    string,
    Record<string, { acv: number; count: number }>
  > = {};

  for (const item of originalData) {
    const baseKey = (item as any)[MAIN_Key] as string;
    if (!baseKey) continue;

    const { closed_fiscal_quarter, acv, count } = item as any;

    if (!grouped[baseKey]) {
      grouped[baseKey] = {};
    }

    if (!grouped[baseKey][closed_fiscal_quarter]) {
      grouped[baseKey][closed_fiscal_quarter] = { acv: 0, count: 0 };
    }

    grouped[baseKey][closed_fiscal_quarter].acv += acv ?? 0;
    grouped[baseKey][closed_fiscal_quarter].count += count ?? 0;
  }

  console.log("my grouped data is",grouped);
  // organize the result according to the data
  const result = [];
  for (const [key, data] of Object.entries(grouped)) {
    const acvs: number[] = [];
    const counts: number[] = [];
    const quarters = [];
    let totalCount = 0;
    let totalAcv = 0;
    for (const [quarter, tempValue] of Object.entries(data)) {
      quarters.push(quarter);
      const { acv, count } =  tempValue;
      totalAcv += acv;
      totalCount += count;
      acvs.push(acv);
      counts.push(count);
    }

    let percents: number[] = [];

    acvs.forEach((_acv: number) => {
      let per = (_acv * 100) / totalAcv;
      percents.push(per);
    });

    result.push({
      name: key,
      values: acvs,
      quarters,
      counts: counts,
      percents,
      totalAcv,
      totalCount
    });
  }
  console.log("my result is ",result);
  return result;
};

const organizeData = (req: Request, res: Response, next: NextFunction) => {
  const JSON_TYPE = req.query.type;
  let response: any = null;
  switch (JSON_TYPE) {
    case "ACCOUNT_INDUSTRY":
      response = makeDataFormat(accountIndustryJson, "Acct_Industry");
      break;
    case "ACV_RANGE":
      response = makeDataFormat(acvRangeJSON, "ACV_Range");
      break;
    case "TEAM":
      response = makeDataFormat(teamJSON, "Team");
      break;
    default:
      response = makeDataFormat(customerTypeJSON, "Cust_Type");
      break;
  }
  if (!response)
    return res.send({
      status: false,
      error: "Error While Getting data",
      data: null,
    });
  return res.status(200).json({ status: true, data: response });
};

export { organizeData };

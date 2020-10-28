import { Parser } from "json2csv";
import * as toJSON from "csvtojson/v2";

export function toCSV(data: any[], fields?: string[]) {
  if (!fields) {
    const uniqueFields: any = {};

    data.forEach((e) => {
      Object.keys(e).forEach((k) => {
        uniqueFields[k] = true;
      });
    });

    fields = Object.keys(uniqueFields);
  }

  const opts = { fields };

  try {
    const parser = new Parser(opts);
    const csv = parser.parse(data);
    return csv;
  } catch (err) {
    console.error(err);
  }
}

export async function readCSV(path: string) {
  const jsonArray = await toJSON().fromFile(path);

  return jsonArray;
}

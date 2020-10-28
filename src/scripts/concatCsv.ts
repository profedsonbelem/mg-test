import * as fs from "fs";
import { readCSV, toCSV } from "../utils/sheets/csv";

async function main(folder: string) {
  const csvPaths = fs.readdirSync(folder).filter((path) => {
    return path.endsWith(".csv");
  });

  const wholeData: any[] = [];
  for (let curCsv of csvPaths) {
    const csvData = await readCSV(`${folder}/${curCsv}`);

    wholeData.push(...csvData);
  }

  fs.writeFileSync(`${folder}.csv`, toCSV(wholeData));
}

main(process.argv[2]);

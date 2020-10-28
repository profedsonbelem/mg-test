import { readCSV, toCSV } from "../utils/sheets/csv";
import { getOnlyAttributes } from "../utils/misc/object.utils";
import { normalizeString } from "../utils/misc/string.utils";
import * as fs from "fs";
import * as ProgressBar from "progress";

async function main(path: string, uniqueAttsString: string, out?: string) {
  console.log("Reading csv", path);
  const csv = await readCSV(path);

  const uniqueData: any = {};
  const uniqueAtts = uniqueAttsString.split(",");
  const bar = new ProgressBar(":bar:eta", csv.length);
  console.log("Processing rows");
  for (let row of csv) {
    const atts: { [att: string]: string } = getOnlyAttributes(row, uniqueAtts);
    const key = Object.values(atts).reduce((p, n) => {
      return p + normalizeString(n);
    }, "");

    if (!uniqueData[key]) {
      uniqueData[key] = atts;
    }

    bar.tick();
  }

  const outPath = out || path.replace(".csv", "-uniques.csv");
  console.log("Writing result", outPath);
  fs.writeFileSync(outPath, toCSV(Object.values(uniqueData)));

  console.log("Done");
}

main(process.argv[2], process.argv[3], process.argv[4]);

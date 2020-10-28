import { readCSV } from "../../utils/sheets/csv";
import * as fs from "fs";

export async function filterCSV(csvPath: string): Promise<boolean> {
	console.log("entrou");
	if (!csvPath) {
		throw new Error(`Failed to find ${csvPath}`);
	}
	console.log("passou verificacao csvPath");

	const csvFiles = fs.readdirSync(csvPath, "utf8");

	console.log(csvFiles);

	const failedIds: { [ids: string]: true } = {};
	for (let j = 0; j < csvFiles.length; j++) {
		const csvFile = await readCSV(`${csvPath}/${csvFiles[j]}`);

		if (!csvFile) {
			console.log(`${csvFiles[j]} vazio`);
			continue;
		}

		console.log(`${JSON.stringify(csvFile)}`);
		console.log(`****Length: ${csvFile.length}`);

		for (let i = 0; i < csvFile.length; i++) {
			console.log(`sReason: ${csvFile[i].sReason}`);
			if (
				csvFile[i].sReason ===
				"Error: INVALID_LOGIN: Invalid username, password, security token; or user locked out."
			) {
				failedIds[`${csvFile[i].intake}_${csvFile[i].survey}`] = true;
				console.log(`${csvFile[i].intake}_${csvFile[i].survey}`);
			}
		}

		let jsonPath = csvPath.replace("batches", "json");
		jsonPath += csvFiles[j].replace("-fail.csv", ".json");
		console.log(`****JsonPath: ${jsonPath}`);
		const jsonFile = fs.readFileSync(jsonPath, "utf8");
		const data: any[] = JSON.parse(jsonFile);

		const jsonOut = [];

		if (data.length === 0) {
			console.log(`${jsonFile} is empty`);
			continue;
		}

		for (let i = 0; i < data.length; i++) {
			console.log(`*****Data: ${data[i]._id}`);
			for (let k = 0; k < data[i].SurveyAnswers.length; k++) {
				if (data[i].SurveyAnswers[k]) {
					console.log(`*****Survey: ${data[i].SurveyAnswers[k]}`);
					if (failedIds[`${data[i]._id}_${data[i].SurveyAnswers[k]._id}`]) {
						jsonOut.push(JSON.stringify(data[i]));
					}
				}
			}
		}
		if (jsonOut.length > 0) {
			const out = jsonPath.replace("json/", "filteredJson/");
			fs.writeFileSync(`${out}`, JSON.stringify(jsonOut));
		}
	}
	return true;
}

filterCSV(process.argv[2]);

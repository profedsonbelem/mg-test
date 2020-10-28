import { Translate } from "aws-sdk";
const translate = new Translate({ region: "us-east-1" });

export function processTranslateRequest(
  data: TranslateRequest
): Promise<string> {
  return new Promise(async (res, rej) => {
    translate.translateText(data, function (err, dat) {
      if (!!err) {
        console.log("Error: ", err);
        rej(err);
      } else {
        res(dat.TranslatedText);
      }
    });
  });
}

export interface TranslateRequest {
  SourceLanguageCode: string;
  TargetLanguageCode: string;
  Text: string;
  TerminologyNames?: string[];
}

import { TranslateRequest } from "../../src/modules/translate/doTranslate";

const body: { data: TranslateRequest } = {
  data: {
    SourceLanguageCode: "EN",
    TargetLanguageCode: "PT",
    Text: "Translate this text.",
    TerminologyNames: [],
  },
};

import { Question } from "./question";

export class Survey {
  id: string;
  name: string;
  startPage: string;
  pages: {
    [id: string]: Page;
  };
}

export class Page {
  questions: Question[];
  nextPage: string;
  SkipIf?: {
    aggregator: "any" | "none" | "all";
    conditions: { key: string; condition: string; value: string | boolean }[];
  };
  order: number;
}

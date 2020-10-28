export class Question {
  id?: string;
  next?: { [id: string]: string };
  text?: string;
  type?: QuestionType;
  questAns?: string[];
  possibleChoices?: { [options: string]: string };
  questionnaire?: string;
  cols?: string[];
  prefills?: any[];
  mask?: string;
  logic?: Logic[];
  validate?: RegExp;
}
export enum LOGIC_SKIP_TYPES {
  CHOICE_IS,
  CONTAINS,
  NOT_CONTAINS,
  CHOICE_IS_NOT,
}

export enum LOGIC_ACTION_TYPES {
  JUMP_TO,
  SKIP_OVER,
}
class Logic {
  condition: LOGIC_SKIP_TYPES;
  answer: string;
  action: LOGIC_ACTION_TYPES;
  page_id: string;
}

export type QuestionType =
  | "MULTI"
  | "MULTIM"
  | "YESNO"
  | "SHORT"
  | "LONG"
  | "SINGFILE"
  | "MULTFILE"
  | "TABLE"
  | "SIGNATURE"
  | "MASK"
  | "INTEGER"
  | "BLOCKING_TABLE"
  | "CURRENCY"
  | "EXPLANATION"
  | "REDIRECT"
  | "ADDRESS";

export const QuestionTypeV = [
  "MULTI",
  "MULTIM",
  "YESNO",
  "SHORT",
  "LONG",
  "SINGFILE",
  "MULTFILE",
  "TABLE",
  "SIGNATURE",
  "MASK",
  "INTEGER",
  "BLOCKING_TABLE",
  "CURRENCY",
  "EXPLANATION",
  "REDIRECT",
];

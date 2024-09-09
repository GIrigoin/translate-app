export interface State {
  sourceLangIndex: number;
  resultLangIndex: number;
  sourceText: string;
  resultText: string;
  translate: boolean;
}

//Action Types
export type SET_SOURCE_LANGUAGE = "SET_SOURCE_LANGUAGE";
export type SET_RESULT_LANGUAGE = "SET_RESULT_LANGUAGE";
export type SWAP_LANGUAGES = "SWAP_LANGUAGES";
export type SET_SOURCE_TEXT = "SET_SOURCE_TEXT";
export type SET_RESULT_TEXT = "SET_RESULT_TEXT";
export type SET_TRANSLATE = "SET_TRANSLATE";

export type Action =
  | { type: SET_SOURCE_LANGUAGE; payload: number }
  | { type: SET_RESULT_LANGUAGE; payload: number }
  | { type: SWAP_LANGUAGES }
  | { type: SET_SOURCE_TEXT; payload: string }
  | { type: SET_RESULT_TEXT; payload: string }
  | { type: SET_TRANSLATE; payload: boolean };

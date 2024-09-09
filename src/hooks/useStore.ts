import { useReducer } from "react";
import { type State, type Action } from "../types";

//Initial State
const initialState = {
  sourceLangIndex: 0,
  resultLangIndex: 1,
  sourceText: "Hello, how are you?",
  resultText: "",
  translate: true,
};

//Reducer
function reducer(state: State, action: Action) {
  if (action.type === "SET_SOURCE_LANGUAGE") {
    if (action.payload === state.sourceLangIndex) return state;
    return { ...state, sourceLangIndex: action.payload, resultText: "" };
  }

  if (action.type === "SET_RESULT_LANGUAGE") {
    if (action.payload === state.resultLangIndex) return state;
    return { ...state, resultLangIndex: action.payload, resultText: "" };
  }

  if (action.type === "SWAP_LANGUAGES") {
    return {
      ...state,
      sourceLangIndex: state.resultLangIndex,
      resultLangIndex: state.sourceLangIndex,
      resultText: "",
    };
  }

  if (action.type === "SET_SOURCE_TEXT") {
    return { ...state, sourceText: action.payload, resultText: "" };
  }

  if (action.type === "SET_RESULT_TEXT") {
    return { ...state, resultText: action.payload };
  }

  if (action.type === "SET_TRANSLATE") {
    return { ...state, translate: action.payload };
  }

  return state;
}

export function useStore() {
  const [
    { sourceLangIndex, resultLangIndex, sourceText, resultText, translate },
    dispatch,
  ] = useReducer(reducer, initialState);

  const setSourceLanguage = (payload: number) => {
    dispatch({ type: "SET_SOURCE_LANGUAGE", payload });
  };

  const setResultLanguage = (payload: number) => {
    dispatch({ type: "SET_RESULT_LANGUAGE", payload });
  };

  const swapLanguages = () => {
    dispatch({ type: "SWAP_LANGUAGES" });
  };

  const setSourceText = (payload: string) => {
    dispatch({ type: "SET_SOURCE_TEXT", payload });
  };

  const setResultText = (payload: string) => {
    dispatch({ type: "SET_RESULT_TEXT", payload });
  };

  const setTranslate = (payload: boolean) => {
    dispatch({ type: "SET_TRANSLATE", payload });
  };

  return {
    sourceLangIndex,
    resultLangIndex,
    sourceText,
    resultText,
    translate,
    setSourceLanguage,
    setResultLanguage,
    swapLanguages,
    setSourceText,
    setResultText,
    setTranslate,
  };
}

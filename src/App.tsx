import { useEffect } from "react";
import logo from "./assets/logo.svg";
import TranslatePanel from "./components/TranslatePanel";
import { useDebounce } from "./hooks/useDebounce";
import { useStore } from "./hooks/useStore";
import axios from "axios";
import { LANGUAGES } from "./constants";

function App() {
  const {
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
  } = useStore();

  const debouncedSource = useDebounce(sourceText);

  useEffect(() => {
    const translateText = async () => {
      const URL = "https://api.mymemory.translated.net/get?";

      let translatedText = "Something went wrong, try again later.";
      try {
        const { data } = await axios(
          `${URL}q=${debouncedSource}&langpair=${LANGUAGES[sourceLangIndex].code}|${LANGUAGES[resultLangIndex].code}`
        );
        translatedText = data.responseData.translatedText;
        setResultText(translatedText);
      } catch (error) {
        setResultText(translatedText);
      }
    };
    if (translate) {
      if (debouncedSource === "") return;
      if (sourceLangIndex === resultLangIndex) return setResultText(sourceText);
      translateText();
    }
  }, [debouncedSource, sourceLangIndex, resultLangIndex, translate]);

  return (
    <div className="bg-dark h-full">
      <div className="text-center bg-dark  text-main-text  h-full bg-app-bg bg-[length:1280px_460px] bg-no-repeat bg-top flex flex-col items-center px-16 pt-24 pb-40 ">
        <img src={logo} alt="" />
        <div className="flex flex-col xl:flex-row">
          <TranslatePanel
            role="source"
            value={sourceText}
            onChangeLanguage={setSourceLanguage}
            onChangeText={setSourceText}
            langIndex={sourceLangIndex}
            translate={translate}
            onTranslateClick={setTranslate}
          />
          <TranslatePanel
            role="result"
            value={resultText}
            onChangeLanguage={setResultLanguage}
            langIndex={resultLangIndex}
            onSwapClick={swapLanguages}
          />
        </div>
      </div>
    </div>
  );
}

export default App;

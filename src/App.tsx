import logo from "./assets/logo.svg";
import TranslatePanel from "./components/TranslatePanel";
import { useStore } from "./hooks/useStore";

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
  return (
    <div className="bg-dark h-full">
      <div className="text-center bg-dark  text-main-text  h-full bg-app-bg bg-[length:1280px_460px] bg-no-repeat bg-top flex flex-col items-center px-16 pt-24 pb-40 ">
        <img src={logo} alt="" />
        <div className="flex flex-col xl:flex-row">
          <TranslatePanel
            role="source"
            value={sourceText}
            onChangeLanguage={setSourceLanguage}
          />
          <TranslatePanel
            role="result"
            value={resultText}
            onChangeLanguage={setResultLanguage}
          />
        </div>
      </div>
    </div>
  );
}

export default App;

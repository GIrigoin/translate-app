import { LANGUAGES } from "../constants";
import Button from "./Button";
import swap from "../assets/Horizontal_top_left_main.svg";
import translate from "../assets/Sort_alfa.svg";
import talk from "../assets/sound_max_fill.svg";
import copy from "../assets/Copy.svg";

type Props =
  | {
      role: "source";
      value: string;
      onChangeLanguage: (index: number) => void;
      onChangeText: (text: string) => void;
      langIndex: number;
      translate: boolean;
      onTranslateClick: (value: boolean) => void;
    }
  | {
      role: "result";
      value: string;
      onChangeLanguage: (index: number) => void;
      langIndex: number;
      swap: boolean;
      onSwapClick: () => void;
    };

const TranslatePanel = (props: Props) => {
  const handleClipboard = () => {
    if (props.value !== "") navigator.clipboard.writeText(props.value);
  };

  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(props.value);
    utterance.lang = LANGUAGES[props.langIndex].code;
    utterance.rate = 0.8;
    utterance.pitch = 0.5;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div
      className={`main-text border border-secondary-text rounded-3xl m-2 p-6 pt-0 w-[37rem] h-[21rem] lg:w-[55rem] xl:w-[35rem] ${
        props.role === "source" ? "bg-source-textarea" : "bg-result-textarea"
      } p-4`}
    >
      <div className="border-b border-secondary-text h-[4.75rem]  mb-4 flex flex-row justify-between items-center">
        <div>
          {props.role === "source" && (
            <label htmlFor="source-detect">
              <input
                className={`peer/${props.role} appearance-none`}
                type="radio"
                name={props.role}
                id="source-detect"
                value={-1}
                onChange={() => props.onChangeLanguage(-1)}
              />
              <span
                className={`text-medium mx-2 p-2 rounded-lg   font-bold ${
                  props.langIndex === -1
                    ? "text-main-text bg-active-lang-bg"
                    : "text-active-lang-bg bg-none"
                }`}
              >
                Detect Language
              </span>
            </label>
          )}
          {LANGUAGES.map((lang, index) => (
            <label htmlFor={props.role + lang.code}>
              <input
                className={`appearance-none`}
                type="radio"
                name={props.role}
                id={props.role + lang.code}
                value={index}
                onChange={() => props.onChangeLanguage(index)}
              />
              <span
                className={`text-medium mx-2 p-2 rounded-lg font-bold ${
                  index === props.langIndex
                    ? "text-main-text bg-active-lang-bg"
                    : "text-active-lang-bg bg-none"
                }`}
              >
                {lang.name}
              </span>
            </label>
          ))}
        </div>

        {props.role === "result" && (
          <Button
            src={swap}
            alt="swap"
            onClick={props.onSwapClick}
            disabled={!props.swap}
          />
        )}
      </div>
      <div className="pb-4 static h-[14rem]">
        {props.role === "source" ? (
          <textarea
            className={
              "main-text font-bold bg-[#00000000] w-full h-[14rem] rounded-lg p-1 resize-none"
            }
            name=""
            id=""
            maxLength={500}
            value={props.value}
            onChange={(event) => props.onChangeText(event.target.value)}
          ></textarea>
        ) : (
          <textarea
            className={
              "main-text font-bold bg-[#00000000] w-full  h-[14rem] rounded-lg p-1 resize-none"
            }
            name=""
            id=""
            maxLength={500}
            readOnly={props.role === "result"}
            value={props.value}
          ></textarea>
        )}

        <div
          className={`relative ${
            props.role === "source" ? "bottom-[5.5rem]" : "bottom-[2.75rem]"
          }  flex flex-row justify-between items-end`}
        >
          <div className="flex flex-row justify-start gap-2">
            <Button src={talk} alt="Read" onClick={handleSpeak} />

            <Button
              src={copy}
              alt="Copy to clipboard"
              onClick={handleClipboard}
            />
          </div>
          {props.role === "source" && (
            <div className=" flex flex-col justify-start items-end">
              <p className="mb-2 text-small text-active-lang-bg font-semibold">{`${props.value.length}/500`}</p>
              <input
                className="peer/translate appearance-none"
                type="checkbox"
                name="translate-switch"
                value="Translate"
                id="translate"
                onChange={() => props.onTranslateClick(!props.translate)}
                checked={props.translate}
              />
              <label
                className="w-[9.5rem] h-12 flex flex-row items-center justify-center rounded-lg border border-button-border hover:cursor-pointer  peer-checked/translate:bg-button-bg bg-button-border transition-colors duration-100"
                htmlFor="translate"
              >
                <img className="w-6 h-6" src={translate} alt="" />
                <span>Translate</span>
              </label>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TranslatePanel;

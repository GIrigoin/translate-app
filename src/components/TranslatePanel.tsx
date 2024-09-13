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
      className={`main-text w-[37rem] h-[21rem] lg:w-[55rem] xl:w-[35rem] ${
        props.role === "source" ? "bg-source-textarea" : "bg-result-textarea"
      } p-4`}
    >
      <div className="border-b border-secondary-text mb-4">
        {props.role === "source" && (
          <label htmlFor="source-detect">
            <input
              type="radio"
              name={props.role}
              id="source-detect"
              value={-1}
              onChange={() => props.onChangeLanguage(0)}
            />
            <span>Detect Language</span>
          </label>
        )}
        {LANGUAGES.map((lang, index) => (
          <label htmlFor={props.role + lang.code}>
            <input
              type="radio"
              name={props.role}
              id={props.role + lang.code}
              value={index}
              onChange={() => props.onChangeLanguage(index)}
              checked={index === props.langIndex}
            />
            <span>{lang.name}</span>
          </label>
        ))}
        {props.role === "result" && (
          <Button src={swap} alt="swap" onClick={props.onSwapClick} />
        )}
      </div>
      <div>
        {props.role === "source" ? (
          <textarea
            className={"main-text bg-[#00000000] w-full "}
            name=""
            id=""
            maxLength={500}
            value={props.value}
            onChange={(event) => props.onChangeText(event.target.value)}
          ></textarea>
        ) : (
          <textarea
            className={"main-text bg-[#00000000] w-full "}
            name=""
            id=""
            maxLength={500}
            readOnly={props.role === "result"}
            value={props.value}
          ></textarea>
        )}

        <div>
          <Button src={talk} alt="Read" onClick={handleSpeak} />

          <Button
            src={copy}
            alt="Copy to clipboard"
            onClick={handleClipboard}
          />
        </div>
        {props.role === "source" && (
          <div>
            <p>{`${props.value.length}/500`}</p>
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
  );
};

export default TranslatePanel;

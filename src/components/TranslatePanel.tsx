import { LANGUAGES } from "../constants";
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
    }
  | {
      role: "result";
      value: string;
      onChangeLanguage: (index: number) => void;
    };

const TranslatePanel = (props: Props) => {
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
            />
            <span>{lang.name}</span>
          </label>
        ))}
        {props.role === "result" && (
          <button>
            <img src={swap} alt="swap" />
          </button>
        )}
      </div>
      <div>
        <textarea
          className={"main-text bg-[#00000000] w-full "}
          name=""
          id=""
          maxLength={500}
          readOnly={props.role === "result"}
          value={props.value}
          onChange={props.role === "source" && onChangeText}
        ></textarea>
        <div>
          <button>
            <img src={talk} alt="Read" />
          </button>
          <button>
            <img src={copy} alt="Copy to clipboard" />
          </button>
        </div>
        {props.role === "source" && (
          <div>
            <p>x/500</p>
            <button>
              <img src={translate} alt="" />
              <span>Translate</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TranslatePanel;

type Props = {
  src: string;
  alt: string;
  onClick: () => void;
};

const Button = (props: Props) => {
  return (
    <button
      className="w-9 h-9 border-[3px] border-secondary-text rounded-lg active:bg-textarea-border transition-colors duration-150 flex items-center justify-center"
      onClick={props.onClick}
    >
      <img src={props.src} alt={props.alt} />
    </button>
  );
};

export default Button;

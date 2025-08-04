interface ButtonProps {
  text: string;
  onClick?: () => void;
  type?: "button" | "submit";
}

export default function Button({ text, onClick, type = "button" }: ButtonProps) {
  return (
    <button className="btn" onClick={onClick} type={type}>
      {text}
    </button>
  );
}

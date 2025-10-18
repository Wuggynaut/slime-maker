import { FaDice } from "react-icons/fa";

interface RerollButtonProps {
  onClick: () => void;
  style?: React.CSSProperties;
}

export function RerollButton({ onClick, style }: RerollButtonProps) {
  return (
    <button onClick={onClick} className='icon-button' style={style}>
      <FaDice />
    </button>
  );
}
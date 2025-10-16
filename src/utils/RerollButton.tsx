import { FaDice } from "react-icons/fa";

export function RerollButton({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className='icon-button'>
      <FaDice />
    </button>
  );
}
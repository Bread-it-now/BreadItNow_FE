interface Props {
  id: string;
  checked: boolean;
  onChange: () => void | Promise<void>;
}

function Checkbox({ id, checked, onChange }: Props) {
  return (
    <label
      className={`checkbox ${
        checked ? "bg-primary border-primary" : "bg-white  border-gray-300"
      }`}
      htmlFor={id}
    >
      <svg
        width="11"
        height="8"
        viewBox="0 0 11 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 3.72727L4.375 7L10 1"
          stroke={checked ? "white" : "#B2B4B6"}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <input
        className="hidden"
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
      />
    </label>
  );
}

export default Checkbox;

interface SelectedItemProps {
  label?: string;
  checked: boolean;
  onClick?: () => void;
}

const SelectedItem = ({ checked, label, onClick }: SelectedItemProps) => {
  return (
    <div
      onClick={onClick}
      className={`flex justify-center items-center px-6 gap-[10px] w-full h-[48px] border rounded-lg hover:cursor-pointer ${checked ? 'border-primary text-primary bg-primaryLight' : 'border-gray200 text-gray900 bg-white'}`}>
      {label && <label className="text-title-content-s">{label}</label>}
    </div>
  );
};

export default SelectedItem;

import { FC } from "react";

type props = {
  label: string;
  imageUrl: string;
  value: string;
  type: string;
  name: string;
  onChange: (newValue: string) => void;
  onBlur: () => void;
  isError: boolean | undefined;
  error: string | undefined;
};
const AuthField: FC<props> = ({
  label,
  imageUrl,
  value,
  type,
  name,
  onChange,
  onBlur,
  isError,
  error,
}) => {
  return (
    <div className="mt-4 flex flex-col">
      <div className="flex h-14 w-80 bg-[#F3F3F3] rounded">
        <img src={imageUrl} className="ml-3 w-6 object-fill self-center" />
        <div className="flex flex-col w-full">
          <label className="ml-3 mt-1 text-[#808080] text-md">{label}</label>
          <input
            type={type}
            name={name}
            placeholder={label}
            className="input input-sm ml-0 h-10 max-w-xs bg-[#F3F3F3] w-auto outline-none focus:bg-[#F3F3F3] focus:outline-none focus:border-none appearance-none "
            value={value}
            onBlur={onBlur}
            onChange={onChange}
          />
        </div>
      </div>
      {isError && error !== undefined && error.length > 0 && (
        <p className="mt-1 text-red-500 text-sm">{error}</p>
      )}
    </div>
  );
};

export default AuthField;

import React, { ReactNode } from 'react';

interface SignupInputProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  children?: ReactNode;
}

const SignupInput: React.FC<SignupInputProps> = ({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  children,
}) => (
  <div>
    <label
      htmlFor={id}
      className="block mb-1 text-sm font-medium text-gray-700"
    >
      {label}
    </label>
    <div className="flex gap-2 justify-between items-center">
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full p-2 border border-[#D4D4D4] rounded-md focus:outline-none focus:ring focus:ring-1 focus:ring-[#6A1B1A]"
      />
      {children}
    </div>
  </div>
);

export default SignupInput;

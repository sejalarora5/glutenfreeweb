// CustomInput.tsx

import React, { InputHTMLAttributes, ReactNode } from 'react';

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
    icon: ReactNode; // Change the type to ReactNode to accept any React element as an icon
    placeholder: string
}

const CustomInput: React.FC<CustomInputProps> = ({ icon, placeholder,value, ...inputProps }) => {
    return (
        <div className="relative my-3 flex items-cente">
            <span className="absolute h-8 w-8 inset-y-3 left-0 pl-2">
                {icon}
            </span>
            <input
                value={value ? value : ''}
                placeholder={placeholder}
                className="pl-10 pr-4 py-3  bg-gray-200 border rounded-md focus:outline-none shadow-md focus:border-gray-300"
                {...inputProps}
            />
        </div>
    );
};

export default CustomInput;

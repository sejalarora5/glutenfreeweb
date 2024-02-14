// CustomInput.tsx

import React, { InputHTMLAttributes, ReactNode } from 'react';

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
    icon: ReactNode; // Change the type to ReactNode to accept any React element as an icon
    placeholder: string
    isReadOnly?: boolean
}

const CustomInput: React.FC<CustomInputProps> = ({ icon, placeholder, value, isReadOnly, ...inputProps }) => {
    return (
        <div className="relative my-3 flex items-cente">
            <span className="absolute h-8 w-8 inset-y-3 left-0 pl-2">
                {icon}
            </span>
            <input
                value={value ? value : ''}
                placeholder={placeholder}
                readOnly={isReadOnly}
                className={`pl-10 pr-10 py-3 md:text-md text-sm w-72 sm:w-64 md:w-72 lg:w-90 ${isReadOnly && 'bg-gray-300'} bg-gray-200 border rounded-md focus:outline-none shadow-md focus:border-gray-300`}
                {...inputProps}
            />

        </div>
    );
};

export default CustomInput;

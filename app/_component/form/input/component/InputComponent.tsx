import React, { InputHTMLAttributes, forwardRef } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

const style = 'border rounded w-full my-1 px-2 py-1 outline-none';
const focusStyle = 'focus:border-primary-500 focus:border-2';

export type InputAttr = InputHTMLAttributes<HTMLInputElement>;
const InputComponent = forwardRef<
    HTMLInputElement,
    UseFormRegisterReturn & InputAttr
>((props, ref) => (
    <input
        {...props}
        ref={ref}
        className={`${style} ${focusStyle} ${props.className}`}
        onFocus={(event) => {
            if (props.type === 'number' && !parseInt(event.target.value))
                event.target.value = '';
        }}
        onBlur={(event) => {
            if (props.type === 'number' && !parseInt(event.target.value))
                event.target.value = '0';
            props.onBlur(event);
        }}
    />
));
InputComponent.displayName = 'Input';

export default InputComponent;

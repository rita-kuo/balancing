import { InputHTMLAttributes } from 'react';

type InputAttr = InputHTMLAttributes<HTMLInputElement>;
export type InputProps<T> = Omit<InputAttr, 'onChange'> &
    Record<keyof Pick<InputAttr, 'onChange'>, (val: T) => void>;

const style = 'border rounded w-full my-1 px-2 py-1 outline-none';
const focusStyle = 'focus:border-primary-500 focus:border-2';

const Input: React.FC<InputAttr> = (props) => {
    return (
        <input
            {...props}
            className={`${style} ${focusStyle} ${props.className}`}
        />
    );
};

export default Input;

import { IoCheckbox, IoSquareOutline } from 'react-icons/io5';

interface CheckboxProps {
    value: boolean;
    title: string;
    onChange: (val: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = (props) => {
    return (
        <div
            className='flex items-center gap-1 select-none cursor-pointer'
            onClick={() => props.onChange(!props.value)}
        >
            <div>{props.value ? <IoCheckbox /> : <IoSquareOutline />}</div>
            <div>{props.title}</div>
        </div>
    );
};

export default Checkbox;

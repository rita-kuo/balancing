import React from "react";
import Button, {ButtonProps} from "@/app/_component/button/Button";


const style =
    'flex items-center gap-1 py-2 px-3 rounded select-none bg-primary-400';
const hoverStyle = 'hover:bg-primary-500';
const disabledStyle = 'disabled:bg-gray-200 disabled:text-gray-300';
const OutlineButton: React.FC<ButtonProps> = (props) => <Button
    {...props}
    defaultStyle='bg-white border-2 border-primary-500'
    hoverStyle='hover:bg-primary-200'
    disabledStyle='disabled:border-gray-200 disabled:text-gray-300'
/>

export default OutlineButton;
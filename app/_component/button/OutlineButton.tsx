import React from "react";
import Button, { ButtonProps } from "@/app/_component/button/Button";
import clsx from "clsx";

const baseStyle = "bg-white border-2 border-primary-500";
const hoverStyle = "hover:bg-primary-200";
const disabledStyle = "disabled:border-gray-200 disabled:text-gray-300";
const OutlineButton: React.FC<ButtonProps> = (props) => (
  <Button
    {...props}
    baseStyle={clsx(baseStyle, props.baseStyle)}
    hoverStyle={clsx(hoverStyle, props.hoverStyle)}
    disabledStyle={clsx(disabledStyle, props.disabledStyle)}
  />
);

export default OutlineButton;

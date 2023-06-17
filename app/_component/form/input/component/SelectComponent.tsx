'use client';

import { ForwardedRef } from 'react';
import { SelectHTMLAttributes, forwardRef } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

type SelectAttr = SelectHTMLAttributes<HTMLSelectElement>;

export interface SelectOption<T> {
    title: string;
    value: T;
}

export interface SelectProps<T> extends SelectAttr {
    select?: string;
    options: SelectOption<T>[];
}

const Select = <T,>(
    props: UseFormRegisterReturn & SelectProps<T>,
    ref: ForwardedRef<HTMLSelectElement>
) => (
    <select {...props} ref={ref}>
        {props.options.map((option, index) => (
            <option
                key={`option-${index}`}
                value={
                    typeof option.value === 'string'
                        ? option.value
                        : JSON.stringify(option.value)
                }
            >
                {option.title}
            </option>
        ))}
    </select>
);

const SelectComponent = forwardRef(Select);
SelectComponent.displayName = 'Input';

export default SelectComponent;

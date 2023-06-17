'use client';

import { useEffect } from 'react';

export interface SelectOption<T> {
    title: string;
    value: string;
    item?: T;
}

interface SelectProps<T> {
    select?: string;
    options: SelectOption<T>[];
    className?: string;
    onChange: (option?: SelectOption<T>) => void;
}

const Select = <T,>(props: SelectProps<T>) => {
    useEffect(() => {
        if (!props.select) {
            const onChange = props.onChange;
            onChange(props.options[0]);
        }
    }, [props.onChange, props.options, props.select]);

    return (
        <select
            className={props.className}
            onChange={(event) =>
                props.onChange(
                    props.options.find(
                        (option) => option.value === event.target.value
                    )
                )
            }
            value={props.select}
        >
            {props.options.map((option) => (
                <option key={`option-${option.value}`} value={option.value}>
                    {option.title}
                </option>
            ))}
        </select>
    );
};

export default Select;

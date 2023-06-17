import { SelectOption } from './component/SelectComponent';
import { RegisterOptions, useFormContext } from 'react-hook-form';
import { useCallback, useEffect, useMemo, useState } from 'react';
import CheckboxComponent from './component/CheckboxComponent';

interface CheckboxMultiSelectProps<T> {
    name: string;
    options: SelectOption<T>[];
    registerOption?: RegisterOptions;
    defaultValue?: T[];
}

const CheckboxMultiSelect = <T,>(props: CheckboxMultiSelectProps<T>) => {
    const { setValue, register, trigger } = useFormContext();
    const [values, setValues] = useState<T[]>(props.defaultValue || []);

    const allSelected = useMemo(
        () => values.length === props.options.length,
        [values, props.options]
    );

    const onAllChange = useCallback(() => {
        setValues(
            allSelected ? [] : props.options.map((option) => option.value)
        );
    }, [props.options, allSelected]);

    const onOptionChange = useCallback(
        (option: T, check: boolean) => {
            setValues(
                check
                    ? [...values, option]
                    : values.filter((val) => val !== option)
            );
        },
        [values]
    );

    useEffect(() => {
        register(props.name, {
            ...props.registerOption,
            value: props.registerOption?.value || [],
        });
    }, [register, props.registerOption, props.name]);

    useEffect(() => {
        setValue(props.name, values);
        trigger(props.name);
    }, [props.name, setValue, values, trigger]);

    return (
        <div>
            <CheckboxComponent
                title={allSelected ? '取消選取全部' : '選取全部'}
                value={allSelected}
                onChange={onAllChange}
            />
            {props.options.map((option, index) => (
                <CheckboxComponent
                    key={index}
                    title={option.title}
                    value={values.includes(option.value)}
                    onChange={(check) => onOptionChange(option.value, check)}
                />
            ))}
        </div>
    );
};

export default CheckboxMultiSelect;

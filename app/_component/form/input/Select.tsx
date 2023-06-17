import { RegisterOptions, useFormContext } from 'react-hook-form';
import SelectComponent, { SelectProps } from './component/SelectComponent';
import { useMemo } from 'react';

export const Select = <T,>(
    props: SelectProps<T> & { name: string; registerOption?: RegisterOptions }
) => {
    const { registerOption, ...selectProps } = useMemo(() => props, [props]);
    const { register } = useFormContext();

    return (
        <SelectComponent
            {...selectProps}
            {...register(props.name, registerOption)}
        />
    );
};

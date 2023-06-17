import { InputHTMLAttributes, useMemo } from 'react';
import InputComponent from '../input/component/InputComponent';
import Field, { FieldProps } from './Field';
import { genRegisterOptions } from '../input/Input';
import React from 'react';

type InputFieldProps = Omit<FieldProps, 'children'> &
    InputHTMLAttributes<HTMLInputElement>;

export const InputField: React.FC<InputFieldProps> = (props) => {
    const option = useMemo(() => genRegisterOptions(props), [props]);

    return (
        <Field {...props} option={option}>
            {(register) => <InputComponent {...props} {...register} />}
        </Field>
    );
};

InputField.displayName = 'InputField';

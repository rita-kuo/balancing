import { RegisterOptions, useFormContext } from 'react-hook-form';
import InputComponent, { InputAttr } from './component/InputComponent';
import { useMemo } from 'react';

import React from 'react';

export const genRegisterOptions = (props: InputProps) => {
    const res = { ...props.option } as RegisterOptions;
    if (props.required) {
        res.required = '必填欄位';
    }

    const isNumber = props.type === 'number';
    res.valueAsNumber = isNumber;
    if (isNumber) {
        res.value = res.value || 0;
        res.validate = {
            ...res.validate,
            numFormat: (val) => !!val || '請輸入數字',
        };
    }

    return res;
};

type InputProps = InputAttr & { name: string; option?: RegisterOptions };
export const Input: React.FC<InputProps> = (props) => {
    const { register } = useFormContext();
    const option = useMemo(() => genRegisterOptions(props), [props]);
    return <InputComponent {...props} {...register(props.name, option)} />;
};

export default Input;

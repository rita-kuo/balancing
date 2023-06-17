import { Currency } from '@prisma/client';
import {
    SelectOption,
} from '../../form/input/component/SelectComponent';
import React, { useMemo } from 'react';
import { FieldProps } from '../../form/field/Field';
import { Select } from '../../form/input/Select';
import SelectField from '../../form/field/SelectField';

const currencies: SelectOption<Currency>[] = [
    {
        title: '台幣',
        value: 'TWD',
    },
    {
        title: '日幣',
        value: 'YEN',
    },
];

export const CurrencySelect: React.FC<{
    name: string;
    defaultValue?: Currency;
}> = (props) => {
    const registerOption = useMemo(
        () => ({
            value: props.defaultValue || Currency.TWD,
        }),
        [props.defaultValue]
    );

    return (
        <Select
            name={props.name}
            options={currencies}
            registerOption={registerOption}
        />
    );
};

export const CurrencySelectField: React.FC<
    Pick<FieldProps, 'name' | 'label'> & { defaultValue?: Currency }
> = (props) => (
    <SelectField
        name={props.name}
        label={props.label}
        options={currencies}
        direction='horizontal'
        option={{ value: props.defaultValue || Currency.TWD }}
    />
);

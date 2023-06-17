import { DetailType } from '@prisma/client';
import { SelectOption } from '../../form/input/component/SelectComponent';
import SelectField from '../../form/field/SelectField';
import React from 'react';

const options: SelectOption<DetailType>[] = [
    {
        title: '支出',
        value: DetailType.EXPENSE,
    },
    {
        title: '收入',
        value: DetailType.INCOME,
    },
];

const DetailTypeField: React.FC = () => {
    return (
        <SelectField
            label='類型'
            name='type'
            options={options}
            option={{ value: DetailType.EXPENSE }}
        />
    );
};

export default DetailTypeField;

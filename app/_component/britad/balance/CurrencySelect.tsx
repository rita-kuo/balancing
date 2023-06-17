import { Currency } from '@prisma/client';
import Select, { SelectOption } from '../../input/Select';

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

const CurrencySelect: React.FC<{
    value: Currency;
    onChange: (val: Currency) => void;
}> = (props) => (
    <Select
        options={currencies}
        select={props.value}
        onChange={(option) => props.onChange(option?.value as Currency)}
    />
);

export default CurrencySelect;

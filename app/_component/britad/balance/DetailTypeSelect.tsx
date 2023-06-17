import { DetailType } from '@prisma/client';
import Select, { SelectOption } from '../../input/Select';

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

interface DetailTypeSelectProps {
    onChange: (type: DetailType) => void;
    type: DetailType;
}

const DetailTypeSelect: React.FC<DetailTypeSelectProps> = (props) => {
    return (
        <Select
            select={props.type}
            options={options}
            onChange={(option) => props.onChange(option?.value as DetailType)}
        />
    );
};

export default DetailTypeSelect;

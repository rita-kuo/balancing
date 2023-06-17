import Input, { InputProps } from './Input';

const NumberInput: React.FC<InputProps<number>> = (props) => {
    return (
        <Input
            {...props}
            type='number'
            onChange={(event) => props.onChange(parseInt(event.target.value))}
        />
    );
};

export default NumberInput;

import Input, { InputProps } from './Input';

const TextInput: React.FC<InputProps<string>> = (props) => {
    return (
        <Input
            {...props}
            type='text'
            onChange={(event) => props.onChange(event.target.value)}
        />
    );
};

export default TextInput;

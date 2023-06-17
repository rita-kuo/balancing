import SelectComponent, {
    SelectProps,
} from '../input/component/SelectComponent';
import Field, { FieldProps } from './Field';

type SelectFieldProps<T> = Omit<FieldProps, 'children'> & SelectProps<T>;
const SelectField = <T,>(props: SelectFieldProps<T>) => {
    return (
        <Field {...props} direction='horizontal'>
            {(register) => <SelectComponent {...props} {...register} />}
        </Field>
    );
};

export default SelectField;

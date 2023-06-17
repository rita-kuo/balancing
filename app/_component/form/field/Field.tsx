import { ReactNode, useMemo } from 'react';
import {
    RegisterOptions,
    UseFormRegisterReturn,
    useFormContext,
    useFormState,
} from 'react-hook-form';
import React from 'react';
import { ErrorMessage } from '@hookform/error-message';
import ErrorMessageLayout from '../ErrorMessageLayout';
import Title from './Title';

export interface FieldProps {
    direction?: 'vertical' | 'horizontal';
    required?: boolean;
    name: string;
    label: string;
    option?: RegisterOptions;
    children: (props: UseFormRegisterReturn) => ReactNode;
}

const Field: React.FC<FieldProps> = (props) => {
    const { register } = useFormContext();
    const { errors } = useFormState();
    const direction = useMemo(
        () =>
            props.direction === 'horizontal' ? 'flex gap-2 items-center' : '',
        [props.direction]
    );
    return (
        <div>
            <div className={direction}>
                <Title {...props} />
                {props.children(register(props.name, props.option))}
            </div>
            <ErrorMessage
                errors={errors}
                name={props.name}
                as={<ErrorMessageLayout />}
            />
        </div>
    );
};

export default Field;

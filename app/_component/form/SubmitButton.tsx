import { useFormState } from 'react-hook-form';
import Button, { ButtonProps } from '../button/Button';
import React from 'react';

type SubmitButtonProps = Omit<ButtonProps, 'onClick' | 'href' | 'loading'>;
const SubmitButton: React.FC<SubmitButtonProps> = (props) => {
    const { isSubmitting, isLoading, isValidating, isValid } = useFormState();
    return (
        <Button
            {...props}
            type='submit'
            disabled={props.disabled || !isValid}
            loading={isSubmitting || isLoading || isValidating}
        />
    );
};

export default SubmitButton;

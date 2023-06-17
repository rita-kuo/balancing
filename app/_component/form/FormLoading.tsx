import { useFormState } from 'react-hook-form';
import React from 'react';

const FormLoading: React.FC = () => {
    const { isLoading, isSubmitting, isValidating } = useFormState();

    // TODO: 實作 Form Loading;
    return isLoading || isSubmitting || isValidating ? <></> : <></>;
};

export default FormLoading;

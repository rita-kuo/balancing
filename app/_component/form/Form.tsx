import React, { FormHTMLAttributes, ReactNode } from "react";
import {
  FieldValues,
  FormProvider,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import FormLoading from "./FormLoading";

type FormProps = Omit<
  FormHTMLAttributes<HTMLFormElement>,
  "onSubmit" | "defaultValue"
> & {
  defaultValue?: FieldValues;
  onSubmit: (data: FieldValues) => void;
  children: ((method: UseFormReturn) => ReactNode) | ReactNode | ReactNode[];
};
const Form: React.FC<FormProps> = (props) => {
  const method = useForm({
    defaultValues: props.defaultValue,
  });

  return (
    <FormProvider {...method}>
      <FormLoading />
      <form
        {...props}
        defaultValue={undefined}
        onSubmit={method.handleSubmit(props.onSubmit)}
        className={`[&>*+*]:mt-4 ${props.className}`}
        noValidate
      >
        {props.children}
      </form>
    </FormProvider>
  );
};

export default Form;

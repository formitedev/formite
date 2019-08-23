import React from "react";

import { Fields, FieldValues, FormiteForm, FormOptions } from "formite-core";
import { useForm } from "formite-html";

import { FormContext } from "../FormContext";

export default function Form<Values extends FieldValues = FieldValues>(
    props: React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> & {
        children: (form: FormiteForm<Values>, fields: Fields<Values>) => React.ReactNode;
        initialValues: Values;
        onSubmitForm: (values: Values) => void | Promise<void>;
    } & FormOptions<Values>
) {
    const { children, initialValues, onSubmit, onSubmitForm, onValidate, validateInitialValues, ...rest } = props;
    const options = {
        onValidate,
        validateInitialValues
    };
    const form = useForm(initialValues, onSubmitForm, options);
    const { handleSubmit } = form;
    return (
        <FormContext.Provider value={{ form }}>
            <form onSubmit={handleSubmit} {...rest}>
                {children(form, form.fields)}
            </form>
        </FormContext.Provider>
    );
}

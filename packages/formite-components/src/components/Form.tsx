import React from "react";

import { Fields, FormiteForm, FormOptions, FormValues } from "formite-core";
import { useForm } from "formite-html";

import { FormContext } from "../FormContext";

/**
 * Form component.
 *
 * @remarks
 * The Form component uses `children` as a render prop. (see example)
 *
 * @example
 * ```typescript
 * <Form initialValues={{ firstName: "", lastName: "" }} onSubmitForm={handleSubmit} >
 *     {(form, fields) => (
 *         <InputField field={fields.firstName}>
 *             {field => <input type="text" placeholder="First name" {...field} />}
 *         </InputField>
 *     )}
 * </Form>
 * ```
 *
 * @remark
 * You can pass all standard HTML form properties to the Form component.
 */
export default function Form<Values extends FormValues>(
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

import React from "react";

import { Field, ValidateFieldHandler } from "formite-core";
import { FormiteInput, useInput } from "formite-html";

/**
 * InputField component to use a field with a standard HTML input element.
 *
 * @remarks
 * The InputField component uses `children` as a render prop. (see example)
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
 */
export default function InputField(props: {
    children: (inputField: FormiteInput) => React.ReactNode;
    field: Field;
    onValidate?: ValidateFieldHandler;
}) {
    const { children, field, onValidate } = props;
    const formField = useInput(field, onValidate);
    return <>{children(formField)}</>;
}

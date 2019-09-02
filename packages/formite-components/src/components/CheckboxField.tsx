import React from "react";

import { Field, ValidateFieldHandler } from "formite-core";
import { FormiteCheckbox, useCheckbox } from "formite-html";

/**
 * CheckboxField component to use a field with a standard HTML input element.
 *
 * @remarks
 * The CheckboxField component uses `children` as a render prop. (see example)
 *
 * @example
 * ```typescript
 * <Form initialValues={{ remember: false }} onSubmitForm={handleSubmit} >
 *     {(form, fields) => (
 *         <CheckboxField field={fields.remember}>
 *             {checkbox => (
 *                 <label><input {...checkbox} />Remember me</label>
 *             )}
 *         </CheckboxField>
 *     )}
 * </Form>
 * ```
 */
export default function CheckboxField(props: {
    children: (checkboxField: FormiteCheckbox) => React.ReactNode;
    field: Field<boolean>;
    onValidate?: ValidateFieldHandler;
}) {
    const { children, field, onValidate } = props;
    const formField = useCheckbox(field, onValidate);
    return <>{children(formField)}</>;
}

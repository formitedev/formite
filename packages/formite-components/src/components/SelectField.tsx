import React from "react";

import { Field, ValidateFieldHandler } from "formite-core";
import { FormiteSelect, useSelect } from "formite-html";

/**
 * SelectField component to use a field with a standard HTML input element.
 *
 * @remarks
 * The SelectField component uses `children` as a render prop. (see example)
 *
 * @example
 * ```typescript
 * <Form initialValues={{ country: "" }} onSubmitForm={handleSubmit} >
 *     {(form, fields) => (
 *         <SelectField field={fields.country}>
 *             {field => (
 *                 <select {...field}>
 *                     <option value="Germany">Germany</option>
 *                     <option value="USA">USA</option>
 *                 </select>
 *             )}
 *         </SelectField>
 *     )}
 * </Form>
 * ```
 */
export default function SelectField(props: {
    children: (selectField: FormiteSelect) => React.ReactNode;
    field: Field;
    onValidate?: ValidateFieldHandler;
}) {
    const { children, field, onValidate } = props;
    const formField = useSelect(field, onValidate);
    return <>{children(formField)}</>;
}

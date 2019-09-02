import React from "react";

import { Field as FieldType, FormiteField, useField, ValidateFieldHandler } from "formite-core";

/**
 * Field component to use a field with other components than standard HTML elements.
 *
 * @remarks
 * The Field component uses `children` as a render prop. (see example)
 *
 * @example
 * ```typescript
 * <Form initialValues={{ firstName: "", lastName: "" }} onSubmitForm={handleSubmit} >
 *     {(form, fields) => (
 *         <Field field={fields.firstName}>
 *             {field => (
 *                 <input
 *                     type="text"
 *                     placeholder="First name"
 *                     value={field.value}
 *                     onBlur={field.onBlur}
 *                     onChange={ev => field.onChange(ev.currentTarget.value)}
 *                 />
 *             )}
 *         </Field>
 *     )}
 * </Form>
 * ```
 *
 * @remarks
 * For standard HTML elements it is easier to use Formite's components like {@link InputField}
 */
export default function Field(props: {
    children: (field: FormiteField) => React.ReactNode;
    field: FieldType;
    onValidate?: ValidateFieldHandler;
}) {
    const { children, field, onValidate } = props;
    const formField = useField(field, onValidate);
    return <>{children(formField)}</>;
}

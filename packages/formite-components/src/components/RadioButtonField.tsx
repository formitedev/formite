import React from "react";

import { Field, ValidateFieldHandler } from "formite-core";
import { FormiteRadioButton, useRadioButton } from "formite-html";

/**
 * RadioButtonField component to use a field with a standard HTML input element.
 *
 * @remarks
 * The RadioButtonField component uses `children` as a render prop. (see example)
 *
 * @example
 * ```typescript
 * <Form initialValues={{ gender: "" }} onSubmitForm={handleSubmit} >
 *     {(form, fields) => (
 *             <div>
 *                 <RadioButtonField field={fields.gender} value="FEMALE"}>
 *                     {radioButton => (
 *                         <label><input {...radioButton} />Female</label>
 *                     )}
 *                 </RadioButtonField>
 *                 <RadioButtonField field={fields.gender} value="MALE">
 *                     {radioButton => (
 *                         <label><input {...radioButton} />Male</label>
 *                     )}
 *                 </RadioButtonField>
 *         </div>
 *     )}
 * </Form>
 * ```
 */
export default function RadioButtonField(props: {
    children: (radioButtonField: FormiteRadioButton) => React.ReactNode;
    field: Field;
    value: string | number;
    onValidate?: ValidateFieldHandler;
}) {
    const { children, field, onValidate, value } = props;
    const formField = useRadioButton(field, value, onValidate);
    return <>{children(formField)}</>;
}

import React from "react";

import { Field, ValidateFieldHandler } from "formite-core";
import { FormiteCheckbox, useCheckbox } from "formite-html";

import { useFormite } from "../FormContext";

export default function CheckboxField(props: {
    children: (checkboxField: FormiteCheckbox) => React.ReactNode;
    field: Field<unknown>;
    onValidate?: ValidateFieldHandler;
}) {
    const { children, field, onValidate } = props;
    const context = useFormite();
    const formField = useCheckbox(context.form, field, onValidate);
    return <>{children(formField)}</>;
}

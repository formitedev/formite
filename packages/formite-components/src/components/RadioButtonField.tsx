import React from "react";

import { Field, ValidateFieldHandler } from "formite-core";
import { FormiteRadioButton, useRadioButton } from "formite-html";

import { useFormite } from "../FormContext";

export default function RadioButtonField(props: {
    children: (radioButtonField: FormiteRadioButton) => React.ReactNode;
    field: Field<unknown>;
    value: string | number;
    onValidate?: ValidateFieldHandler;
}) {
    const { children, field, onValidate, value } = props;
    const context = useFormite();
    const formField = useRadioButton(context.form, field, value, onValidate);
    return <>{children(formField)}</>;
}

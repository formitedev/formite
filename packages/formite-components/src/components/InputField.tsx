import React from "react";

import { Field, ValidateFieldHandler } from "formite-core";
import { FormiteInput, useInput } from "formite-html";

import { useFormite } from "../FormContext";

export default function InputField(props: {
    children: (inputField: FormiteInput) => React.ReactNode;
    field: Field<unknown>;
    onValidate?: ValidateFieldHandler;
}) {
    const { children, field, onValidate } = props;
    const context = useFormite();
    const formField = useInput(context.form, field, onValidate);
    return <>{children(formField)}</>;
}

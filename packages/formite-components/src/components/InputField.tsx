import React from "react";

import { Field, ValidateFieldHandler } from "formite-core";
import { FormiteInput, useInput } from "formite-html";

export default function InputField(props: {
    children: (inputField: FormiteInput) => React.ReactNode;
    field: Field<unknown>;
    onValidate?: ValidateFieldHandler;
}) {
    const { children, field, onValidate } = props;
    const formField = useInput(field, onValidate);
    return <>{children(formField)}</>;
}

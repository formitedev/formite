import React from "react";

import { Field, ValidateFieldHandler } from "formite-core";
import { FormiteSelect, useSelect } from "formite-html";

import { useFormite } from "../FormContext";

export default function SelectField(props: {
    children: (selectField: FormiteSelect) => React.ReactNode;
    field: Field<unknown>;
    onValidate?: ValidateFieldHandler;
}) {
    const { children, field, onValidate } = props;
    const context = useFormite();
    const formField = useSelect(context.form, field, onValidate);
    return <>{children(formField)}</>;
}

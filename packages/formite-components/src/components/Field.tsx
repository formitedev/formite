import React from "react";

import { Field as FieldType, FormiteField, useField, ValidateFieldHandler } from "formite-core";

import { useFormite } from "../FormContext";

export default function Field(props: {
    children: (field: FormiteField) => React.ReactNode;
    field: FieldType<unknown>;
    onValidate?: ValidateFieldHandler;
}) {
    const { children, field, onValidate } = props;
    const context = useFormite();
    const formField = useField(context.form, field, onValidate);
    return <>{children(formField)}</>;
}

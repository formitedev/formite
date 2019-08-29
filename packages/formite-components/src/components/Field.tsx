import React from "react";

import { Field as FieldType, FormiteField, useField, ValidateFieldHandler } from "formite-core";

export default function Field(props: {
    children: (field: FormiteField) => React.ReactNode;
    field: FieldType;
    onValidate?: ValidateFieldHandler;
}) {
    const { children, field, onValidate } = props;
    const formField = useField(field, onValidate);
    return <>{children(formField)}</>;
}

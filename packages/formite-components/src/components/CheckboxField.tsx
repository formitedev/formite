import React from "react";

import { Field, ValidateFieldHandler } from "formite-core";
import { FormiteCheckbox, useCheckbox } from "formite-html";

export default function CheckboxField(props: {
    children: (checkboxField: FormiteCheckbox) => React.ReactNode;
    field: Field<boolean>;
    onValidate?: ValidateFieldHandler;
}) {
    const { children, field, onValidate } = props;
    const formField = useCheckbox(field, onValidate);
    return <>{children(formField)}</>;
}

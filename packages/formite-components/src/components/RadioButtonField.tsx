import React from "react";

import { Field, ValidateFieldHandler } from "formite-core";
import { FormiteRadioButton, useRadioButton } from "formite-html";

export default function RadioButtonField(props: {
    children: (radioButtonField: FormiteRadioButton) => React.ReactNode;
    field: Field<unknown>;
    value: string | number;
    onValidate?: ValidateFieldHandler;
}) {
    const { children, field, onValidate, value } = props;
    const formField = useRadioButton(field, value, onValidate);
    return <>{children(formField)}</>;
}

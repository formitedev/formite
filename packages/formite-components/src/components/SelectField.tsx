import React from "react";

import { Field, ValidateFieldHandler } from "formite-core";
import { FormiteSelect, useSelect } from "formite-html";

export default function SelectField(props: {
    children: (selectField: FormiteSelect) => React.ReactNode;
    field: Field;
    onValidate?: ValidateFieldHandler;
}) {
    const { children, field, onValidate } = props;
    const formField = useSelect(field, onValidate);
    return <>{children(formField)}</>;
}

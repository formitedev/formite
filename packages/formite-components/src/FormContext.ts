import React, { useContext } from "react";

import { FieldValues, FormiteForm } from "formite-core";

export type FormiteContext<Values extends FieldValues = FieldValues> = {
    form: FormiteForm<Values>;
};

const FormContext = React.createContext<FormiteContext<FieldValues>>({ form: {} as FormiteForm<FieldValues> });

export function useFormite<Values extends FieldValues = FieldValues>() {
    return useContext(FormContext) as FormiteContext<Values>;
}

export { FormContext };

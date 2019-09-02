import React, { useContext } from "react";

import { FormiteForm, FormValues } from "formite-core";

/**
 * @internal
 */
export type FormiteContext<Values extends FormValues = FormValues> = {
    form: FormiteForm<Values>;
};

const FormContext = React.createContext<FormiteContext<FormValues>>({ form: {} as FormiteForm<FormValues> });

/**
 * @internal
 */
export function useFormite<Values extends FormValues = FormValues>() {
    return useContext(FormContext) as FormiteContext<Values>;
}

export { FormContext };

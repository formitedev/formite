import React, { useCallback } from "react";

import {
    Field,
    FormiteForm,
    FormOptions,
    FormValues,
    useForm as useFormCore,
    useField,
    ValidateFieldHandler
} from "formite-core";

export interface FormiteHtmlForm<Values extends FormValues> extends FormiteForm<Values> {
    Form: (props: React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>) => JSX.Element;
    handleSubmit: (ev: React.FormEvent<HTMLFormElement>) => void;
}

/**
 * Sets up the form hook for use with HTML form elements.
 *
 * @remarks
 * All initial field values should be set even if they are undefined.
 *
 * @param initialValues - Initial values of the form
 * @param onSubmit - The function that is called when submitting the form.
 * @param options - Optional {@link formite-core#FormOptions | Form options}
 *
 * @returns The {@link formite-core#FormiteForm | forms state and API}, a Form component and a handleSubmit callback.
 */
export function useForm<Values extends FormValues>(
    initialValues: Values,
    onSubmit: (values: Values) => void | Promise<void>,
    options?: FormOptions<Values>
): FormiteHtmlForm<Values> {
    const formCore = useFormCore(initialValues, onSubmit, options);
    const { submit } = formCore;
    const handleSubmit = useCallback(
        (ev: React.FormEvent<HTMLFormElement>) => {
            ev.preventDefault();
            submit();
        },
        [submit]
    );
    const Form = useCallback(
        (props: React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>) => (
            <form onSubmit={handleSubmit} {...props} />
        ),
        [handleSubmit]
    );
    return {
        ...formCore,
        Form,
        handleSubmit
    };
}

interface ElementWithChecked extends Element {
    checked: boolean;
}

interface ElementWithValue extends Element {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any;
}

function useCheckedController<E extends ElementWithChecked>(
    field: Field<boolean>,
    onValidate?: ValidateFieldHandler,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    metadata?: any
) {
    const formField = useField(field, onValidate, metadata);
    const onChange = useCallback((ev: React.ChangeEvent<E>) => formField.onChange(ev.target.checked), [formField]);
    return {
        checked: field.value as boolean | undefined,
        onBlur: formField.onBlur,
        onChange
    };
}

function useValueController<E extends ElementWithValue, T>(
    field: Field,
    onValidate?: ValidateFieldHandler,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    metadata?: any
) {
    const formField = useField(field, onValidate, metadata);
    const onChange = useCallback((ev: React.ChangeEvent<E>) => formField.onChange(ev.target.value), [formField]);
    return {
        value: field.value as T,
        onBlur: formField.onBlur,
        onChange
    };
}

/**
 * Sets up a form's field hook for use with an HTML checkbox element.
 *
 * @param field - The boolean field to connect to an input component.
 * @param onValidate - An optional callback function {@link formite-core#ValidateFieldHandler | to validate the field}.
 * @param metadata - An optional data value that is stored with the {@link formite-core#Field}.
 *
 * @returns The properties to pass to the HTML input component.
 *
 * @example
 * ```typescript
 * <input {...useCheckbox(fields.aBooleanField)} />
 * ```
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useCheckbox(field: Field<boolean>, onValidate?: ValidateFieldHandler, metadata?: any) {
    return { type: "checkbox", ...useCheckedController<HTMLInputElement>(field, onValidate, metadata) };
}

export type FormiteCheckbox = Readonly<ReturnType<typeof useCheckbox>>;

/**
 * Sets up a form's field hook for use with an HTML input element.
 *
 * @param field - The {@link formite-core#Field} to connect to an input component.
 * @param onValidate - An optional callback function {@link formite-core#ValidateFieldHandler | to validate the field}.
 * @param metadata - An optional data value that is stored with the {@link formite-core#Field}.
 *
 * @returns The properties to pass to the HTML input component.
 *
 * @example
 * ```typescript
 * <input type="text" {...useInput(fields.stringField)} />
 * ```
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useInput(field: Field, onValidate?: ValidateFieldHandler, metadata?: any) {
    return useValueController<HTMLInputElement, string | undefined>(field, onValidate, metadata);
}

export type FormiteInput = Readonly<ReturnType<typeof useInput>>;

/**
 * Sets up a form's field hook for use with an HTML select element.
 *
 * @param field - The {@link formite-core#Field} to connect to a select component.
 * @param onValidate - An optional callback function {@link formite-core#ValidateFieldHandler | to validate the field}.
 * @param metadata - An optional data value that is stored with the {@link formite-core#Field}.
 *
 * @returns The properties to pass to the HTML select component.
 *
 * @example
 * ```typescript
 * <select {...useSelect(fields.someField)}>
 *     <option value="VALUE_1">Option A</option>
 *     <option value="VALUE_2">Option B</option>
 * </select>
 * ```
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useSelect(field: Field, onValidate?: ValidateFieldHandler, metadata?: any) {
    return useValueController<HTMLSelectElement, string | string[] | undefined>(field, onValidate, metadata);
}

export type FormiteSelect = Readonly<ReturnType<typeof useSelect>>;

/**
 * Sets up a form's field hook for use with an HTML radio button element.
 *
 * @param field - The {@link formite-core#Field} to connect to an input component.
 * @param value - The value that should be assigned to the field when the radio button in the group is selected.
 * @param onValidate - An optional callback function {@link formite-core#ValidateFieldHandler | to validate the field}.
 * @param metadata - An optional data value that is stored with the {@link formite-core#Field}.
 *
 * @returns The properties to pass to the HTML input component.
 *
 * @example
 * ```typescript
 * <input {...useRadioButton(fields.someField, "A_VALUE")} />
 * ```
 */
export function useRadioButton(
    field: Field,
    value: string | number,
    onValidate?: ValidateFieldHandler,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    metadata?: any
) {
    const formField = useField(field, onValidate, metadata);
    const onChange = useCallback(
        (ev: React.ChangeEvent<HTMLInputElement>) => {
            ev.target.checked && formField.onChange(value);
        },
        [formField, value]
    );
    return {
        type: "radio",
        checked: field.value === value,
        value,
        onBlur: formField.onBlur,
        onChange
    };
}

export type FormiteRadioButton = Readonly<ReturnType<typeof useRadioButton>>;

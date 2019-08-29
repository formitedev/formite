import React, { useCallback } from "react";

import {
    FieldValues,
    Field,
    FormiteForm,
    FormOptions,
    useForm as useFormCore,
    useField,
    ValidateFieldHandler
} from "formite-core";

export interface FormiteHtmlForm<Values extends FieldValues = FieldValues> extends FormiteForm<Values> {
    Form: (props: React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>) => JSX.Element;
    handleSubmit: (ev: React.FormEvent<HTMLFormElement>) => void;
}

export function useForm<Values extends FieldValues = FieldValues>(
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
    const onChange = useCallback((ev: React.ChangeEvent<E>) => formField.handleChange(ev.target.checked), [formField]);
    return {
        checked: field.value as boolean | undefined,
        onBlur: formField.handleBlur,
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
    const onChange = useCallback((ev: React.ChangeEvent<E>) => formField.handleChange(ev.target.value), [formField]);
    return {
        value: field.value as T,
        onBlur: formField.handleBlur,
        onChange
    };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useCheckbox(field: Field<boolean>, onValidate?: ValidateFieldHandler, metadata?: any) {
    return { type: "checkbox", ...useCheckedController<HTMLInputElement>(field, onValidate, metadata) };
}

export type FormiteCheckbox = Readonly<ReturnType<typeof useCheckbox>>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useInput(field: Field, onValidate?: ValidateFieldHandler, metadata?: any) {
    return useValueController<HTMLInputElement, string | undefined>(field, onValidate, metadata);
}

export type FormiteInput = Readonly<ReturnType<typeof useInput>>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useSelect(field: Field, onValidate?: ValidateFieldHandler, metadata?: any) {
    return useValueController<HTMLSelectElement, string | string[] | undefined>(field, onValidate, metadata);
}

export type FormiteSelect = Readonly<ReturnType<typeof useSelect>>;

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
            ev.target.checked && formField.handleChange(value);
        },
        [formField, value]
    );
    return {
        type: "radio",
        checked: field.value === value,
        value,
        onBlur: formField.handleBlur,
        onChange
    };
}

export type FormiteRadioButton = Readonly<ReturnType<typeof useRadioButton>>;

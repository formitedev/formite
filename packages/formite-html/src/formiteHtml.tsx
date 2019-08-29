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
    value: unknown;
}

function useCheckedController<E extends ElementWithChecked>(field: Field<unknown>, onValidate?: ValidateFieldHandler) {
    const formField = useField(field, onValidate);
    const onChange = useCallback((ev: React.ChangeEvent<E>) => formField.handleChange(ev.target.checked), [formField]);
    return {
        checked: field.value as boolean | undefined,
        onBlur: formField.handleBlur,
        onChange
    };
}

function useValueController<E extends ElementWithValue, T>(field: Field<unknown>, onValidate?: ValidateFieldHandler) {
    const formField = useField(field, onValidate);
    const onChange = useCallback((ev: React.ChangeEvent<E>) => formField.handleChange(ev.target.value), [formField]);
    return {
        value: field.value as T,
        onBlur: formField.handleBlur,
        onChange
    };
}

export function useCheckbox(field: Field<unknown>, onValidate?: ValidateFieldHandler) {
    return { type: "checkbox", ...useCheckedController<HTMLInputElement>(field, onValidate) };
}

export type FormiteCheckbox = Readonly<ReturnType<typeof useCheckbox>>;

export function useInput(field: Field<unknown>, onValidate?: ValidateFieldHandler) {
    return useValueController<HTMLInputElement, string | undefined>(field, onValidate);
}

export type FormiteInput = Readonly<ReturnType<typeof useInput>>;

export function useSelect(field: Field<unknown>, onValidate?: ValidateFieldHandler) {
    return useValueController<HTMLSelectElement, string | string[] | undefined>(field, onValidate);
}

export type FormiteSelect = Readonly<ReturnType<typeof useSelect>>;

export function useRadioButton(field: Field<unknown>, value: string | number, onValidate?: ValidateFieldHandler) {
    const formField = useField(field, onValidate);
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

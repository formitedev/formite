import { Field } from "./Field";

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * @internal
 */
export type FormFieldHandler = {
    handleFieldBlur: (field: Field) => void;
    handleFieldChange: (field: Field, v: any) => void;
};

/**
 * Function to validate a single field's value.
 *
 * @remarks
 * The function receives the current value of the field and should return `undefined` or an empty string if the value
 * is valid. Otherwise the function should return an error message. If validation is asynchronous the function should
 * return a Promise.
 */
export type ValidateFieldHandler = (value: any, field: Field) => string | undefined | Promise<string | undefined>;

/**
 * Function to validate the entire form.
 *
 * @remarks
 * The function receives the form's current values and should return an empty array if the values are valid. Otherwise
 * the function should return an array of error messages. You can also set errors on individual fields by calling
 * setFieldError(). If validation is asynchronous the function should return a Promise.
 */
export type ValidateFormHandler<VALUES> = (
    values: VALUES,
    fields: Fields<VALUES>,
    setFieldError: (field: Field, error?: string) => void
) => string[] | Promise<string[]>;

/**
 * Internal interface to access object's values by key.
 */
export interface FormValues {
    [field: string]: any;
}

/**
 * The fields with the same structure as the initial values.
 */
export type Fields<VALUES = FormValues> = {
    [K in keyof VALUES]: VALUES[K] extends any[]
        ? VALUES[K][number] extends object
            ? Fields<VALUES[K][number]>[]
            : Field<VALUES[K]>
        : VALUES[K] extends object
        ? Fields<VALUES[K]>
        : Field<VALUES[K]>;
};

/**
 * Options for the Form Hook.
 *
 * validateInitialValues: Option to validate the initial values. Default is true.
 * validateOnBlur: Option to validate the field and form when an element looses focus. Default is true.
 * validateOnChange: Option to validate the field and form when a field's value changes. Default is true.
 * onValidate: A callback function to validate the form.
 */
export type FormOptions<Values extends FormValues> = {
    validateInitialValues?: boolean;
    validateOnBlur?: boolean;
    validateOnChange?: boolean;
    onValidate?: ValidateFormHandler<Values>;
};

/**
 * State and API of the form returned by the useForm() hook.
 */
export interface FormiteForm<Values extends FormValues = FormValues> {
    /**
     * `true` if the form is valid and is not already submitting.
     */
    readonly canSubmit: boolean;
    /**
     * The form's fields with the same structure as the initial values.
     */
    readonly fields: Fields<Values>;
    /**
     * Current form errors if there are any or an empty array.
     */
    readonly formErrors: string[];
    /**
     * `true` if any of the fields' values have changed.
     */
    readonly isDirty: boolean;
    /**
     * `true` while the form is submitting.
     */
    readonly isSubmitting: boolean;
    /**
     * `true` if the form and all fields are valid.
     */
    readonly isValid: boolean;
    /**
     * `true` while the form and fields are validating.
     */
    readonly isValidating: boolean;
    /**
     * Sets all fields to the initial values and resets the form's state.
     */
    reset: () => void;
    /**
     * Programmatically 'touches' a field.
     */
    setFieldTouched: (field: Field, touched: boolean) => void;
    /**
     * Programmatically sets a field's value.
     */
    setFieldValue: (field: Field, v: any, validate?: boolean) => Promise<boolean>;
    /**
     * Submits the form if it is valid. Returns a Promise that resolves to `true` on success.
     */
    submit: () => Promise<boolean>;
    /**
     * Allows to changes the form's fields programmatically. Used for dynamic forms.
     */
    updateFields: (updateAction: (newFields: Fields<Values>) => void) => void;
    /**
     * Validates the form and all fields and returns a Promise that resolves to `true` if the form and all fields
     * are valid.
     */
    validate: () => Promise<boolean>;
}

/**
 * State and API of an individual field returned by the useField() hook.
 */
export interface FormiteField {
    /**
     * Current value of the field
     */
    readonly value: any;
    /**
     * Handler that should be passed to an element's onBlur event.
     */
    onBlur: () => void;
    /**
     * Handler that should be passed to or called from an element's onChange event.
     */
    onChange: (value: any) => void;
}

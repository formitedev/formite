import { Field } from "./Field";

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * @internal
 */
export type FormFieldHandler = {
    handleFieldBlur: (field: Field) => void;
    handleFieldChange: (field: Field, v: any) => void;
};

export type ValidateFieldHandler = (value: any, field: Field) => string | undefined | Promise<string | undefined>;

export type ValidateFormHandler<VALUES> = (
    values: VALUES,
    fields: Fields<VALUES>,
    setFieldError: (field: Field, error?: string) => void
) => string[] | Promise<string[]>;

export interface FieldValues {
    [field: string]: any;
}

export type Fields<VALUES = FieldValues> = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [K in keyof VALUES]: VALUES[K] extends any[]
        ? VALUES[K][number] extends object
            ? Fields<VALUES[K][number]>[]
            : Field<VALUES[K]>
        : VALUES[K] extends object
        ? Fields<VALUES[K]>
        : Field<VALUES[K]>;
};

export type FormOptions<Values extends FieldValues> = {
    validateInitialValues?: boolean;
    validateOnBlur?: boolean;
    validateOnChange?: boolean;
    onValidate?: ValidateFormHandler<Values>;
};

export interface FormiteField {
    handleBlur: () => void;
    handleChange: (v: any) => void;
}

export interface FormiteForm<Values extends FieldValues = FieldValues> {
    readonly canSubmit: boolean;
    readonly fields: Fields<Values>;
    readonly formErrors: string[];
    readonly handleFieldBlur: (field: Field) => void;
    readonly handleFieldChange: (field: Field, v: any) => void;
    readonly isDirty: boolean;
    readonly isSubmitting: boolean;
    readonly isValid: boolean;
    readonly isValidating: boolean;
    reset: () => void;
    setFieldTouched: (field: Field, touched: boolean) => void;
    setFieldValue: (field: Field, v: any, validate?: boolean) => Promise<boolean>;
    submit: () => Promise<boolean>;
    updateFields: (updateAction: (newFields: Fields<Values>) => void) => void;
    validate: () => Promise<boolean>;
}

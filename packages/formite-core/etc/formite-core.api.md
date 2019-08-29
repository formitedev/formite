## API Report File for "formite-core"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

// @public
export function createFields<VALUES extends FieldValues>(object: VALUES): Fields<VALUES>;

// @public (undocumented)
export class Field<T = any> {
    constructor(name: string, value: T);
    // @internal (undocumented)
    _endValidating(): void;
    // (undocumented)
    readonly error: string | undefined;
    // @internal (undocumented)
    _handler: FormFieldHandler;
    // (undocumented)
    readonly initialValue: T;
    // (undocumented)
    readonly isValidating: boolean;
    // (undocumented)
    metadata: any;
    // (undocumented)
    readonly name: string;
    // (undocumented)
    readonly onValidate: ValidateFieldHandler | undefined;
    // @internal (undocumented)
    _setError(error: string | undefined): void;
    // @internal (undocumented)
    _setOnValidate(onValidate: ValidateFieldHandler): void;
    // @internal (undocumented)
    _setTouched(touched: boolean): void;
    // @internal (undocumented)
    _setValue(value: T): void;
    // @internal (undocumented)
    _startValidating(): void;
    // (undocumented)
    readonly touched: boolean;
    // (undocumented)
    readonly value: T;
    // (undocumented)
    readonly visibleError: string | undefined;
}

// @public (undocumented)
export type Fields<VALUES = FieldValues> = {
    [K in keyof VALUES]: VALUES[K] extends any[] ? VALUES[K][number] extends object ? Fields<VALUES[K][number]>[] : Field<VALUES[K]> : VALUES[K] extends object ? Fields<VALUES[K]> : Field<VALUES[K]>;
};

// @public (undocumented)
export interface FieldValues {
    // (undocumented)
    [field: string]: any;
}

// Warning: (ae-internal-missing-underscore) The name "FormFieldHandler" should be prefixed with an underscore because the declaration is marked as @internal
// 
// @internal (undocumented)
export type FormFieldHandler = {
    handleFieldBlur: (field: Field) => void;
    handleFieldChange: (field: Field, v: any) => void;
};

// @public (undocumented)
export interface FormiteField {
    // (undocumented)
    handleBlur: () => void;
    // (undocumented)
    handleChange: (v: any) => void;
}

// @public (undocumented)
export interface FormiteForm<Values extends FieldValues = FieldValues> {
    // (undocumented)
    readonly canSubmit: boolean;
    // (undocumented)
    readonly fields: Fields<Values>;
    // (undocumented)
    readonly formErrors: string[];
    // (undocumented)
    readonly handleFieldBlur: (field: Field) => void;
    // (undocumented)
    readonly handleFieldChange: (field: Field, v: any) => void;
    // (undocumented)
    readonly isDirty: boolean;
    // (undocumented)
    readonly isSubmitting: boolean;
    // (undocumented)
    readonly isValid: boolean;
    // (undocumented)
    readonly isValidating: boolean;
    // (undocumented)
    reset: () => void;
    // (undocumented)
    setFieldTouched: (field: Field, touched: boolean) => void;
    // (undocumented)
    setFieldValue: (field: Field, v: any, validate?: boolean) => Promise<boolean>;
    // (undocumented)
    submit: () => Promise<boolean>;
    // (undocumented)
    updateFields: (updateAction: (newFields: Fields<Values>) => void) => void;
    // (undocumented)
    validate: () => Promise<boolean>;
}

// @public (undocumented)
export type FormOptions<Values extends FieldValues> = {
    validateInitialValues?: boolean;
    validateOnBlur?: boolean;
    validateOnChange?: boolean;
    onValidate?: ValidateFormHandler<Values>;
};

// @public (undocumented)
export function useField(field: Field, onValidate?: ValidateFieldHandler, metadata?: any): FormiteField;

// @public (undocumented)
export function useForm<Values extends FieldValues = FieldValues>(initialValues: Values, onSubmit: (values: Values) => void | Promise<void>, options?: FormOptions<Values>): FormiteForm<Values>;

// @public (undocumented)
export type ValidateFieldHandler = (value: any, field: Field) => string | undefined | Promise<string | undefined>;

// @public (undocumented)
export type ValidateFormHandler<VALUES> = (values: VALUES, fields: Fields<VALUES>, setFieldError: (field: Field, error?: string) => void) => string[] | Promise<string[]>;


// (No @packageDocumentation comment for this package)

```
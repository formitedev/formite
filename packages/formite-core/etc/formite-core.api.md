## API Report File for "formite-core"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

// @public
export function clearFieldErrors<VALUES extends FormValues>(fields: Fields<VALUES>): void;

// @public
export function createFields<VALUES extends FormValues>(object: VALUES): Fields<VALUES>;

// @public
export class Field<T = any> {
    // @internal
    constructor(name: string, value: T);
    // @internal (undocumented)
    _endValidating(): void;
    readonly error: string | undefined;
    // @internal (undocumented)
    _handler: FormFieldHandler;
    readonly initialValue: T;
    readonly isValidating: boolean;
    metadata: any;
    // (undocumented)
    readonly name: string;
    // @internal (undocumented)
    _onValidate?: ValidateFieldHandler;
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
    readonly touched: boolean;
    readonly value: T;
    readonly visibleError: string | undefined;
}

// @public
export type Fields<VALUES = FormValues> = {
    [K in keyof VALUES]: VALUES[K] extends any[] ? VALUES[K][number] extends object ? Fields<VALUES[K][number]>[] : Field<VALUES[K]> : VALUES[K] extends object ? Fields<VALUES[K]> : Field<VALUES[K]>;
};

// Warning: (ae-internal-missing-underscore) The name "FormFieldHandler" should be prefixed with an underscore because the declaration is marked as @internal
// 
// @internal (undocumented)
export type FormFieldHandler = {
    handleFieldBlur: (field: Field) => void;
    handleFieldChange: (field: Field, v: any) => void;
};

// @public
export interface FormiteField {
    onBlur: () => void;
    onChange: (value: any) => void;
    readonly value: any;
}

// @public
export interface FormiteForm<Values extends FormValues = FormValues> {
    readonly canSubmit: boolean;
    readonly fields: Fields<Values>;
    readonly formErrors: string[];
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

// @public
export type FormOptions<Values extends FormValues> = {
    validateInitialValues?: boolean;
    validateOnBlur?: boolean;
    validateOnChange?: boolean;
    onValidate?: ValidateFormHandler<Values>;
};

// @public
export interface FormValues {
    // (undocumented)
    [field: string]: any;
}

// @public
export function useField(field: Field, onValidate?: ValidateFieldHandler, metadata?: any): FormiteField;

// @public
export function useForm<Values extends FormValues>(initialValues: Values, onSubmit: (values: Values) => void | Promise<void>, options?: FormOptions<Values>): FormiteForm<Values>;

// @public
export type ValidateFieldHandler = (value: any, field: Field) => string | undefined | Promise<string | undefined>;

// @public
export type ValidateFormHandler<VALUES> = (values: VALUES, fields: Fields<VALUES>, setFieldError: (field: Field, error?: string) => void) => string[] | Promise<string[]>;


// (No @packageDocumentation comment for this package)

```

export type ValidateFieldHandler = (value: unknown) => string | undefined | Promise<string | undefined>;

export type ValidateFormHandler<VALUES> = (
    values: VALUES,
    fields: Fields<VALUES>,
    setFieldError: (field: Field<unknown>, error?: string) => void
) => string[] | Promise<string[]>;

export class Field<T> {
    private _error?: string;
    private _initialValue: T;
    private _validatingCounter: number;
    private _onValidate?: ValidateFieldHandler;
    private _touched: boolean;
    private _value: T;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public metadata: any;

    // Readonly properties

    public get error() {
        return this._error;
    }

    public get initialValue() {
        return this._initialValue;
    }

    public get isValidating() {
        return this._validatingCounter > 0;
    }

    public get onValidate() {
        return this._onValidate;
    }

    public get touched() {
        return this._touched;
    }

    public get value() {
        return this._value;
    }

    public get visibleError() {
        return this._touched ? this._error : "";
    }

    public constructor(public readonly name: string, value: T) {
        this._initialValue = value;
        this._validatingCounter = 0;
        this._touched = false;
        this._value = value;
    }

    // Internal methods

    public _endValidating() {
        this._validatingCounter--;
    }

    public _setError(error: string | undefined) {
        this._error = error;
    }

    public _setOnValidate(onValidate: ValidateFieldHandler) {
        this._onValidate = onValidate;
    }

    public _setTouched(touched: boolean) {
        this._touched = touched;
    }

    public _setValue(value: T) {
        this._value = value;
    }

    public _startValidating() {
        this._validatingCounter++;
    }
}

export interface FieldValues {
    [field: string]: unknown;
}

export type Fields<VALUES> = {
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

export interface FormiteForm<Values extends FieldValues = FieldValues> {
    readonly canSubmit: boolean;
    readonly fields: Fields<Values>;
    readonly formErrors: string[];
    readonly handleFieldBlur: (field: Field<unknown>) => void;
    readonly handleFieldChange: (field: Field<unknown>, v: unknown) => void;
    readonly isDirty: boolean;
    readonly isSubmitting: boolean;
    readonly isValid: boolean;
    readonly isValidating: boolean;
    reset: () => void;
    setFieldValidation: (field: Field<unknown>, onValidate: ValidateFieldHandler) => void;
    setFieldTouched: (field: Field<unknown>, touched: boolean) => void;
    setFieldValue: (field: Field<unknown>, v: unknown, validate?: boolean) => Promise<boolean>;
    submit: () => Promise<boolean>;
    updateFields: (updateAction: (newFields: Fields<Values>) => void) => void;
    validate: () => Promise<boolean>;
}

import { FormFieldHandler, ValidateFieldHandler } from "./formiteTypes";

/**
 * A form's field with its current state.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class Field<T = any> {
    /**
     * @internal
     */
    private _error?: string;

    /**
     * @internal
     */
    private _initialValue: T;

    /**
     * @internal
     */
    private _validatingCounter: number;

    /**
     * @internal
     */
    private _touched: boolean;

    /**
     * @internal
     */
    private _value: T;

    /**
     * @internal
     */
    public _handler!: FormFieldHandler;

    /**
     * @internal
     */
    public _onValidate?: ValidateFieldHandler;

    /**
     * Custom data value. For example, to be used within the validation function.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public metadata: any;

    /**
     * An error message if the field is not valid.
     */
    public get error() {
        return this._error;
    }

    /**
     * The initial value that was provided to the Form Hook.
     */
    public get initialValue() {
        return this._initialValue;
    }

    /**
     * `true` while the field is validating.
     */
    public get isValidating() {
        return this._validatingCounter > 0;
    }

    /**
     * `true` after a field's input component lost focus.
     */
    public get touched() {
        return this._touched;
    }

    /**
     * The current value of the field
     */
    public get value() {
        return this._value;
    }

    /**
     * The error message if the field is not valid and after the field has been touched.
     */
    public get visibleError() {
        return this._touched ? this._error : "";
    }

    /**
     * @internal
     * @param name - The property name of the field
     * @param value - The initial value of the field
     */
    public constructor(public readonly name: string, value: T) {
        this._initialValue = value;
        this._validatingCounter = 0;
        this._touched = false;
        this._value = value;
    }

    /**
     * @internal
     */
    public _endValidating() {
        this._validatingCounter--;
    }

    /**
     * @internal
     */
    public _setError(error: string | undefined) {
        this._error = error;
    }

    /**
     * @internal
     */
    public _setOnValidate(onValidate: ValidateFieldHandler) {
        this._onValidate = onValidate;
    }

    /**
     * @internal
     */
    public _setTouched(touched: boolean) {
        this._touched = touched;
    }

    /**
     * @internal
     */
    public _setValue(value: T) {
        this._value = value;
    }

    /**
     * @internal
     */
    public _startValidating() {
        this._validatingCounter++;
    }
}

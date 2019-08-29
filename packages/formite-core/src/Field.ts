import { FormFieldHandler, ValidateFieldHandler } from "./formiteTypes";

export class Field<T> {
    private _error?: string;
    private _initialValue: T;
    private _validatingCounter: number;
    private _onValidate?: ValidateFieldHandler;
    private _touched: boolean;
    private _value: T;

    /**
     * @private
     */
    public _handler!: FormFieldHandler;
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

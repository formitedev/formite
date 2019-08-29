import { FormFieldHandler, ValidateFieldHandler } from "./formiteTypes";

export class Field<T> {
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
    private _onValidate?: ValidateFieldHandler;

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

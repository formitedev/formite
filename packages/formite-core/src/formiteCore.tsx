import { useCallback, useEffect, useState, useMemo } from "react";

import {
    FormFieldHandler,
    Fields,
    FieldValues,
    FormiteForm,
    FormOptions,
    ValidateFieldHandler,
    FormiteField
} from "./formiteTypes";
import { Field } from "./Field";

function isValuesObject<VALUES extends FieldValues = FieldValues>(obj: unknown): obj is VALUES {
    return obj !== null && typeof obj === "object";
}

function isObjectWithFields<VALUES extends FieldValues = FieldValues>(obj: unknown): obj is Fields<VALUES> {
    return obj !== null && typeof obj === "object";
}

function isArrayWithFields<VALUES extends FieldValues = FieldValues>(obj: unknown): obj is Fields<VALUES>[] {
    return obj !== null && Array.isArray(obj);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isPromise<T>(p: any): p is Promise<T> {
    return p !== null && typeof p === "object" && typeof p.then === "function";
}

/**
 * Creates Field instances for all properties of the given object.
 *
 * @remarks
 * Makes a deep copy of all values and arrays and creates new Field instances. This function
 * is only used when using dynamic forms.
 *
 * @param object - An object whose properties will be converted to Field instances.
 * @returns An object with Fields and arrays of Fields with the same structure as the input object.
 *
 */
export function createFields<VALUES extends FieldValues>(object: VALUES): Fields<VALUES> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result: any = {};
    for (const key of Object.keys(object)) {
        const value = object[key];
        let field: Field<unknown> | Fields<unknown>[] | object;
        if (Array.isArray(value)) {
            field = value.map(v => createFields(v));
        } else if (isValuesObject(value)) {
            field = createFields(value);
        } else {
            field = new Field(key, value);
        }
        result[key] = field;
    }
    return result;
}

function setHandler<VALUES extends FieldValues = FieldValues>(fields: Fields<VALUES>, handler: FormFieldHandler) {
    for (const key of Object.keys(fields)) {
        const field = fields[key];
        if (field instanceof Field) {
            field._handler = handler;
        } else if (isArrayWithFields(field)) {
            for (const f of field) {
                setHandler(f, handler);
            }
        } else if (isObjectWithFields(field)) {
            setHandler(field, handler);
        }
    }
}

function getValues<VALUES extends FieldValues = FieldValues>(fields: Fields<VALUES>): VALUES {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result: any = {};
    for (const key of Object.keys(fields)) {
        const field = fields[key];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let value: any;
        if (field instanceof Field) {
            value = field.value;
        } else if (isArrayWithFields(field)) {
            value = field.map(f => getValues(f));
        } else if (isObjectWithFields(field)) {
            value = getValues(field);
        }
        result[key] = value;
    }
    return result;
}

async function validateFields<VALUES extends FieldValues = FieldValues>(fields: Fields<VALUES>) {
    let result = true;
    for (const key of Object.keys(fields)) {
        const field = fields[key];
        if (field instanceof Field) {
            if (field.onValidate) {
                field._setError(undefined);
                let validateResult = field.onValidate(field.value);
                if (isPromise(validateResult)) {
                    validateResult = await validateResult;
                }
                field._setError(validateResult);
                if (validateResult) {
                    result = false;
                }
            }
        } else if (isArrayWithFields(field)) {
            for (const f of field) {
                if (!(await validateFields(f))) {
                    result = false;
                }
            }
        } else if (isObjectWithFields(field)) {
            if (!(await validateFields(field))) {
                result = false;
            }
        }
    }
    return result;
}

function anyFieldWith<VALUES extends FieldValues = FieldValues>(
    fields: Fields<VALUES>,
    predicate: (field: Field<unknown>) => boolean
): boolean {
    for (const key of Object.keys(fields)) {
        const field = fields[key];
        if (field instanceof Field) {
            if (predicate(field)) {
                return true;
            }
        } else if (isArrayWithFields(field)) {
            for (const f of field) {
                if (anyFieldWith(f, predicate)) {
                    return true;
                }
            }
        } else if (isObjectWithFields(field)) {
            if (anyFieldWith(field, predicate)) {
                return true;
            }
        }
    }
    return false;
}

function fieldsAreValid<VALUES extends FieldValues = FieldValues>(fields: Fields<VALUES>) {
    return !anyFieldWith(fields, field => !!field.error);
}

function fieldsAreDirty<VALUES extends FieldValues = FieldValues>(fields: Fields<VALUES>) {
    return anyFieldWith(fields, field => field.value !== field.initialValue);
}

export function useForm<Values extends FieldValues = FieldValues>(
    initialValues: Values,
    onSubmit: (values: Values) => void | Promise<void>,
    options: FormOptions<Values> = {}
): FormiteForm<Values> {
    const { validateInitialValues = true, validateOnBlur = true, validateOnChange = true, onValidate } = options;
    const [fields, setFields] = useState(() => createFields(initialValues));
    // Form state
    const [formErrors, setFormErrors] = useState([] as string[]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isValid, setIsValid] = useState(!validateInitialValues);
    const [validatingCounter, setValidatingCounter] = useState(0);
    // Because Fields are mutable we use an update counter that increases with any changes to any Field instance
    const [, setUpdateCounter] = useState(0);
    // Internal helper that is called when a Field instance has been changed
    const fieldsUpdated = useCallback(() => {
        setUpdateCounter(current => current + 1);
    }, []);
    const reset = useCallback(() => {
        setFields(createFields(initialValues));
        setFormErrors([] as string[]);
        setIsValid(!validateInitialValues);
    }, [initialValues, validateInitialValues]);
    const setFieldError = useCallback((field: Field<unknown>, error?: string) => {
        if (error !== field.error) {
            field._setError(error);
        }
    }, []);
    const validateForm = useCallback(async () => {
        let formErrors: string[] = [];
        if (onValidate) {
            setFormErrors(formErrors);
            const values = getValues(fields);
            let validateResult = onValidate(values, fields, setFieldError);
            if (isPromise(validateResult)) {
                validateResult = await validateResult;
            }
            if (validateResult) {
                formErrors = validateResult;
                setFormErrors(formErrors);
            }
        }
        return formErrors;
    }, [fields, onValidate, setFieldError]);
    const validateField = useCallback(
        async (field: Field<unknown>) => {
            if (field.onValidate) {
                field._setError(undefined);
                let validateResult = field.onValidate(field.value);
                if (isPromise(validateResult)) {
                    field._startValidating();
                    fieldsUpdated();
                    validateResult = await validateResult;
                    field._endValidating();
                }
                field._setError(validateResult);
                fieldsUpdated();
            }
        },
        [fieldsUpdated]
    );
    const validateFieldChange = useCallback(
        async (field: Field<unknown>) => {
            setValidatingCounter(n => n + 1);
            let isValid = false;
            try {
                const validateFormTask = validateForm();
                await validateField(field);
                if (field.error) {
                    // If the field is not valid, disable submit as soon as possible
                    // without waiting for form validation
                    setIsValid(false);
                }
                const formErrors = await validateFormTask;
                isValid = !field.error && formErrors.length === 0;
                if (isValid) {
                    // See if all other fields are currently valid without validating them here
                    isValid = fieldsAreValid(fields);
                }
                setIsValid(isValid);
            } catch (e) {
                setIsValid(false);
                throw e;
            } finally {
                setValidatingCounter(n => n - 1);
            }
            return isValid;
        },
        [fields, validateField, validateForm]
    );
    const validate = useCallback(async () => {
        setValidatingCounter(n => n + 1);
        let isValid = false;
        try {
            const validateFormTask = validateForm();
            const fieldsAreValid = await validateFields(fields);
            const formErrors = await validateFormTask;
            isValid = fieldsAreValid && formErrors.length === 0;
            setIsValid(isValid);
        } catch (e) {
            setIsValid(false);
            throw e;
        } finally {
            setValidatingCounter(n => n - 1);
        }
        return isValid;
    }, [fields, validateForm]);
    const setFieldTouched = useCallback(
        (field: Field<unknown>, touched: boolean) => {
            if (touched !== field.touched) {
                field._setTouched(touched);
                fieldsUpdated();
            }
        },
        [fieldsUpdated]
    );
    const setFieldValue = useCallback(
        (field: Field<unknown>, v: unknown, validate = true) => {
            if (v !== field.value) {
                field._setValue(v);
                fieldsUpdated();
                if (validate) {
                    return validateFieldChange(field);
                }
            }
            return Promise.resolve(true);
        },
        [fieldsUpdated, validateFieldChange]
    );
    const updateFields = useCallback(
        (updateAction: (newFields: Fields<Values>) => void) => {
            // Make a shallow copy
            const newFields = { ...fields };
            // Update fields
            updateAction(newFields);
            // Update state
            setFields(newFields);
            setIsValid(!validateInitialValues);
        },
        [fields, validateInitialValues]
    );
    const submit = useCallback(async () => {
        setIsSubmitting(true);
        let wasSubmitted = false;
        try {
            if (await validate()) {
                const values = getValues(fields);
                const submitResult = onSubmit(values);
                if (isPromise(submitResult)) {
                    await submitResult;
                }
                wasSubmitted = true;
            }
        } finally {
            setIsSubmitting(false);
        }
        return wasSubmitted;
    }, [validate, fields, onSubmit]);
    const handleFieldBlur = useCallback(
        (field: Field<unknown>) => {
            setFieldTouched(field, true);
            if (validateOnBlur) {
                validateFieldChange(field);
            }
        },
        [setFieldTouched, validateFieldChange, validateOnBlur]
    );
    const handleFieldChange = useCallback(
        (field: Field<unknown>, v: unknown) => {
            setFieldValue(field, v, validateOnChange);
        },
        [setFieldValue, validateOnChange]
    );
    // Run once after first render, after reset() and after updateFields() were called
    useEffect(() => {
        // Run in background
        if (validateInitialValues) {
            validate();
        }
    }, [onValidate, validate, validateInitialValues]);
    useMemo(() => {
        const handler = {
            handleFieldBlur,
            handleFieldChange
        };
        setHandler(fields, handler);
        return handler;
    }, [fields, handleFieldBlur, handleFieldChange]);
    return {
        fields,
        formErrors,
        handleFieldBlur,
        handleFieldChange,
        isSubmitting,
        isValid,
        reset,
        setFieldTouched,
        setFieldValue,
        submit,
        updateFields,
        validate,
        get canSubmit() {
            return isValid && !isSubmitting;
        },
        get isDirty() {
            return fieldsAreDirty(fields);
        },
        get isValidating() {
            return validatingCounter > 0;
        }
    };
}

export function useField(field: Field<unknown>, onValidate?: ValidateFieldHandler): FormiteField {
    const { handleFieldBlur, handleFieldChange } = field._handler;
    if (onValidate && field.onValidate !== onValidate) {
        field._setOnValidate(onValidate);
    }
    const handleBlur = useCallback(() => handleFieldBlur(field), [field, handleFieldBlur]);
    const handleChange = useCallback((v: unknown) => handleFieldChange(field, v), [field, handleFieldChange]);
    return {
        handleBlur,
        handleChange
    };
}

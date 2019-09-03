---
id: api-form-hook
title: Form Hook
---
## useForm() Hook

Sets up the form hook.

<b>Signature:</b>

```typescript
function useForm<Values extends FormValues>(
    initialValues: Values,
    onSubmit: (values: Values) => void | Promise<void>,
    options: FormOptions<Values> = {}
): FormiteForm<Values>
```

### Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  initialValues | `Values` | Initial values of the form |
|  onSubmit | `(values: Values) => void ǀ Promise<void>` | The function that is called when submitting the form. |
|  options | `FormOptions<Values>` | Optional [Form options](api-form-hook.md#form-options) |

<b>Returns:</b>

`FormiteForm<Values>`

The [forms state and API](api-form-hook.md#form-state-and-api)

### Remarks

All initial field values should be set even if they are undefined.  

## Form Options

Options for the Form Hook.

<b>Signature:</b>

```typescript
type FormOptions<Values extends FormValues> = {
    validateInitialValues?: boolean;
    validateOnBlur?: boolean;
    validateOnChange?: boolean;
    onValidate?: ValidateFormHandler<Values>;
};
```

|  Option | Description |
|  --- | --- |
| validateInitialValues | Option to validate the initial values. Default is true. |
| validateOnBlur | Option to validate the field and form when an element looses focus. Default is true. |
| validateOnChange | Option to validate the field and form when a field's value changes. Default is true. |
| onValidate | A callback function to [validate the form](api-form-hook.md#form-validation). |

## Form Validation

Function to validate the entire form.

<b>Signature:</b>

```typescript
type ValidateFormHandler<VALUES> = (
    values: VALUES,
    fields: Fields<VALUES>,
    setFieldError: (field: Field, error?: string) => void
) => string[] | Promise<string[]>;
```

### Remarks

The function receives the form's current values and should return an empty array if the values are valid. Otherwise the function should return an array of error messages. You can also set errors on individual fields by calling setFieldError(). If validation is asynchronous the function should return a Promise.

## Form State and API

State and API of the form returned by the useForm() hook.

<b>Signature:</b>

```typescript
interface FormiteForm<Values extends FormValues = FormValues> {
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
```

### Properties

|  Property | Type | Description |
|  --- | --- | --- |
|  canSubmit | `boolean` | `true` if the form is valid and is not already submitting. |
|  fields | `Fields<Values>` | The form's fields with the same structure as the initial values. |
|  formErrors | `string` | Current form errors if there are any or an empty array. |
|  isDirty | `boolean` | `true` if any of the fields' values have changed. |
|  isSubmitting | `boolean` | `true` while the form is submitting. |
|  isValid | `boolean` | `true` if the form and all fields are valid. |
|  isValidating | `boolean` | `true` while the form and fields are validating. |
|  reset | `() => void` | Sets all fields to the initial values and resets the form's state. |
|  setFieldTouched | `(field: Field, touched: boolean) => void` | Programmatically 'touches' a field. |
|  setFieldValue | `(field: Field, v: any, validate?: boolean) => Promise<boolean>` | Programmatically sets a field's value. |
|  submit | `() => Promise<boolean>` | Submits the form if it is valid. Returns a Promise that resolves to `true` on success. |
|  updateFields | `(updateAction: (newFields: Fields<Values>) => void) => void` | Allows to changes the form's fields programmatically. Used for dynamic forms. |
|  validate | `() => Promise<boolean>` | Validates the form and all fields and returns a Promise that resolves to `true` if the form and all fields are valid. |

## useField() Hook

Sets up a form's field hook.

<b>Signature:</b>

```typescript
function useField(
    field: Field,
    onValidate?: ValidateFieldHandler,
    metadata?: any
): FormiteField
```

### Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  field | `Field` | The [Field](api-form-hook.md#field) to connect to an input component. |
|  onValidate | `ValidateFieldHandler` | An optional callback function to [validate the field](api-form-hook.md#field-validation). |
|  metadata | `any` | An optional data value that is stored with the [Field](api-form-hook.md#field). |

<b>Returns:</b>

`FormiteField`

The fields [state and API](api-form-hook.md#field-state-and-api).

## Field Validation

Function to validate a single field's value.

<b>Signature:</b>

```typescript
type ValidateFieldHandler = (value: any, field: Field) => string | undefined | Promise<string | undefined>;
```

### Remarks

The function receives the current value of the field and should return `undefined` or an empty string if the value is valid. Otherwise the function should return an error message. If validation is asynchronous the function should return a Promise.

## Field State and API

State and API of an individual field returned by the useField() hook.

<b>Signature:</b>

```typescript
interface FormiteField {
    readonly value: any;
    onBlur: () => void;
    onChange: (value: any) => void;
}
```

### Properties

|  Property | Type | Description |
|  --- | --- | --- |
|  onBlur | `() => void` | Handler that should be passed to an element's onBlur event. |
|  onChange | `(value: any) => void` | Handler that should be passed to or called from an element's onChange event. |
|  value | `any` | Current value of the field |

## Field

A form's field with its current state.

<b>Signature:</b>

```typescript
class Field<T = any> {
    readonly error: string | undefined;
    readonly initialValue: T;
    readonly isValidating: boolean;
    readonly name: string;
    readonly touched: boolean;
    readonly value: T;
    readonly visibleError: string | undefined;
    metadata: any;
}
```

### Properties

|  Property | Type | Description |
|  --- | --- | --- |
|  error | `string ǀ undefined` | An error message if the field is not valid. |
|  initialValue | `T` | The initial value that was provided to the Form Hook. |
|  isValidating | `boolean` | `true` while the field is validating. |
|  metadata | `any` | Custom data value. For example, to be used within the validation function. |
|  name | `string` |  |
|  touched | `boolean` | `true` after a field's input component lost focus. |
|  value | `T` | The current value of the field |
|  visibleError | `string ǀ undefined` | The error message if the field is not valid and after the field has been touched. |

### Remarks

The constructor for this class is marked as internal. Third-party code should not call the constructor directly or create subclasses that extend the `Field` class.

## createFields() function

Creates Field instances for all properties of the given object.

<b>Signature:</b>

```typescript
function createFields<VALUES extends FormValues>(object: VALUES): Fields<VALUES>;
```

### Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  object | `VALUES` | An object whose properties will be converted to [Field](api-form-hook.md#field) instances. |

<b>Returns:</b>

`Fields<VALUES>`

An object with [fields](api-form-hook.md#field) and arrays of [fields](api-form-hook.md#field) with the same structure as the input object

### Remarks

Makes a deep copy of all values and arrays and creates new [Field](api-form-hook.md#field) instances. This function is only used when using dynamic forms.

## clearFieldErrors() function

Clears the errors of the fields by doing a deep traversal.

<b>Signature:</b>

```typescript
function clearFieldErrors<VALUES extends FormValues>(fields: Fields<VALUES>): void;
```

### Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  fields | `Fields<VALUES>` | A [Field](api-form-hook.md#field), an object with [fields](api-form-hook.md#field) or an array of [fields](api-form-hook.md#field) |

### Remarks

For example, it can be used during form validation to clear all errors before setting field errors.

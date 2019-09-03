---
id: api-html
title: HTML Adapter
---
## useForm() Hook

Sets up the form hook for use with HTML form elements.

<b>Signature:</b>

```typescript
function useForm<Values extends FormValues>(
    initialValues: Values,
    onSubmit: (values: Values) => void | Promise<void>,
    options?: FormOptions<Values>
): FormiteHtmlForm<Values>
```

### Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  initialValues | `Values` | Initial values of the form |
|  onSubmit | `(values: Values) => void ǀ Promise<void>` | The function that is called when submitting the form. |
|  options | `FormOptions<Values>` | Optional [Form options](api-form-hook.md#form-options) |

<b>Returns:</b>

`FormiteHtmlForm<Values>`

The [forms state and API](api-form-hook.md#form-state-and-api), a Form component and a handleSubmit callback.

```typescript
interface FormiteHtmlForm<Values extends FormValues> extends FormiteForm<Values> {
    Form: (props: React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>) => JSX.Element;
    handleSubmit: (ev: React.FormEvent<HTMLFormElement>) => void;
}
```

### Remarks

All initial field values should be set even if they are undefined.

## useInput() Hook

Sets up a form's field hook for use with an HTML input element.

<b>Signature:</b>

```typescript
function useInput(field: Field, onValidate?: ValidateFieldHandler, metadata?: any): {
    value: string | undefined;
    onBlur: () => void;
    onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
};
```

### Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  field | `Field` | The [Field](api-form-hook.md#field) to connect to an input component. |
|  onValidate | `ValidateFieldHandler` | An optional callback function to [validate the field](api-form-hook.md#field-validation). |
|  metadata | `any` | An optional data value that is stored with the . |

<b>Returns:</b>

```typescript
{
    value: string | undefined;
    onBlur: () => void;
    onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
}
```

The properties to pass to the HTML input component.

### Example

```typescript
<input type="text" {...useInput(fields.stringField)} />

```

## useCheckbox() Hook

Sets up a form's field hook for use with an HTML checkbox element.

<b>Signature:</b>

```typescript
function useCheckbox(field: Field<boolean>, onValidate?: ValidateFieldHandler, metadata?: any): {
    checked: boolean | undefined;
    type: string;
    onBlur: () => void;
    onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
};
```

### Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  field | `Field<boolean>` | The [Field](api-form-hook.md#field) to connect to an input component. |
|  onValidate | `ValidateFieldHandler` | An optional callback function to [validate the field](api-form-hook.md#field-validation). |
|  metadata | `any` | An optional data value that is stored with the . |

<b>Returns:</b>

```typescript
{
    checked: boolean | undefined;
    type: string;
    onBlur: () => void;
    onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
}
```

The properties to pass to the HTML input component.

### Example

```typescript
<input {...useCheckbox(fields.aBooleanField)} />

```

## useRadioButton() Hook

Sets up a form's field hook for use with an HTML radio button element.

<b>Signature:</b>

```typescript
function useRadioButton(field: Field, value: string | number, onValidate?: ValidateFieldHandler, metadata?: any): {
    checked: boolean;
    type: string;
    value: string | number;
    onBlur: () => void;
    onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
};
```

### Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  field | `Field` | The [Field](api-form-hook.md#field) to connect to an input component. |
|  value | `string ǀ number` | The value that should be assigned to the field when the radio button in the group is selected. |
|  onValidate | `ValidateFieldHandler` | An optional callback function to [validate the field](api-form-hook.md#field-validation). |
|  metadata | `any` | An optional data value that is stored with the . |

<b>Returns:</b>

```typescript
{
    checked: boolean;
    type: string;
    value: string | number;
    onBlur: () => void;
    onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
}
```

The properties to pass to the HTML input component.

### Example

```typescript
<input {...useRadioButton(fields.someField, "A_VALUE")} />

```

## useSelect() Hook

Sets up a form's field hook for use with an HTML select element.

<b>Signature:</b>

```typescript
function useSelect(field: Field, onValidate?: ValidateFieldHandler, metadata?: any): {
    value: string | string[] | undefined;
    onBlur: () => void;
    onChange: (ev: React.ChangeEvent<HTMLSelectElement>) => void;
};
```

### Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  field | `Field` | The [Field](api-form-hook.md#field) to connect to a select component. |
|  onValidate | `ValidateFieldHandler` | An optional callback function to [validate the field](api-form-hook.md#field-validation). |
|  metadata | `any` | An optional data value that is stored with the . |

<b>Returns:</b>

```typescript
{
    value: string | string[] | undefined;
    onBlur: () => void;
    onChange: (ev: React.ChangeEvent<HTMLSelectElement>) => void;
}
```

The properties to pass to the HTML select component.

### Example

```typescript
<select {...useSelect(fields.someField)}>
    <option value="VALUE_1">Option A</option>
    <option value="VALUE_2">Option B</option>
</select>

```

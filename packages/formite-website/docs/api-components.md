---
id: api-components
title: Components
---
You can use Formite's components in your class components that do not support React Hooks.

## Form

Form component.

### Properties

|  Property | Type | Description |
|  --- | --- | --- |
|  initialValues | `Values` | Initial values of the form |
|  onSubmit | `(values: Values) => void ǀ Promise<void>` | The function that is called when submitting the form. |
|  options | `FormOptions<Values>` | Optional [Form options](api-form-hook.md#form-options) |
|  children | `(form: FormiteForm<Values>, fields: Fields<Values>) => React.ReactNode` | A function that renders the children |

### Remarks

The Form component uses `children` as a render prop. (see example)

### Example

```typescript
<Form initialValues={{ firstName: "", lastName: "" }} onSubmitForm={handleSubmit} >
    {(form, fields) => (
        <InputField field={fields.firstName}>
            {field => <input type="text" placeholder="First name" {...field} />}
        </InputField>
    )}
</Form>

```

## Field

Field component to use a field with other components than standard HTML elements.

### Properties

|  Property | Type | Description |
|  --- | --- | --- |
|  field | `Field` | The [Field](api-form-hook.md#field) to connect to an input component. |
|  onValidate | `ValidateFieldHandler` | An optional callback function to [validate the field](api-form-hook.md#field-validation). |
|  metadata | `any` | An optional data value that is stored with the [Field](api-form-hook.md#field). |
|  children | `(field: FormiteField) => React.ReactNode` | A function that renders the children |

### Remarks

For standard HTML elements it is easier to use Formite's components like [InputField](api-components.md#inputfield).

## Example

```typescript
<Form initialValues={{ firstName: "", lastName: "" }} onSubmitForm={handleSubmit} >
    {(form, fields) => (
        <Field field={fields.firstName}>
            {field => (
                <input
                    type="text"
                    placeholder="First name"
                    value={field.value}
                    onBlur={field.onBlur}
                    onChange={ev => field.onChange(ev.currentTarget.value)}
                />
            )}
        </Field>
    )}
</Form>
```

## InputField

InputField component to use a field with a standard HTML input element.

### Properties

|  Parameter | Type | Description |
|  --- | --- | --- |
|  field | `Field` | The [Field](api-form-hook.md#field) to connect to an input component. |
|  onValidate | `ValidateFieldHandler` | An optional callback function to [validate the field](api-form-hook.md#field-validation). |
|  metadata | `any` | An optional data value that is stored with the . |
|  children | `(inputField: FormiteInput) => React.ReactNode` | A function that renders the children |

### Remarks

The InputField component uses `children` as a render prop. (see example)

### Example

```typescript
<Form initialValues={{ firstName: "", lastName: "" }} onSubmitForm={handleSubmit} >
    {(form, fields) => (
        <InputField field={fields.firstName}>
            {field => <input type="text" placeholder="First name" {...field} />}
        </InputField>
    )}
</Form>
```

## CheckboxField

CheckboxField component to use a field with a standard HTML input element.

### Properties

|  Parameter | Type | Description |
|  --- | --- | --- |
|  field | `Field<boolean>` | The [Field](api-form-hook.md#field) to connect to an input component. |
|  onValidate | `ValidateFieldHandler` | An optional callback function to [validate the field](api-form-hook.md#field-validation). |
|  metadata | `any` | An optional data value that is stored with the . |
|  children | `(checkboxField: FormiteCheckbox) => React.ReactNode` | A function that renders the children |

### Remarks

The CheckboxField component uses `children` as a render prop. (see example)

### Example

```typescript
<Form initialValues={{ remember: false }} onSubmitForm={handleSubmit} >
    {(form, fields) => (
        <CheckboxField field={fields.remember}>
            {checkbox => (
                <label><input {...checkbox} />Remember me</label>
            )}
        </CheckboxField>
    )}
</Form>
```

## RadioButtonField

RadioButtonField component to use a field with a standard HTML input element.

### Properties

|  Parameter | Type | Description |
|  --- | --- | --- |
|  field | `Field` | The [Field](api-form-hook.md#field) to connect to an input component. |
|  value | `string ǀ number` | The value that should be assigned to the field when the radio button in the group is selected. |
|  onValidate | `ValidateFieldHandler` | An optional callback function to [validate the field](api-form-hook.md#field-validation). |
|  metadata | `any` | An optional data value that is stored with the . |
|  children | `(radioButtonField: FormiteRadioButton) => React.ReactNode` | A function that renders the children |

### Remarks

The RadioButtonField component uses `children` as a render prop. (see example)

### Example

```typescript
<Form initialValues={{ gender: "" }} onSubmitForm={handleSubmit} >
    {(form, fields) => (
            <div>
                <RadioButtonField field={fields.gender} value="FEMALE"}>
                    {radioButton => (
                        <label><input {...radioButton} />Female</label>
                    )}
                </RadioButtonField>
                <RadioButtonField field={fields.gender} value="MALE">
                    {radioButton => (
                        <label><input {...radioButton} />Male</label>
                    )}
                </RadioButtonField>
        </div>
    )}
</Form>
```

## SelectField

SelectField component to use a field with a standard HTML input element.

### Properties

|  Parameter | Type | Description |
|  --- | --- | --- |
|  field | `Field` | The [Field](api-form-hook.md#field) to connect to a select component. |
|  onValidate | `ValidateFieldHandler` | An optional callback function to [validate the field](api-form-hook.md#field-validation). |
|  metadata | `any` | An optional data value that is stored with the . |
|  children | `(selectField: FormiteSelect) => React.ReactNode` | A function that renders the children |

### Remarks

The SelectField component uses `children` as a render prop. (see example)

### Example

```typescript
<Form initialValues={{ country: "" }} onSubmitForm={handleSubmit} >
    {(form, fields) => (
        <SelectField field={fields.country}>
            {field => (
                <select {...field}>
                    <option value="Germany">Germany</option>
                    <option value="USA">USA</option>
                </select>
            )}
        </SelectField>
    )}
</Form>
```

---
id: validation
title: Form validation
---
Formite supports validation of individual fields and / or validation of the entire form.

## Field Validation

Specify a [validation function](api-form-hook.md#field-validation) when using any of the [useField() Hooks](api-form-hook.md#usefield-hook) or any of the Field components.

The function receives the current value and should return `undefined` or an empty string if the value is valid. Otherwise it should return an error message. If validation is asynchronous the function should return a Promise.

You can access and display the error message either through `error` or `visibleError` on the [Field](api-form-hook.md#field).

### Example

```typescript
const required = (v: string, field: Field) => (v ? "" : "Field is required");

const handleSubmit = (values: any) => {
    console.log(values);
};

const LoginForm = () => {
    const { canSubmit, fields, Form } = useForm({ email: "", password: "" }, handleSubmit);
    return (
        <Form>
            <fieldset>
                <legend>Login form</legend>
                <label>Email</label>
                <input type="text" {...useInput(fields.email, required)} />
                <span>{fields.email.visibleError}</span>
                <label>Password</label>
                <input type="password" {...useInput(fields.password, required)} />
                <span>{fields.password.visibleError}</span>
            </fieldset>
            <button type="submit" disabled={!canSubmit}>Login</button>
        </Form>
    );
};
```

## Form Validation

Assign a [validation function](api-form-hook.md#form-validation) to [options.onValidate](api-form-hook.md#form-options) when calling the [useForm()](api-form-hook.md#useform-hook) hook.

The function should return an empty array if all fields are valid. Otherwise it should return an array with error messages. Also the function can use the supplied `setFieldError()` function to assign errors to individual fields.

You can access and display the form errors through the `formErrors` property of the [useForm() hooks state](api-form-hook.md#form-state-and-api).

### Example

```typescript
const handleValidateForm = (values: any) => {
    if (!values.firstName && !values.lastName) {
        return ["Missing names"];
    }
    return [];
};

const submitValues = (values: any) => {
    console.log(values);
};

const SimpleForm = () => {
    const { canSubmit, Form, fields, formErrors } = useForm(
        { firstName: "", lastName: "" },
        submitValues,
        { onValidate: handleValidateForm }
    );
    return (
        <Form>
            <fieldset>
                <label>First name</label>
                <input type="text" {...useInput(fields.firstName)} />
                <span>{fields.firstName.visibleError}</span>
                <label>Last name</label>
                <input type="text" {...useInput(fields.lastName)} />
                <span>{fields.lastName.visibleError}</span>
            </fieldset>
            <button type="submit" disabled={!canSubmit}>Save</button>
            <p>
                <span>{"Form errors: " + formErrors.join(", ")}</span>
            </p>
        </Form>
    );
};
```

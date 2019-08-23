# `formite-core`

> Easy forms with React hooks

## Installation

`npm install formite-core`

or

`yarn add formite-core`

It is recommended to use Formite with an adapter for your input elements like [formite-html](https://www.npmjs.com/package/formite-html).

## Usage without an adapter

```ts
import { useForm, useField } from "formite-core"

const required = (v: unknown) => (v ? "" : "Required field");

const submitValues = (values: unknown) => {
    console.log(values);
};

const SampleForm = () => {
    const form = useForm({ firstName: "Peter", lastName: "Smith" }, submitValues);
    const { canSubmit, fields, isDirty, submit } = form;
    const handleSubmit = useCallback(
        (ev: React.FormEvent<HTMLFormElement>) => {
            ev.preventDefault();
            submit();
        },
        [submit]
    );
    const firstNameField = useField(form, fields.firstName, required);
    const lastNameField = useField(form, fields.lastName, required);
    const handleFirstNameChange = useCallback(
        (ev: React.ChangeEvent<HTMLInputElement>) => firstNameField.handleChange(ev.currentTarget.value),
        [firstNameField]
    );
    const handleLastNameChange = useCallback(
        (ev: React.ChangeEvent<HTMLInputElement>) => lastNameField.handleChange(ev.currentTarget.value),
        [lastNameField]
    );
    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={fields.firstName.value}
                onBlur={firstNameField.handleBlur}
                onChange={handleFirstNameChange}
            />
            <span>{fields.firstName.error}</span>
            <input
                type="text"
                value={fields.lastName.value}
                onBlur={lastNameField.handleBlur}
                onChange={handleLastNameChange}
            />
            <span>{fields.lastName.error}</span>
            <button type="submit" disabled={!canSubmit}>Submit</button>
            <p>{"Is dirty: " + isDirty}</p>
            <p>{"Form errors: " + formErrors.join(", ")}</p>
        </form>
    );
};
```

See Storybook for more examples.

# `formite-html`

> Easy forms with React hooks

Use formite with HTML input elements.

## Installation

`npm install formite-core formite-html`

or

`yarn add formite-core formite-html`

## Usage

```ts
import { useForm, useInput } from "formite-html"

const handleSubmit = (values: unknown) => {
    console.log(values);
};

const SimpleForm = () => {
    const { canSubmit, fields, Form, isDirty } = useForm({ firstName: "", lastName: "" }, handleSubmit);
    return (
        <Form>
            <input type="text" placeholder="First name" {...useInput(fields.firstName)} />
            <input type="text" placeholder="Last name" {...useInput(fields.lastName)} />
            <button type="submit" disabled={!(canSubmit && isDirty)}>Save</button>
        </Form>
    );
};
```

See Storybook for more examples.

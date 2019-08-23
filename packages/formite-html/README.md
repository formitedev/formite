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
    const form = useForm({ firstName: "", lastName: "" }, handleSubmit);
    const { canSubmit, fields, Form, isDirty } = form;
    return (
        <Form>
            <input type="text" placeholder="First name" {...useInput(form, fields.firstName)} />
            <input type="text" placeholder="Last name" {...useInput(form, fields.lastName)} />
            <button type="submit" disabled={!(canSubmit && isDirty)}>Save</button>
        </Form>
    );
};
```

See Storybook for more examples.

# `formite-components`

> Easy forms with React hooks and class components.

Use formite with HTML class components.

## Installation

`npm install formite-core formite-components`

or

`yarn add formite-core formite-components`

## Usage

```ts
import { InputField, Form } from "formite-components"

const logSubmitted = action("submitted");

const handleSubmit = async (values: unknown) => {
    console.log(values);
};

class SimpleForm extends React.Component {
    public render() {
        return (
            <Form initialValues={{ firstName: "", lastName: "" }} onSubmitForm={handleSubmit}>
                {(form, fields) => (
                    <fieldset>
                        <InputField field={fields.firstName}>
                            {field => <input type="text" placeholder="First name" {...field} />}
                        </InputField>
                        <InputField field={fields.lastName}>
                            {field => <input type="text" placeholder="Last name" {...field} />}
                        </InputField>
                        <button type="submit" disabled={!(form.canSubmit && form.isDirty)}>Save</button>
                    </fieldset>
                )}
            </Form>
        );
    }
}
```

See Storybook for more examples.

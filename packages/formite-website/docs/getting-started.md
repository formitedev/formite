---
id: getting-started
title: Getting started
---
## Installation
You can add Formite to your `package.json` file with NPM or Yarn.

The package `formite-core` is required and you can install additional adapters like `formite-html` or `formite-components'.

```
npm install formite-core formite-html --save
```

or

```
yarn add formite-core formite-html
```

Formite is compatible with React v16.8+ and works with any UI framework or element.

## Usage

### Functional components

```typescript
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

### Class components

The Formite's components use `children` as a render prop:

```typescript
<Form initialValues={{ firstName: "", lastName: "" }} onSubmitForm={handleSubmit} >
    {(form, fields) => (
        <InputField field={fields.firstName}>
            {field => <input type="text" placeholder="First name" {...field} />}
        </InputField>
    )}
</Form>
```

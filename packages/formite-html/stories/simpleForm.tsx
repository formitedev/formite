import "../../../.storybook/base-min.css";
import "../../../.storybook/buttons-min.css";
import "../../../.storybook/forms-min.css";

import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import { formStyle } from "../../../.storybook/styles";

import { useForm, useInput } from "../src"; // "formite-html"

const logSubmitted = action("submitted");

const handleSubmit = (values: unknown) => {
    logSubmitted(values);
};

const SimpleForm = () => {
    const { canSubmit, fields, Form, isDirty } = useForm({ firstName: "", lastName: "" }, handleSubmit);
    return (
        <Form className="pure-form pure-form-stacked">
            <input type="text" placeholder="First name" {...useInput(fields.firstName)} />
            <input type="text" placeholder="Last name" {...useInput(fields.lastName)} />
            <button type="submit" className="pure-button pure-button-primary" disabled={!(canSubmit && isDirty)}>
                Save
            </button>
        </Form>
    );
};

storiesOf("Formite HTML Hooks", module)
    .addDecorator(formStyle)
    .add("Simple Form", () => <SimpleForm />);

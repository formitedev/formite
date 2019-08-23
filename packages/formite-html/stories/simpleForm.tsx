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
    const form = useForm({ firstName: "", lastName: "" }, handleSubmit);
    const { canSubmit, fields, Form, isDirty } = form;
    return (
        <Form className="pure-form pure-form-stacked">
            <input type="text" placeholder="First name" {...useInput(form, fields.firstName)} />
            <input type="text" placeholder="Last name" {...useInput(form, fields.lastName)} />
            <button type="submit" className="pure-button pure-button-primary" disabled={!(canSubmit && isDirty)}>
                Save
            </button>
        </Form>
    );
};

storiesOf("Formite HTML Hooks", module)
    .addDecorator(formStyle)
    .add("Simple Form", () => <SimpleForm />);

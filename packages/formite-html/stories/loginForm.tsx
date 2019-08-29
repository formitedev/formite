import "../../../.storybook/base-min.css";
import "../../../.storybook/buttons-min.css";
import "../../../.storybook/forms-min.css";

import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import { formStyle } from "../../../.storybook/styles";

import { Field } from "formite-core";
import { useForm, useInput, useCheckbox } from "../src"; // "formite-html"

const logSubmitted = action("submitted");

const required = (v: string, field: Field) => (v ? "" : field.metadata); // metadata contains a custom error message

const handleSubmit = (values: unknown) => {
    logSubmitted(values);
};

const LoginForm = () => {
    const { canSubmit, fields, Form, isDirty } = useForm({ email: "", password: "", remember: false }, handleSubmit);
    return (
        <Form className="pure-form pure-form-stacked">
            <fieldset>
                <legend>Login form</legend>
                <label>Email</label>
                <input type="text" {...useInput(fields.email, required, "Email is required")} />
                <span className="pure-form-message">{fields.email.visibleError}</span>
                <label>Password</label>
                <input type="password" {...useInput(fields.password, required, "Password is required")} />
                <span className="pure-form-message">{fields.password.visibleError}</span>
                <label className="pure-checkbox">
                    <input {...useCheckbox(fields.remember)} />
                    <span> Remember me</span>
                </label>
            </fieldset>
            <button type="submit" className="pure-button pure-button-primary" disabled={!(canSubmit && isDirty)}>
                Login
            </button>
        </Form>
    );
};

storiesOf("Formite HTML Hooks", module)
    .addDecorator(formStyle)
    .add("Login Form", () => <LoginForm />);

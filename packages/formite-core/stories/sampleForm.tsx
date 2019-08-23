import React, { useCallback } from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import { formStyle } from "../../../.storybook/styles";

import { useForm, useField } from "../src"; // "formite-core"

type Person = { firstName: string; lastName: string };

const logSubmitted = action("submitted");

const required = (v: unknown) => (v ? "" : "Required field");

const handleValidateForm = (values: Person) => {
    if (!values.firstName && !values.lastName) {
        return ["Missing names"];
    }
    return [];
};

const submitValues = async (values: Person) => {
    logSubmitted(values);
};

const SampleForm = () => {
    const form = useForm({ firstName: "Peter", lastName: "Smith" }, submitValues, { onValidate: handleValidateForm });
    const { canSubmit, fields, formErrors, isDirty, submit } = form;
    const handleSubmit = useCallback(
        (ev: React.FormEvent<HTMLFormElement>) => {
            ev.preventDefault();
            submit();
        },
        [submit]
    );
    const firstNameField = useField(form, fields.firstName, required);
    const lastNameField = useField(form, fields.lastName, required);
    return (
        <form onSubmit={handleSubmit}>
            <p>
                <input
                    type="text"
                    value={fields.firstName.value}
                    onBlur={firstNameField.handleBlur}
                    onChange={ev => firstNameField.handleChange(ev.currentTarget.value)}
                />
                <span>{fields.firstName.error}</span>
            </p>
            <p>
                <input
                    type="text"
                    value={fields.lastName.value}
                    onBlur={lastNameField.handleBlur}
                    onChange={ev => lastNameField.handleChange(ev.currentTarget.value)}
                />
                <span>{fields.lastName.error}</span>
            </p>
            <p>
                <button type="submit" disabled={!canSubmit}>
                    Submit
                </button>
            </p>
            <p>{"Is dirty: " + isDirty}</p>
            <p>{"Form errors: " + formErrors.join(", ")}</p>
        </form>
    );
};

storiesOf("Formite Core Hooks", module)
    .addDecorator(formStyle)
    .add("Sample Form", () => <SampleForm />);

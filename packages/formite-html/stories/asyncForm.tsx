import "../../../.storybook/base-min.css";
import "../../../.storybook/buttons-min.css";
import "../../../.storybook/forms-min.css";

import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import { formStyle } from "../../../.storybook/styles";

import { useForm, useInput } from "../src"; // "formite-html"

type Person = { firstName: string; lastName: string };

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const asyncRequired = async (v: unknown) => {
    await delay(300);
    return v ? "" : "Required";
};

const handleValidateForm = async (values: Person) => {
    await delay(1000);
    if (!values.firstName && !values.lastName) {
        return ["Missing names"];
    }
    return [];
};

const logSubmitting = action("submitting");
const logSubmitted = action("submitted");

const submitValues = async (values: Person) => {
    logSubmitting();
    await delay(500);
    logSubmitted(values);
};

const AsyncForm = () => {
    const { canSubmit, Form, fields, formErrors, isDirty, setFieldValue, isSubmitting } = useForm(
        { firstName: "Peter", lastName: "Smith" },
        submitValues,
        { onValidate: handleValidateForm }
    );
    return (
        <Form className="pure-form pure-form-stacked">
            <fieldset>
                <legend>Async form</legend>
                <label>First name</label>
                <input type="text" {...useInput(fields.firstName, asyncRequired)} />
                <span className="pure-form-message">
                    {fields.firstName.isValidating
                        ? "Is validating"
                        : fields.firstName.visibleError
                        ? fields.firstName.visibleError
                        : "*"}
                </span>
                <label>Last name</label>
                <input type="text" {...useInput(fields.lastName, asyncRequired)} />
                <span className="pure-form-message">
                    {fields.lastName.isValidating
                        ? "Is validating"
                        : fields.lastName.visibleError
                        ? fields.lastName.visibleError
                        : "*"}
                </span>
            </fieldset>
            <div className="pure-button-group">
                <button type="button" className="pure-button" onClick={() => setFieldValue(fields.firstName, "Robert")}>
                    Change first name
                </button>
                <button type="submit" className="pure-button pure-button-primary" disabled={!(canSubmit && isDirty)}>
                    Save
                </button>
            </div>
            <p>
                <span className="pure-form-message">{"First name: " + fields.firstName.value}</span>
                <span className="pure-form-message">{"Form errors: " + formErrors.join(", ")}</span>
                <span className="pure-form-message">{"Is submitting: " + isSubmitting}</span>
            </p>
        </Form>
    );
};

storiesOf("Formite HTML Hooks", module)
    .addDecorator(formStyle)
    .add("Async Form", () => <AsyncForm />);

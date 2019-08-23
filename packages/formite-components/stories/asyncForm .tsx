import "../../../.storybook/base-min.css";
import "../../../.storybook/buttons-min.css";
import "../../../.storybook/forms-min.css";

import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import { formStyle } from "../../../.storybook/styles";

import { InputField, Form } from "../src"; // "formite-components"

import { SampleType, SampleValues } from "formite-sample";

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const asyncRequired = async (v: unknown) => {
    await delay(300);
    return v ? "" : "Required";
};

const handleValidateForm = async (values: SampleType) => {
    await delay(1000);
    if (!values.firstName && !values.lastName) {
        return ["First and last names are missing"];
    }
    return [];
};

const logSubmitting = action("submitting");
const logSubmitted = action("submitted");

const handleSubmit = async (values: SampleType) => {
    logSubmitting();
    await delay(500);
    logSubmitted(values);
};

class AsyncForm extends React.Component {
    public render() {
        return (
            <Form
                className="pure-form pure-form-stacked"
                initialValues={SampleValues}
                onSubmitForm={handleSubmit}
                onValidate={handleValidateForm}
            >
                {(form, fields) => (
                    <fieldset>
                        <legend>Async form</legend>
                        <label>First name</label>
                        <InputField field={fields.firstName} onValidate={asyncRequired}>
                            {field => <input type="text" {...field} />}
                        </InputField>
                        <span className="pure-form-message">
                            {fields.firstName.isValidating
                                ? "Is validating"
                                : fields.firstName.visibleError
                                ? fields.firstName.visibleError
                                : "*"}
                        </span>
                        <label>Last name</label>
                        <InputField field={fields.lastName} onValidate={asyncRequired}>
                            {field => <input type="text" {...field} />}
                        </InputField>
                        <span className="pure-form-message">
                            {fields.lastName.isValidating
                                ? "Is validating"
                                : fields.lastName.visibleError
                                ? fields.lastName.visibleError
                                : "*"}
                        </span>
                        <div className="pure-button-group">
                            <button
                                type="button"
                                className="pure-button"
                                onClick={() => form.setFieldValue(fields.firstName, "Robert")}
                            >
                                Change first name
                            </button>
                            <button
                                type="submit"
                                className="pure-button pure-button-primary"
                                disabled={!(form.canSubmit && form.isDirty)}
                            >
                                Save
                            </button>
                        </div>
                        <p>
                            <span className="pure-form-message">{"First name: " + fields.firstName.value}</span>
                            <span className="pure-form-message">{"Form errors: " + form.formErrors.join(", ")}</span>
                            <span className="pure-form-message">{"Is submitting: " + form.isSubmitting}</span>
                        </p>
                    </fieldset>
                )}
            </Form>
        );
    }
}

storiesOf("Formite Components", module)
    .addDecorator(formStyle)
    .add("Async Form", () => <AsyncForm />);

import "../../../.storybook/base-min.css";
import "../../../.storybook/buttons-min.css";
import "../../../.storybook/forms-min.css";

import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import { formStyle } from "../../../.storybook/styles";

import { InputField, Form } from "../src"; // "formite-components"

import { SampleType, SampleValues, Gender } from "formite-sample";
import RadioButtonField from "../src/components/RadioButtonField";
import SelectField from "../src/components/SelectField";
import CheckboxField from "../src/components/CheckboxField";

const handleValidateForm = async (values: SampleType) => {
    if (!values.firstName && !values.lastName) {
        return ["First and last names are missing"];
    }
    return [];
};

const logSubmitted = action("submitted");

const required = (v: unknown) => (v ? "" : "Required");

const handleSubmit = async (values: SampleType) => {
    logSubmitted(values);
};

class ComplexForm extends React.Component {
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
                        <legend>Complex form</legend>
                        <label>Gender</label>
                        <div>
                            <RadioButtonField field={fields.gender} value={Gender.Female}>
                                {radioButton => (
                                    <label className="pure-radio">
                                        <input {...radioButton} />
                                        <span> Female</span>
                                    </label>
                                )}
                            </RadioButtonField>
                            <RadioButtonField field={fields.gender} value={Gender.Male}>
                                {radioButton => (
                                    <label className="pure-radio">
                                        <input {...radioButton} />
                                        <span> Male</span>
                                    </label>
                                )}
                            </RadioButtonField>
                        </div>
                        <label>First name</label>
                        <InputField field={fields.firstName} onValidate={required}>
                            {field => <input type="text" {...field} />}
                        </InputField>
                        <span className="pure-form-message">
                            {fields.firstName.visibleError ? fields.firstName.visibleError : "*"}
                        </span>
                        <label>Last name</label>
                        <InputField field={fields.lastName} onValidate={required}>
                            {field => <input type="text" {...field} />}
                        </InputField>
                        <span className="pure-form-message">
                            {fields.lastName.visibleError ? fields.lastName.visibleError : "*"}
                        </span>
                        <label>Invoice country</label>
                        <SelectField field={fields.invoiceAddress.country}>
                            {field => (
                                <select {...field}>
                                    <option value="Canada">Canada</option>
                                    <option value="Germany">Germany</option>
                                    <option value="USA">USA</option>
                                </select>
                            )}
                        </SelectField>
                        <CheckboxField field={fields.newsletter}>
                            {checkbox => (
                                <label className="pure-checkbox">
                                    <input {...checkbox} />
                                    <span> Subscribe to newsletter</span>
                                </label>
                            )}
                        </CheckboxField>
                        <button
                            type="submit"
                            className="pure-button pure-button-primary"
                            disabled={!(form.canSubmit && form.isDirty)}
                        >
                            Save
                        </button>
                        <p>
                            <span className="pure-form-message">{"Form errors: " + form.formErrors.join(", ")}</span>
                        </p>
                    </fieldset>
                )}
            </Form>
        );
    }
}

storiesOf("Formite Components", module)
    .addDecorator(formStyle)
    .add("Complex Form", () => <ComplexForm />);

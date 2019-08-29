import "../../../.storybook/base-min.css";
import "../../../.storybook/buttons-min.css";
import "../../../.storybook/forms-min.css";

import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import { formStyle } from "../../../.storybook/styles";

import { useForm, useInput, useSelect, useCheckbox, useRadioButton } from "../src"; // "formite-html"

import { Gender, SampleType, SampleValues } from "formite-sample";

const handleValidateForm = async (values: SampleType) => {
    if (!values.firstName && !values.lastName) {
        return ["First and last names are missing"];
    }
    return [];
};

const logSubmitted = action("submitted");

const required = (v: unknown) => (v ? "" : "Required");

const submitValues = async (values: SampleType) => {
    logSubmitted(values);
};

const ComplexForm = () => {
    const { canSubmit, Form, fields, formErrors, isDirty } = useForm(SampleValues, submitValues, {
        onValidate: handleValidateForm
    });
    return (
        <Form className="pure-form pure-form-stacked">
            <fieldset>
                <legend>Complex form</legend>
                <label>Gender</label>
                <div>
                    <label className="pure-radio">
                        <input {...useRadioButton(fields.gender, Gender.Female)} />
                        <span> Female</span>
                    </label>
                    <label className="pure-radio">
                        <input {...useRadioButton(fields.gender, Gender.Male)} />
                        <span> Male</span>
                    </label>
                </div>
                <label>First name</label>
                <input type="text" {...useInput(fields.firstName, required)} />
                <span className="pure-form-message">
                    {fields.firstName.visibleError ? fields.firstName.visibleError : "*"}
                </span>
                <label>Last name</label>
                <input type="text" {...useInput(fields.lastName, required)} />
                <span className="pure-form-message">
                    {fields.lastName.visibleError ? fields.lastName.visibleError : "*"}
                </span>
                <label>Invoice country</label>
                <select {...useSelect(fields.invoiceAddress.country)}>
                    <option value="Canada">Canada</option>
                    <option value="Germany">Germany</option>
                    <option value="USA">USA</option>
                </select>
                <label className="pure-checkbox">
                    <input {...useCheckbox(fields.newsletter)} />
                    <span> Subscribe to newsletter</span>
                </label>
            </fieldset>
            <div className="pure-button-group">
                <button type="submit" className="pure-button pure-button-primary" disabled={!(canSubmit && isDirty)}>
                    Save
                </button>
            </div>
            <p>
                <span className="pure-form-message">{"Form errors: " + formErrors.join(", ")}</span>
            </p>
        </Form>
    );
};

storiesOf("Formite HTML Hooks", module)
    .addDecorator(formStyle)
    .add("Complex Form", () => <ComplexForm />);

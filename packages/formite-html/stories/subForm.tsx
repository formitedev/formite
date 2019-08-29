import "../../../.storybook/base-min.css";
import "../../../.storybook/buttons-min.css";
import "../../../.storybook/forms-min.css";

import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import { formStyle } from "../../../.storybook/styles";

import { Fields } from "formite-core";

import { useForm, useInput, useSelect } from "../src"; // "formite-html"

import { AddressType, SampleType, SampleValues } from "formite-sample";

const logSubmitted = action("submitted");

const required = (v: unknown) => (v ? "" : "Required");

const handleSubmit = (values: SampleType) => {
    logSubmitted(values);
};

const AddressForm = (props: { caption: string; address: Fields<AddressType> }) => {
    const { caption, address } = props;
    return (
        <fieldset>
            <legend>{caption}</legend>
            <label>City</label>
            <input type="text" {...useInput(address.city, required)} />
            <span className="pure-form-message">{address.city.visibleError ? address.city.visibleError : "*"}</span>
            <label>Country</label>
            <select {...useSelect(address.country)}>
                <option value="Canada">Canada</option>
                <option value="Germany">Germany</option>
                <option value="USA">USA</option>
            </select>
        </fieldset>
    );
};

const SubForm = () => {
    const { canSubmit, Form, fields, formErrors, isDirty, isSubmitting } = useForm(SampleValues, handleSubmit);
    return (
        <Form className="pure-form pure-form-stacked">
            <AddressForm address={fields.invoiceAddress} caption="Invoice address" />
            <AddressForm address={fields.shippingAddress} caption="Shipping address" />
            <button type="submit" className="pure-button pure-button-primary" disabled={!(canSubmit && isDirty)}>
                Save
            </button>
            <p>
                <span className="pure-form-message">{"Form errors: " + formErrors.join(", ")}</span>
                <span className="pure-form-message">{"Is submitting: " + isSubmitting}</span>
            </p>
        </Form>
    );
};

storiesOf("Formite HTML Hooks", module)
    .addDecorator(formStyle)
    .add("Sub Form", () => <SubForm />);

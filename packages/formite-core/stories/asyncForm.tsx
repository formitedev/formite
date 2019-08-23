import React, { useEffect, useCallback, useState } from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import { formStyle } from "../../../.storybook/styles";

import { useForm, useField } from "../src"; // "formite-core"

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
    const form = useForm({ firstName: "", lastName: "" }, submitValues, { onValidate: handleValidateForm });
    const { canSubmit, fields, formErrors, isSubmitting, isValid, isValidating, setFieldValue, submit } = form;
    // Simulate loading of data
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        async function loadData() {
            await delay(4000);
            setFieldValue(fields.firstName, "Peter");
            setFieldValue(fields.lastName, "Smith");
            setIsLoading(false);
        }
        loadData();
    }, [fields.firstName, fields.lastName, setFieldValue]);
    const handleSubmit = useCallback(
        (ev: React.FormEvent<HTMLFormElement>) => {
            ev.preventDefault();
            submit();
        },
        [submit]
    );
    const firstNameField = useField(form, fields.firstName, asyncRequired);
    const lastNameField = useField(form, fields.lastName, asyncRequired);
    if (isLoading) {
        return <p>Loading...</p>;
    }
    return (
        <form onSubmit={handleSubmit}>
            <p>
                <input
                    type="text"
                    value={fields.firstName.value}
                    onBlur={firstNameField.handleBlur}
                    onChange={ev => firstNameField.handleChange(ev.currentTarget.value)}
                />
                <span>{fields.firstName.isValidating ? "Is validating" : ""}</span>
                <span>{fields.firstName.error}</span>
            </p>
            <p>
                <input
                    type="text"
                    value={fields.lastName.value}
                    onBlur={lastNameField.handleBlur}
                    onChange={ev => lastNameField.handleChange(ev.currentTarget.value)}
                />
                <span>{fields.lastName.isValidating ? "Is validating" : ""}</span>
                <span>{fields.lastName.error}</span>
            </p>
            <p>
                <button type="button" onClick={() => setFieldValue(fields.firstName, "Robert")}>
                    Change first name
                </button>
                <button type="submit" disabled={!canSubmit}>
                    Submit
                </button>
            </p>
            <p>{"Is validating form: " + isValidating}</p>
            <p>{"Is valid: " + isValid}</p>
            <p>{"Form errors: " + formErrors.join(", ")}</p>
            <p>{"Is submitting: " + isSubmitting}</p>
        </form>
    );
};

storiesOf("Formite Core Hooks", module)
    .addDecorator(formStyle)
    .add("Async Form", () => <AsyncForm />);

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
    const { canSubmit, fields, formErrors, isSubmitting, isValid, isValidating, setFieldValue, submit } = useForm(
        { firstName: "", lastName: "" },
        submitValues,
        { onValidate: handleValidateForm }
    );
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
    const firstNameField = useField(fields.firstName, asyncRequired);
    const lastNameField = useField(fields.lastName, asyncRequired);
    const handleFirstNameChange = useCallback(
        (ev: React.ChangeEvent<HTMLInputElement>) => firstNameField.onChange(ev.currentTarget.value),
        [firstNameField]
    );
    const handleLastNameChange = useCallback(
        (ev: React.ChangeEvent<HTMLInputElement>) => lastNameField.onChange(ev.currentTarget.value),
        [lastNameField]
    );
    if (isLoading) {
        return <p>Loading...</p>;
    }
    return (
        <form onSubmit={handleSubmit}>
            <p>
                <input
                    type="text"
                    value={firstNameField.value}
                    onBlur={firstNameField.onBlur}
                    onChange={handleFirstNameChange}
                />
                <span>{fields.firstName.isValidating ? "Is validating" : ""}</span>
                <span>{fields.firstName.error}</span>
            </p>
            <p>
                <input
                    type="text"
                    value={lastNameField.value}
                    onBlur={lastNameField.onBlur}
                    onChange={handleLastNameChange}
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

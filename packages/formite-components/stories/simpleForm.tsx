import "../../../.storybook/base-min.css";
import "../../../.storybook/buttons-min.css";
import "../../../.storybook/forms-min.css";

import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import { formStyle } from "../../../.storybook/styles";

import { InputField, Form } from "../src"; // "formite-components"

const logSubmitted = action("submitted");

const handleSubmit = async (values: unknown) => {
    logSubmitted(values);
};

class SimpleForm extends React.Component {
    public render() {
        return (
            <Form
                className="pure-form pure-form-stacked"
                initialValues={{ firstName: "", lastName: "" }}
                onSubmitForm={handleSubmit}
            >
                {(form, fields) => (
                    <fieldset>
                        <InputField field={fields.firstName}>
                            {field => <input type="text" placeholder="First name" {...field} />}
                        </InputField>
                        <InputField field={fields.lastName}>
                            {field => <input type="text" placeholder="Last name" {...field} />}
                        </InputField>
                        <button
                            type="submit"
                            className="pure-button pure-button-primary"
                            disabled={!(form.canSubmit && form.isDirty)}
                        >
                            Save
                        </button>
                    </fieldset>
                )}
            </Form>
        );
    }
}

storiesOf("Formite Components", module)
    .addDecorator(formStyle)
    .add("Simple Form", () => <SimpleForm />);

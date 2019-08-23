import "../../../.storybook/base-min.css";
import "../../../.storybook/buttons-min.css";
import "../../../.storybook/forms-min.css";
import "../../../.storybook/grids-core-min.css";

import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import { formStyle } from "../../../.storybook/styles";

import { Fields, createFields, FormiteForm } from "formite-core";

import { InputField, Form } from "../src"; // "formite-components"

import { FriendType, SampleType, SampleValues } from "formite-sample";

const logSubmitted = action("submitted");

const required = (v: unknown) => (v ? "" : "Required");

const handleSubmit = (values: SampleType) => {
    logSubmitted(values);
};

class FriendForm extends React.Component<{ friend: Fields<FriendType> }> {
    public render() {
        const { friend } = this.props;
        return (
            <div className="pure-g">
                <div className="pure-u">
                    <label>First name</label>
                    <InputField field={friend.firstName} onValidate={required}>
                        {field => <input type="text" {...field} />}
                    </InputField>
                    <span className="pure-form-message">
                        {friend.firstName.visibleError ? friend.firstName.visibleError : "*"}
                    </span>
                </div>
                <div className="pure-u">
                    <label>Last name</label>
                    <InputField field={friend.lastName} onValidate={required}>
                        {field => <input type="text" {...field} />}
                    </InputField>
                    <span className="pure-form-message">
                        {friend.lastName.visibleError ? friend.lastName.visibleError : "*"}
                    </span>
                </div>
            </div>
        );
    }
}

class DynamicForm extends React.Component {
    private form!: FormiteForm<SampleType>;
    private friendsModified = false;

    public render() {
        return (
            <Form className="pure-form pure-form-stacked" initialValues={SampleValues} onSubmitForm={handleSubmit}>
                {(form, fields) => {
                    // Store a reference to the form so that it can be used in event handler methods
                    this.form = form;
                    const { canSubmit, isDirty } = form;
                    return (
                        <>
                            {fields.friends.map((friend, index) => (
                                <FriendForm key={index} friend={friend} />
                            ))}
                            <div className="pure-button-group">
                                <button type="button" className="pure-button" onClick={this.handleAddFriend}>
                                    Add friend
                                </button>
                                <button
                                    type="button"
                                    className="pure-button"
                                    disabled={fields.friends.length === 0}
                                    onClick={this.handleRemoveFriend}
                                >
                                    Remove friend
                                </button>
                                <button type="button" className="pure-button" onClick={this.handleReset}>
                                    Reset
                                </button>
                                <button
                                    type="submit"
                                    className="pure-button pure-button-primary"
                                    disabled={!(canSubmit && (isDirty || this.friendsModified))}
                                >
                                    Save
                                </button>
                            </div>
                        </>
                    );
                }}
            </Form>
        );
    }

    private handleAddFriend = () => {
        const { updateFields } = this.form;
        updateFields(newFields => {
            const newFriend = createFields({
                firstName: "",
                lastName: ""
            });
            newFields.friends.push(newFriend);
        });
        this.friendsModified = true;
    };

    private handleRemoveFriend = () => {
        const { updateFields } = this.form;
        updateFields(newFields => {
            newFields.friends.splice(newFields.friends.length - 1, 1);
        });
        this.friendsModified = true;
    };

    private handleReset = () => {
        const { reset } = this.form;
        reset();
        this.friendsModified = false;
    };
}

storiesOf("Formite Components", module)
    .addDecorator(formStyle)
    .add("Dynamic Form", () => <DynamicForm />);

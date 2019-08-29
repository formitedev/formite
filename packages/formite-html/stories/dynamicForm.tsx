import "../../../.storybook/base-min.css";
import "../../../.storybook/buttons-min.css";
import "../../../.storybook/forms-min.css";
import "../../../.storybook/grids-core-min.css";

import React, { useCallback, useState } from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import { formStyle } from "../../../.storybook/styles";

import { Fields, createFields } from "formite-core";

import { useForm, useInput } from "../src"; // "formite-html"

import { FriendType, SampleType, SampleValues } from "formite-sample";

const logSubmitted = action("submitted");

const required = (v: unknown) => (v ? "" : "Required");

const handleSubmit = (values: SampleType) => {
    logSubmitted(values);
};

const FriendForm = (props: { friend: Fields<FriendType> }) => {
    const { friend } = props;
    return (
        <div className="pure-g">
            <div className="pure-u">
                <label>First name</label>
                <input type="text" className="pure-u" {...useInput(friend.firstName, required)} />
                <span className="pure-form-message">
                    {friend.firstName.visibleError ? friend.firstName.visibleError : "*"}
                </span>
            </div>
            <div className="pure-u">
                <label>Last name</label>
                <input type="text" className="pure-u" {...useInput(friend.lastName, required)} />
                <span className="pure-form-message">
                    {friend.lastName.visibleError ? friend.lastName.visibleError : "*"}
                </span>
            </div>
        </div>
    );
};

const DynamicForm = () => {
    const { canSubmit, Form, fields, isDirty, reset, updateFields } = useForm(SampleValues, handleSubmit);
    const [friendsModified, setFriendsModified] = useState(false);
    const addFriend = useCallback(() => {
        updateFields(newFields => {
            const newFriend = createFields({
                firstName: "",
                lastName: ""
            });
            newFields.friends.push(newFriend);
        });
        setFriendsModified(true);
    }, [updateFields]);
    const removeFriend = useCallback(() => {
        updateFields(newFields => {
            newFields.friends.splice(newFields.friends.length - 1, 1);
        });
        setFriendsModified(true);
    }, [updateFields]);
    const resetForm = useCallback(() => {
        reset();
        setFriendsModified(false);
    }, [reset]);
    return (
        <Form className="pure-form pure-form-stacked">
            {fields.friends.map((friend, index) => (
                <FriendForm key={index} friend={friend} />
            ))}
            <div className="pure-button-group">
                <button type="button" className="pure-button" onClick={addFriend}>
                    Add friend
                </button>
                <button
                    type="button"
                    className="pure-button"
                    disabled={fields.friends.length === 0}
                    onClick={removeFriend}
                >
                    Remove friend
                </button>
                <button type="button" className="pure-button" onClick={resetForm}>
                    Reset
                </button>
                <button
                    type="submit"
                    className="pure-button pure-button-primary"
                    disabled={!(canSubmit && (isDirty || friendsModified))}
                >
                    Save
                </button>
            </div>
        </Form>
    );
};

storiesOf("Formite HTML Hooks", module)
    .addDecorator(formStyle)
    .add("Dynamic Form", () => <DynamicForm />);

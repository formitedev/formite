import { act, renderHook } from "@testing-library/react-hooks";

import { createSampleValues, SampleValues, SampleType } from "formite-sample";

import { actAsync } from "./asyncHelper";

import { useForm, ValidateFormHandler, useField, createFields } from "../src"; // "formite-core"

const noop = () => {};

const ChangedValues = createSampleValues();
ChangedValues.firstName = "Jack";
ChangedValues.invoiceAddress.city = "San Francisco";

describe("Formite Core", () => {
    test("Can use form hook", () => {
        const {
            result: { error }
        } = renderHook(() => useForm(SampleValues, noop));
        expect(error).toBeUndefined();
    });

    test("Returns an empty array of form validation errors", () => {
        const {
            result: {
                current: { formErrors }
            }
        } = renderHook(() => useForm(SampleValues, noop));
        expect(formErrors).toHaveLength(0);
    });

    test("Returns fields with initial values", () => {
        const {
            result: {
                current: { fields }
            }
        } = renderHook(() => useForm(SampleValues, noop));
        // Each field's initialValue should be from the initialValues
        expect(fields.firstName.initialValue).toBe(SampleValues.firstName);
        expect(fields.lastName.initialValue).toBe(SampleValues.lastName);
        expect(fields.invoiceAddress.city.initialValue).toBe(SampleValues.invoiceAddress.city);
        expect(fields.invoiceAddress.country.initialValue).toBe(SampleValues.invoiceAddress.country);
        expect(fields.friends).toHaveLength(SampleValues.friends.length);
        expect(fields.friends[0].firstName.initialValue).toBe(SampleValues.friends[0].firstName);
        expect(fields.friends[0].lastName.initialValue).toBe(SampleValues.friends[0].lastName);
        expect(fields.friends[1].firstName.initialValue).toBe(SampleValues.friends[1].firstName);
        expect(fields.friends[1].lastName.initialValue).toBe(SampleValues.friends[1].lastName);
        // Each field's value should be from the initialValues
        expect(fields.firstName.value).toBe(SampleValues.firstName);
        expect(fields.lastName.value).toBe(SampleValues.lastName);
        expect(fields.invoiceAddress.city.value).toBe(SampleValues.invoiceAddress.city);
        expect(fields.invoiceAddress.country.value).toBe(SampleValues.invoiceAddress.country);
        expect(fields.friends).toHaveLength(SampleValues.friends.length);
        expect(fields.friends[0].firstName.value).toBe(SampleValues.friends[0].firstName);
        expect(fields.friends[0].lastName.value).toBe(SampleValues.friends[0].lastName);
        expect(fields.friends[1].firstName.value).toBe(SampleValues.friends[1].firstName);
        expect(fields.friends[1].lastName.value).toBe(SampleValues.friends[1].lastName);
    });

    test("Validates initial values by default", async () => {
        const handleValidate = jest.fn();
        const handleValidateField = jest.fn();
        const { result, waitForNextUpdate } = renderHook(() => {
            const form = useForm(SampleValues, noop, { onValidate: handleValidate });
            useField(form.fields.firstName, handleValidateField);
            return form;
        });
        expect(result.current.isValid).toBe(false);
        await waitForNextUpdate();
        expect(handleValidate.mock.calls).toHaveLength(1);
        expect(handleValidateField.mock.calls).toHaveLength(1);
        expect(result.current.isValid).toBe(true);
    });

    test("Can disable validation of initial values", () => {
        const handleValidate = jest.fn();
        const { result } = renderHook(() =>
            useForm(SampleValues, noop, { validateInitialValues: false, onValidate: handleValidate })
        );
        expect(handleValidate.mock.calls).toHaveLength(0);
        expect(result.current.isValid).toBe(true);
    });

    test("Sets is dirty after change", () => {
        const { result } = renderHook(() => useForm(SampleValues, noop));
        expect(result.current.isDirty).toBe(false);
        act(() => {
            result.current.setFieldValue(result.current.fields.firstName, ChangedValues.firstName);
        });
        expect(result.current.isDirty).toBe(true);
        // Undo change
        act(() => {
            result.current.setFieldValue(result.current.fields.firstName, SampleValues.firstName);
        });
        expect(result.current.isDirty).toBe(false);
    });

    test("Calls form validation with current values", () => {
        const handleValidateForm = jest.fn().mockReturnValue(["Form error"]);
        const { result } = renderHook(() =>
            useForm(SampleValues, noop, { validateInitialValues: false, onValidate: handleValidateForm })
        );
        const {
            current: { fields, setFieldValue }
        } = result;
        act(() => {
            setFieldValue(fields.firstName, ChangedValues.firstName);
            setFieldValue(fields.invoiceAddress.city, ChangedValues.invoiceAddress.city);
        });
        expect(handleValidateForm.mock.calls).toHaveLength(2);
        expect(handleValidateForm.mock.calls[1][0]).toStrictEqual(ChangedValues);
        expect(result.current.formErrors).toEqual(["Form error"]);
    });

    test("Validate form handler can set field errors", async () => {
        const validateForm: ValidateFormHandler<SampleType> = (_values, fields, setFieldError) => {
            setFieldError(fields.firstName, "Field error");
            return [];
        };
        const handleValidateForm = jest.fn(validateForm);
        const { result, waitForNextUpdate } = renderHook(() =>
            useForm(SampleValues, noop, { validateInitialValues: false, onValidate: handleValidateForm })
        );
        const { fields, setFieldValue } = result.current;
        act(() => {
            setFieldValue(fields.firstName, "Jack");
        });
        await waitForNextUpdate();
        expect(fields.firstName.value).toBe("Jack");
        expect(handleValidateForm.mock.calls).toHaveLength(1);
        expect(result.current.formErrors).toEqual([]);
        expect(fields.firstName.error).toEqual("Field error");
        expect(result.current.isValid).toBe(false);
    });

    test("Submits initial values", async () => {
        const handleSubmit = jest.fn();
        const {
            result: {
                current: { submit }
            }
        } = renderHook(() => useForm(SampleValues, handleSubmit));
        await actAsync(async () => {
            await submit();
        });
        expect(handleSubmit.mock.calls).toHaveLength(1);
        expect(handleSubmit.mock.calls[0][0]).toStrictEqual(SampleValues);
    });

    test("Submits changed values", async () => {
        const handleSubmit = jest.fn();
        const {
            result: {
                current: { fields, setFieldValue, submit }
            }
        } = renderHook(() => useForm(SampleValues, handleSubmit));
        let wasSubmitted = false;
        await actAsync(async () => {
            setFieldValue(fields.firstName, ChangedValues.firstName);
            setFieldValue(fields.invoiceAddress.city, ChangedValues.invoiceAddress.city);
            wasSubmitted = await submit();
        });
        expect(wasSubmitted).toBe(true);
        expect(handleSubmit.mock.calls).toHaveLength(1);
        expect(handleSubmit.mock.calls[0][0]).toStrictEqual(ChangedValues);
    });

    test("Does not submit invalid field values", async () => {
        const handleValidateField = jest.fn().mockReturnValue("Field error");
        const handleSubmit = jest.fn();
        const {
            result: {
                current: { fields, setFieldValue, submit }
            }
        } = renderHook(() => {
            const form = useForm(SampleValues, handleSubmit, { validateInitialValues: false });
            useField(form.fields.firstName, handleValidateField);
            return form;
        });
        let wasSubmitted = false;
        await actAsync(async () => {
            setFieldValue(fields.firstName, "");
            wasSubmitted = await submit();
        });
        expect(wasSubmitted).toBe(false);
        expect(handleSubmit.mock.calls).toHaveLength(0);
    });

    test("Does not submit invalid form values", async () => {
        const handleValidateForm = jest.fn().mockReturnValue(["Form error"]);
        const handleSubmit = jest.fn();
        const {
            result: {
                current: { fields, setFieldValue, submit }
            }
        } = renderHook(() =>
            useForm(SampleValues, handleSubmit, { validateInitialValues: false, onValidate: handleValidateForm })
        );
        let wasSubmitted = false;
        await actAsync(async () => {
            setFieldValue(fields.firstName, "");
            wasSubmitted = await submit();
        });
        expect(wasSubmitted).toBe(false);
        expect(handleSubmit.mock.calls).toHaveLength(0);
    });

    test("Resets changed values", async () => {
        const handleValidate = jest.fn(v => (v.firstName !== SampleValues.firstName ? ["Field error"] : []));
        const { result, waitForNextUpdate } = renderHook(() =>
            useForm(SampleValues, noop, { onValidate: handleValidate })
        );
        // Initial values should be validated
        expect(result.current.isValid).toBe(false);
        await waitForNextUpdate();
        expect(handleValidate.mock.calls).toHaveLength(1);
        expect(result.current.isValid).toBe(true);
        // Perform some changes
        const { setFieldValue } = result.current;
        let fields = result.current.fields;
        await actAsync(async () => {
            await setFieldValue(fields.firstName, ChangedValues.firstName);
            await setFieldValue(fields.invoiceAddress.city, ChangedValues.invoiceAddress.city);
        });
        // Check if the changes were processed
        expect(fields.firstName.value).toBe(ChangedValues.firstName);
        expect(fields.invoiceAddress.city.value).toBe(ChangedValues.invoiceAddress.city);
        expect(result.current.isValid).toBe(false);
        // Undo the changes by calling reset()
        act(() => result.current.reset());
        // Check if the changes were undone
        fields = result.current.fields;
        expect(fields.firstName.value).toBe(SampleValues.firstName);
        expect(fields.invoiceAddress.city.value).toBe(SampleValues.invoiceAddress.city);
        expect(result.current.isValid).toBe(false);
        await waitForNextUpdate();
        // Initial values should have been validated again
        expect(result.current.isValid).toBe(true);
    });

    test("Handles dynamic forms", async () => {
        const handleSubmit = jest.fn();
        const handleValidate = jest.fn((values: SampleType) => {
            // Check friends
            for (const friend of values.friends) {
                if (!friend.firstName || !friend.lastName) {
                    return ["Invalid friend"];
                }
            }
            return [];
        });
        const { result, waitForNextUpdate } = renderHook(() =>
            useForm(SampleValues, handleSubmit, { onValidate: handleValidate })
        );
        // Initial values should be validated
        expect(result.current.isValid).toBe(false);
        await waitForNextUpdate();
        expect(handleValidate.mock.calls).toHaveLength(1);
        expect(result.current.isValid).toBe(true);
        // Extend friends' array
        const { updateFields } = result.current;
        act(() => {
            updateFields(newFields => {
                const newFriend = createFields({
                    firstName: "",
                    lastName: ""
                });
                newFields.friends.push(newFriend);
            });
        });
        // New fields should be validated
        await waitForNextUpdate();
        expect(handleValidate.mock.calls).toHaveLength(2);
        expect(result.current.isValid).toBe(false);
        // Perform some changes
        const { setFieldValue } = result.current;
        const fields = result.current.fields;
        const newFriendFirstName = "Laura";
        const newFriendLastName = "Monroe";
        await actAsync(async () => {
            await setFieldValue(fields.friends[2].firstName, newFriendFirstName);
            await setFieldValue(fields.friends[2].lastName, newFriendLastName);
        });
        // Check if the changes were processed
        expect(fields.friends[2].firstName.value).toBe(newFriendFirstName);
        expect(fields.friends[2].lastName.value).toBe(newFriendLastName);
        expect(result.current.isValid).toBe(true);
        // Submit the current values
        const { submit } = result.current;
        await actAsync(async () => {
            await submit();
        });
        expect(handleSubmit.mock.calls).toHaveLength(1);
        const values = handleSubmit.mock.calls[0][0] as SampleType;
        expect(values.friends).toHaveLength(3);
        expect(values.friends[2].firstName).toBe(newFriendFirstName);
        expect(values.friends[2].lastName).toBe(newFriendLastName);
    });
});

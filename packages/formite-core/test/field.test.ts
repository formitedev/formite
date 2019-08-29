import { act, renderHook } from "@testing-library/react-hooks";

import { SampleValues } from "formite-sample";

import { actAsync } from "./asyncHelper";

import { useForm, useField } from "../src"; // "formite-core"

const noop = () => {};

describe("Formite Field", () => {
    test("setFieldValue() sets value and validates form", async () => {
        const handleValidateForm = jest.fn().mockReturnValue(["Form error"]);
        const { result, waitForNextUpdate } = renderHook(() =>
            useForm(SampleValues, noop, { validateInitialValues: false, onValidate: handleValidateForm })
        );
        const {
            current: { fields, setFieldValue }
        } = result;
        act(() => {
            setFieldValue(fields.firstName, "Jack");
        });
        await waitForNextUpdate();
        expect(fields.firstName.value).toBe("Jack");
        expect(handleValidateForm.mock.calls).toHaveLength(1);
        expect(result.current.formErrors).toEqual(["Form error"]);
        expect(result.current.isValid).toBe(false);
    });

    test("setFieldTouched() sets touched", () => {
        const {
            result: {
                current: { fields, setFieldTouched }
            }
        } = renderHook(() => useForm(SampleValues, noop));
        expect(fields.firstName.touched).toBe(false);
        act(() => {
            setFieldTouched(fields.firstName, true);
        });
        expect(fields.firstName.touched).toBe(true);
    });

    test("handleChange() sets value and validates field", async () => {
        const handleValidateField = jest.fn().mockReturnValue("Field error");
        const { result, waitForNextUpdate } = renderHook(() => {
            const form = useForm(SampleValues, noop, { validateInitialValues: false });
            const firstNameField = useField(form.fields.firstName, handleValidateField);
            return { form, firstNameField };
        });
        act(() => {
            result.current.firstNameField.handleChange("Jack");
        });
        await waitForNextUpdate();
        expect(result.current.form.fields.firstName.value).toBe("Jack");
        expect(handleValidateField.mock.calls).toHaveLength(1);
        expect(result.current.form.fields.firstName.error).toBe("Field error");
        expect(result.current.form.isValid).toBe(false);
    });

    test("handleChange() sets value and validates form and field", async () => {
        const handleValidateForm = jest.fn().mockReturnValue(["Form error"]);
        const handleValidateField = jest.fn().mockReturnValue("Field error");
        const { result, waitForNextUpdate } = renderHook(() => {
            const form = useForm(SampleValues, noop, { validateInitialValues: false, onValidate: handleValidateForm });
            const firstNameField = useField(form.fields.firstName, handleValidateField);
            return { form, firstNameField };
        });
        act(() => {
            result.current.firstNameField.handleChange("Jack");
        });
        await waitForNextUpdate();
        expect(result.current.form.fields.firstName.value).toBe("Jack");
        expect(handleValidateForm.mock.calls).toHaveLength(1);
        expect(handleValidateField.mock.calls).toHaveLength(1);
        expect(result.current.form.formErrors).toEqual(["Form error"]);
        expect(result.current.form.fields.firstName.error).toBe("Field error");
        expect(result.current.form.isValid).toBe(false);
    });

    test("handleChange() sets multiple values and validates field", async () => {
        const handleValidateField = jest.fn().mockReturnValue("Field error");
        const { result } = renderHook(() => {
            const form = useForm(SampleValues, noop, { validateInitialValues: false });
            const firstNameField = useField(form.fields.firstName, handleValidateField);
            const lastNameField = useField(form.fields.lastName);
            return { form, firstNameField, lastNameField };
        });
        await actAsync(async () => {
            // This causes a validation error
            await result.current.firstNameField.handleChange("Jack");
            // This does not cause a validation error but the form should still be invalid
            await result.current.lastNameField.handleChange("Williams");
        });
        const { fields } = result.current.form;
        expect(fields.firstName.value).toBe("Jack");
        expect(fields.lastName.value).toBe("Williams");
        expect(handleValidateField.mock.calls).toHaveLength(1);
        expect(fields.firstName.error).toBe("Field error");
        expect(result.current.form.isValid).toBe(false);
    });

    test("handleBlur() sets touched", () => {
        const { result } = renderHook(() => {
            const form = useForm(SampleValues, noop);
            const firstNameField = useField(form.fields.firstName);
            return { form, firstNameField };
        });
        expect(result.current.form.fields.firstName.touched).toBe(false);
        act(() => {
            result.current.firstNameField.handleBlur();
        });
        expect(result.current.form.fields.firstName.touched).toBe(true);
    });
});

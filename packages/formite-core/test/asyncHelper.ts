import { act } from "@testing-library/react-hooks";

export async function actAsync(fn: () => Promise<void>): Promise<void> {
    // Workaround: React's act() before 16.9 is not able handle async promises.
    // Use a hack to enable async act() on React 16.8
    let p: Promise<void>;
    act(() => {
        p = fn();
    });
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    await p!;
}

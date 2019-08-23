import React from "react";

import { RenderFunction } from "@storybook/react";

export function formStyle(story: RenderFunction) {
    return <div style={{ margin: 16 }}>{story()}</div>;
}

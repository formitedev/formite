import { addParameters, configure } from "@storybook/react";

var coreRegex = /\/formite-core\//;

// Workaround to sort sections
// See: https://github.com/storybookjs/storybook/issues/3730
function sortCoreFirst(a, b) {
  if (coreRegex.test(a) && !coreRegex.test(b)) {
    return -1;
  }
  if (coreRegex.test(b) && !coreRegex.test(a)) {
    return 1;
  }
  return a.localeCompare(b);
}

// See: https://github.com/storybookjs/storybook/issues/5827
addParameters({
  options: {
    // For Storybook 5.2
    // storySort: (a, b) => a.name.localeCompare(b.name)
  }
});

function loadStories() {
  const req = require.context("../packages", true, /\/stories\/.*\.tsx$/);
  req.keys().sort(sortCoreFirst).forEach((filename) => req(filename));
}

configure(loadStories, module);

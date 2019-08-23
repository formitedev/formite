// See: https://github.com/testing-library/react-testing-library/issues/281#issuecomment-507584839

// FIXME Remove when we upgrade to React >= 16.9
const originalConsoleError = console.error;
console.error = (...args) => {
    if (/Warning.*not wrapped in act/.test(args[0])) {
        return;
    }
    originalConsoleError(...args);
};

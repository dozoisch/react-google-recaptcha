import "es5-shim";
const testsContext = require.context(".", true, /-spec$/);
testsContext.keys().forEach(testsContext);

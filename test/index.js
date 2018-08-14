import "es5-shim";
import "es6-shim";
const testsContext = require.context(".", true, /-spec$/);
testsContext.keys().forEach(testsContext);

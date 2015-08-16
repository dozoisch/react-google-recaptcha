/* eslint no-process-exit: 0, no-console: 0 */
import "colors";
import lib from "./lib/build";

export default function Build(noExitOnFailure) {
  let result = Promise.all([
    lib(),
  ]);

  if (!noExitOnFailure) {
    result = result
      .catch(err => {
        console.error(err.toString().red);
        if (err.stack) {
          console.error(err.stack.red);
        }
        process.exit(1);
      });
  }

  return result;
}

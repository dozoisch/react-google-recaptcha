/* eslint no-process-exit: 0 */
import "colors";
import path from "path";
import lib from "./lib/build";
import { exec, spawn } from "child-process-promise";

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

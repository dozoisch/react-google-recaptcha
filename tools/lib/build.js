/* eslint no-console: 0 */
import "colors";
import path from "path";
import { exec } from "child-process-promise";

const repoRoot = path.resolve(__dirname, "../../");
const lib = path.join(repoRoot, "lib");
const src = path.join(repoRoot, "src");

export default function BuildCommonJs() {
  console.log("Building: ".cyan + "npm module".green);

  return exec(`rm -rf ${lib}`)
    .then(() => exec(`./node_modules/.bin/babel --optional es7.objectRestSpread,runtime ${src} --out-dir ${lib}`))
    .then(() => console.log("Built: ".cyan + "npm module".green));
}

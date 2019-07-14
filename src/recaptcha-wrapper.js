import ReCAPTCHA, { getOptions } from "./recaptcha";
import makeAsyncScriptLoader from "react-async-script";

const callbackName = "onloadcallback";
const globalName = "grecaptcha";

function getURL() {
  const dynamicOptions = getOptions();
  const hostname = dynamicOptions.useRecaptchaNet ? "recaptcha.net" : "www.google.com";
  return `https://${hostname}/recaptcha/api.js?onload=${callbackName}&render=explicit`;
}

export default makeAsyncScriptLoader(getURL, {
  callbackName,
  globalName,
})(ReCAPTCHA);

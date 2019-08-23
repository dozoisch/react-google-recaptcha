import ReCAPTCHA from "./recaptcha";
import makeAsyncScriptLoader from "react-async-script";

const callbackName = "onloadcallback";
const globalName = "grecaptcha";

function getOptions() {
  return (typeof window !== "undefined" && window.recaptchaOptions) || {};
}

function getURL() {
  const dynamicOptions = getOptions();
  const hostname = dynamicOptions.useRecaptchaNet ? "recaptcha.net" : "www.google.com";
  return `https://${hostname}/recaptcha/api.js?onload=${callbackName}&render=explicit`;
}

export default makeAsyncScriptLoader(getURL, {
  callbackName,
  globalName,
})(ReCAPTCHA);

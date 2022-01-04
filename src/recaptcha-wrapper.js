import ReCAPTCHA from "./recaptcha";
import makeAsyncScriptLoader from "react-async-script";

const callbackName = "onloadcallback";
const globalName = "grecaptcha";

function getOptions() {
  return (typeof window !== "undefined" && window.recaptchaOptions) || {};
}

function getURL() {
  const dynamicOptions = getOptions();
  if (dynamicOptions.enterprise) {
    return `https://www.google.com/recaptcha/api.js?onload=${callbackName}&render=explicit`;
  }
  const hostname = dynamicOptions.useRecaptchaNet ? "recaptcha.net" : "www.google.com";
  return `https://${hostname}/recaptcha/api.js?onload=${callbackName}&render=explicit`;
}

function getGlobalName() {
  const dynamicOptions = getOptions();
  if (dynamicOptions.enterprise) {
    return "grecaptcha.enterprise";
  }
  return "grecaptcha";
}

export default makeAsyncScriptLoader(getURL, {
  callbackName,
  globalName: getGlobalName(),
  attributes: getOptions().nonce ? { nonce: getOptions().nonce } : {},
})(ReCAPTCHA);

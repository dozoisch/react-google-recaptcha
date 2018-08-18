import ReCAPTCHA from "./recaptcha";
import makeAsyncScriptLoader from "react-async-script";

function getOptions() {
  return (typeof window !== "undefined" && window.recaptchaOptions) || {};
}
function getURL() {
  const dynamicOptions = getOptions();
  const lang = dynamicOptions.lang ? `&hl=${dynamicOptions.lang}` : "";
  const hostname = dynamicOptions.useRecaptchaNet ? "recaptcha.net" : "www.google.com";
  return `https://${hostname}/recaptcha/api.js?onload=${callbackName}&render=explicit${lang}`;
}

const callbackName = "onloadcallback";
const globalName = "grecaptcha";
const initialOptions = getOptions();

export default makeAsyncScriptLoader(getURL, {
  callbackName,
  globalName,
  removeOnUnmount: initialOptions.removeOnUnmount || false,
})(ReCAPTCHA);

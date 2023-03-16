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
  if (self.trustedTypes && self.trustedTypes.createPolicy && dynamicOptions.trustedTypes) {
    const policy = self.trustedTypes.createPolicy('react-google-recaptcha', {
      createScriptURL: (_ignored) => `https://${hostname}/recaptcha/api.js?onload=${callbackName}&render=explicit&trustedtypes=true`
    });
    return policy.createScriptURL('_ignored');
  }
  return `https://${hostname}/recaptcha/api.js?onload=${callbackName}&render=explicit`;
}

export default makeAsyncScriptLoader(getURL, {
  callbackName,
  globalName,
  attributes: getOptions().nonce ? { nonce: getOptions().nonce } : {},
})(ReCAPTCHA);

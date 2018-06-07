import ReCAPTCHA from "./recaptcha";
import makeAsyncScriptLoader from "react-async-script";

const callbackName = "onloadcallback";
const options = (typeof window !== "undefined" && window.recaptchaOptions) || {};

const lang = options.lang ? `&hl=${options.lang}` : "";
const hostname = options.useRecaptchaNet ? "recaptcha.net" : "www.google.com";
const URL = `https://${hostname}/recaptcha/api.js?onload=${callbackName}&render=explicit${lang}`;
const globalName = "grecaptcha";

export default makeAsyncScriptLoader(ReCAPTCHA, URL, {
  callbackName,
  globalName,
  exposeFuncs: ["getValue", "getWidgetId", "reset", "execute"],
});

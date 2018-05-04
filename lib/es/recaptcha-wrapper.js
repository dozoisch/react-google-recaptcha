import ReCAPTCHA from "./recaptcha";
import makeAsyncScriptLoader from "react-async-script";

var callbackName = "onloadcallback";
var lang = typeof window !== "undefined" && window.recaptchaOptions && window.recaptchaOptions.lang ? "&hl=" + window.recaptchaOptions.lang : "";
var URL = "https://www.google.com/recaptcha/api.js?onload=" + callbackName + "&render=explicit" + lang;
var globalName = "grecaptcha";

export default makeAsyncScriptLoader(ReCAPTCHA, URL, {
  callbackName: callbackName,
  globalName: globalName,
  exposeFuncs: ["getValue", "getWidgetId", "reset", "execute"]
});
import ReCAPTCHA from "./recaptcha";
import makeAsyncScriptLoader from "react-async-script";

const callbackName = "onloadcallback";
const lang = typeof window !== "undefined" && (window.recaptchaOptions && window.recaptchaOptions.lang) ?
  `&hl=${window.recaptchaOptions.lang}` :
	"";
const URL = `https://www.google.com/recaptcha/api.js?onload=${callbackName}&render=explicit${lang}`;
const globalName = "grecaptcha";

export default makeAsyncScriptLoader(ReCAPTCHA, URL, {
  callbackName,
  globalName,
  exposeFuncs: ["getValue", "getWidgetId", "reset", "execute"],
});

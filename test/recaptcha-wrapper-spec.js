import React from "react";
import ReactTestUtils from "react-dom/test-utils";
import ReCAPTCHA from "../src/recaptcha-wrapper";

const VALUE = "some value";
const WIDGET_ID = "someWidgetId";

const grecaptchaMock = {
  render (node, options) {
    assert.ok(node, options);
    return WIDGET_ID;
  },

  getResponse (widgetId) {
    assert.equal(widgetId, WIDGET_ID);
    return VALUE;
  },
};

describe("ReCAPTCHAWrapper", () => {
  beforeEach(() => {
    window.grecaptcha = grecaptchaMock;
  });
  afterEach(() => {
    delete window.grecaptcha;
  });
  it("should be wrapped properly", () => {
    assert.equal(ReCAPTCHA.displayName, "AsyncScriptLoader(ReCAPTCHA)");
  });
  it("should proxy functions", () => {
    const ReCaptchaRef = React.createRef();
    ReactTestUtils.renderIntoDocument(
      <ReCAPTCHA sitekey="xxx" ref={ReCaptchaRef} />,
    );
    assert.equal(ReCaptchaRef.current.getValue(), VALUE);
  });
});

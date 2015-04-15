import React from "react";
import ReactTestUtils from "react/lib/ReactTestUtils";
import ReCAPTCHA from "../src/recaptcha-wrapper";

const VALUE = "some value";
const WIDGET_ID = "someWidgetId";

let grecaptchaMock = {
  render(node, options) {
    assert.ok(node, options);
    return WIDGET_ID;
  },

  getResponse(widgetId) {
    assert.equal(widgetId, WIDGET_ID);
    return VALUE;
  }
};

describe("ReCAPTCHAWrapper", () => {
  beforeEach(() => {
    window.grecaptcha = grecaptchaMock;
  });
  it("should proxy functions", () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <ReCAPTCHA sitekey="xxx"/>
    );
    assert.ok(instance);
    assert.equal(instance.getValue(), VALUE);
  });
  afterEach(() => {
    delete window.grecaptcha;
  });
});

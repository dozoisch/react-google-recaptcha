import React from "react";
import ReactTestUtils from "react/lib/ReactTestUtils";
import ReCAPTCHA from "../src/recaptcha";

describe("ReCAPTCHA", function () {
  it("Should output a alert with message", function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <ReCAPTCHA siteKey="xxx" />
    );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithTag(instance, "div"));
  });
});

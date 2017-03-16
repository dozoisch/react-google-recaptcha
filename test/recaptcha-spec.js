import React from "react";
import ReactDOM from "react-dom";
import ReactTestUtils from "react-addons-test-utils";
import ReCAPTCHA from "../src/recaptcha"; // eslint-disable-line no-unused-vars

describe("ReCAPTCHA", () => {
  it("Rendered Component should be a div", () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <ReCAPTCHA sitekey="xxx" />,
		);
    assert.equal(ReactDOM.findDOMNode(instance).nodeName, "DIV");
  });
  it("Rendered Component should contained passed props", () => {
    const props = {
      className: "TheClassName",
      id: "superdefinedId",
    };
    const instance = ReactTestUtils.renderIntoDocument(
      <ReCAPTCHA sitekey="xxx" {...props} />,
		);
    assert.equal(ReactDOM.findDOMNode(instance).id, props.id);
    assert.match(ReactDOM.findDOMNode(instance).className, new RegExp(props.className));
  });

  it("should call grecaptcha.render, when it is already loaded", (done) => {
    const grecaptchaMock = {
      render (node, options) {
        assert.isNotNull(node);
        assert.equal(options.sitekey, "xxx");
        done();
      },
    };
    const instance = ReactTestUtils.renderIntoDocument(
      <ReCAPTCHA sitekey="xxx" grecaptcha={grecaptchaMock} />,
		);
    assert.ok(instance);
  });
  it("reset, should call grecaptcha.reset with the widget id", (done) => {
    const grecaptchaMock = {
      render () {
        return "someWidgetId";
      },

      reset (widgetId) {
        assert.isNotNull(widgetId);
        done();
      },
    };
    const instance = ReactTestUtils.renderIntoDocument(
      <ReCAPTCHA sitekey="xxx" grecaptcha={grecaptchaMock} />,
		);
    instance.reset();
  });
  it("execute, should call grecaptcha.execute with the widget id", (done) => {
    const grecaptchaMock = {
      render () {
        return "someWidgetId";
      },

      execute (widgetId) {
        assert.isNotNull(widgetId);
        done();
      },
    };
    const instance = ReactTestUtils.renderIntoDocument(
      <ReCAPTCHA sitekey="xxx" size="invisible" grecaptcha={grecaptchaMock} />,
		);
    instance.execute();
  });
  describe("Expired", () => {
    it("should call onChange with null when response is expired");
    it("should call onExpired when response is expired");
  });
});

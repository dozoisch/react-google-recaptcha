import React from "react";
import ReactDOM from "react-dom";
import ReactTestUtils from "react/lib/ReactTestUtils";
import ReCAPTCHA from "../src/recaptcha";

describe("ReCAPTCHA", () => {
  it("Rendered Component should be a div", () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <ReCAPTCHA sitekey="xxx" />
    );
    assert.equal(ReactDOM.findDOMNode(instance).nodeName, "DIV");
  });
  it("Rendered Component should contained passed props", () => {
    let props = {
      className: "TheClassName",
      id: "superdefinedId",
    };
    let instance = ReactTestUtils.renderIntoDocument(
      <ReCAPTCHA sitekey="xxx" {...props} />
    );
    assert.equal(ReactDOM.findDOMNode(instance).id, props.id);
    assert.match(ReactDOM.findDOMNode(instance).className, new RegExp(props.className));
  });

  it("should call grecaptcha.render, when it is already loaded", (done) => {
    let grecaptchaMock = {
      render(node, options) {
        assert.isNotNull(node);
        assert.equal(options.sitekey, "xxx");
        done();
      },
    };
    let instance = ReactTestUtils.renderIntoDocument(
      <ReCAPTCHA sitekey="xxx" grecaptcha={grecaptchaMock} />
    );
    assert.ok(instance);
  });
  it("reset, should call grecaptcha.reset with the widget id", (done) => {
    let grecaptchaMock = {
      render() {
        return "someWidgetId";
      },

      reset(widgetId) {
        assert.isNotNull(widgetId);
        done();
      },
    };
    let instance = ReactTestUtils.renderIntoDocument(
      <ReCAPTCHA sitekey="xxx" grecaptcha={grecaptchaMock} />
    );
    instance.reset();
  });
  describe("Expired", () => {
    it("should call onChange with null when response is expired");
    it("should call onExpired when response is expired");
  });
});

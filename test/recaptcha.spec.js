import React from "react";
import ReactDOM from "react-dom";
import ReactTestUtils from "react-dom/test-utils";
import ReCAPTCHA from "../src/recaptcha"; // eslint-disable-line no-unused-vars

describe("ReCAPTCHA", () => {
  it("Rendered Component should be a div", () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <ReCAPTCHA sitekey="xxx" onChange={jest.fn()} />,
    );
    expect(ReactDOM.findDOMNode(instance).nodeName).toBe("DIV");
  });
  it("Rendered Component should contained passed props", () => {
    const props = {
      className: "TheClassName",
      id: "superdefinedId",
      onChange: jest.fn(),
    };
    const instance = ReactTestUtils.renderIntoDocument(<ReCAPTCHA sitekey="xxx" {...props} />);
    expect(ReactDOM.findDOMNode(instance).id).toBe(props.id);
    expect(ReactDOM.findDOMNode(instance).className).toBe(props.className);
  });

  it("should call grecaptcha.render, when it is already loaded", () => {
    return new Promise(resolve => {
      const grecaptchaMock = {
        render(node, options) {
          expect(node).toBeTruthy();
          expect(options.sitekey).toBe("xxx");
          resolve();
        },
      };
      const instance = ReactTestUtils.renderIntoDocument(
        <ReCAPTCHA sitekey="xxx" grecaptcha={grecaptchaMock} onChange={jest.fn()} />,
      );
      expect(instance).toBeTruthy();
    });
  });
  it("reset, should call grecaptcha.reset with the widget id", () => {
    return new Promise(resolve => {
      const WIDGET_ID = "someWidgetId";
      const grecaptchaMock = {
        render() {
          return WIDGET_ID;
        },
        reset(widgetId) {
          expect(widgetId).toBe(WIDGET_ID);
          resolve();
        },
      };
      const ReCaptchaRef = React.createRef();
      ReactTestUtils.renderIntoDocument(
        <ReCAPTCHA
          sitekey="xxx"
          grecaptcha={grecaptchaMock}
          ref={ReCaptchaRef}
          onChange={jest.fn()}
        />,
      );
      ReCaptchaRef.current.reset();
    });
  });
  it("execute, should call grecaptcha.execute with the widget id", () => {
    return new Promise(resolve => {
      const WIDGET_ID = "someWidgetId";
      const grecaptchaMock = {
        render() {
          return WIDGET_ID;
        },
        execute(widgetId) {
          expect(widgetId).toBe(WIDGET_ID);
          resolve();
        },
      };
      // wrapping component example that applies a ref to ReCAPTCHA
      class WrappingComponent extends React.Component {
        constructor(props) {
          super(props);
          this._internalRef = React.createRef();
        }
        render() {
          return (
            <div>
              <ReCAPTCHA
                sitekey="xxx"
                size="invisible"
                grecaptcha={grecaptchaMock}
                onChange={jest.fn()}
                ref={this._internalRef}
              />
            </div>
          );
        }
      }
      const instance = ReactTestUtils.renderIntoDocument(React.createElement(WrappingComponent));
      instance._internalRef.current.execute();
    });
  });
  describe.skip("Expired", () => {
    it("should call onChange with null when response is expired");
    it("should call onExpired when response is expired");
  });
});

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
    const WIDGET_ID = "someWidgetId";
    const grecaptchaMock = {
      render() {
        return WIDGET_ID;
      },
      reset: jest.fn(),
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
    expect(grecaptchaMock.reset).toBeCalledWith(WIDGET_ID);
  });
  it("execute, should call grecaptcha.execute with the widget id", () => {
    const WIDGET_ID = "someWidgetId";
    const grecaptchaMock = {
      render() {
        return WIDGET_ID;
      },
      execute: jest.fn(),
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
    expect(grecaptchaMock.execute).toBeCalledWith(WIDGET_ID);
  });
  it("executeAsync, should call grecaptcha.execute with the widget id", () => {
    const WIDGET_ID = "someWidgetId";
    const grecaptchaMock = {
      render() {
        return WIDGET_ID;
      },
      execute: jest.fn(),
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
    expect(grecaptchaMock.execute).toBeCalledWith(WIDGET_ID);
  });
  it("executeAsync, should return a promise", () => {
    const WIDGET_ID = "someWidgetId";
    const grecaptchaMock = {
      render() {
        return WIDGET_ID;
      },
      execute: jest.fn(),
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
    let result = instance._internalRef.current.executeAsync();
    expect(result).toBeInstanceOf(Promise);
  });
  describe("Expired", () => {
    it("should call onChange with null when response is expired", () => {
      const WIDGET_ID = "someWidgetId";
      const onChange = jest.fn();
      const grecaptchaMock = {
        render() {
          return WIDGET_ID;
        },
      };
      const ReCaptchaRef = React.createRef();
      ReactTestUtils.renderIntoDocument(
        <ReCAPTCHA
          sitekey="xxx"
          grecaptcha={grecaptchaMock}
          ref={ReCaptchaRef}
          onChange={onChange}
        />,
      );
      ReCaptchaRef.current.handleExpired();
      expect(onChange).toBeCalledWith(null);
    });
    it("should call onExpired when response is expired", () => {
      const WIDGET_ID = "someWidgetId";
      const onChange = jest.fn();
      const onExpired = jest.fn();
      const grecaptchaMock = {
        render() {
          return WIDGET_ID;
        },
      };
      const ReCaptchaRef = React.createRef();
      ReactTestUtils.renderIntoDocument(
        <ReCAPTCHA
          sitekey="xxx"
          grecaptcha={grecaptchaMock}
          ref={ReCaptchaRef}
          onChange={onChange}
          onExpired={onExpired}
        />,
      );
      ReCaptchaRef.current.handleExpired();
      expect(onChange).not.toHaveBeenCalled();
      expect(onExpired).toHaveBeenCalled();
    });
  });
  describe("Errored", () => {
    it("should call onErrored when grecaptcha errored", () => {
      const WIDGET_ID = "someWidgetId";
      const onErrored = jest.fn();
      const grecaptchaMock = {
        render() {
          return WIDGET_ID;
        },
      };
      const ReCaptchaRef = React.createRef();
      ReactTestUtils.renderIntoDocument(
        <ReCAPTCHA
          sitekey="xxx"
          grecaptcha={grecaptchaMock}
          ref={ReCaptchaRef}
          onChange={jest.fn()}
          onErrored={onErrored}
        />,
      );
      ReCaptchaRef.current.handleErrored();
      expect(onErrored).toHaveBeenCalled();
    });
  });
});

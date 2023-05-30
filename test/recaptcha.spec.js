import React from "react";
import { render } from "@testing-library/react";

import ReCAPTCHA from "../src/recaptcha"; // eslint-disable-line no-unused-vars

describe("ReCAPTCHA", () => {
  it("Rendered Component should be a div", () => {
    const { container } = render(<ReCAPTCHA sitekey="xxx" onChange={jest.fn()} />);
    expect(container.firstChild.nodeName).toBe("DIV");
  });
  it("Rendered Component should contained passed props", () => {
    const props = {
      className: "TheClassName",
      id: "superdefinedId",
      onChange: jest.fn(),
    };
    const { container } = render(<ReCAPTCHA sitekey="xxx" {...props} />);
    expect(container.firstChild.id).toBe(props.id);
    expect(container.firstChild.className).toBe(props.className);
  });

  it("should call grecaptcha.render, when it is already loaded", () => {
    return new Promise((resolve) => {
      const grecaptchaMock = {
        render(node, options) {
          expect(node).toBeTruthy();
          expect(options.sitekey).toBe("xxx");
          resolve();
        },
      };
      render(<ReCAPTCHA sitekey="xxx" grecaptcha={grecaptchaMock} onChange={jest.fn()} />);
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
    render(
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
    const wrappingRef = React.createRef();
    render(<WrappingComponent ref={wrappingRef} />);
    wrappingRef.current._internalRef.current.execute();
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
    const wrappingRef = React.createRef();
    render(<WrappingComponent ref={wrappingRef} />);
    wrappingRef.current._internalRef.current.executeAsync();
    expect(grecaptchaMock.execute).toBeCalledWith(WIDGET_ID);
  });
  it("executeAsync, should return a promise that resolves with the token", () => {
    const WIDGET_ID = "someWidgetId";
    const TOKEN = "someToken";
    const grecaptchaMock = (() => {
      let _callback;
      return {
        render(_, { callback }) {
          _callback = callback;
          return WIDGET_ID;
        },
        execute() {
          _callback(TOKEN);
        },
      };
    })();
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

    const wrappingRef = React.createRef();
    render(<WrappingComponent ref={wrappingRef} />);
    const executeAsyncDirectValue = wrappingRef.current._internalRef.current.executeAsync();
    expect(executeAsyncDirectValue).toBeInstanceOf(Promise);
    return executeAsyncDirectValue.then((executeAsyncResolveValue) => {
      expect(executeAsyncResolveValue).toBe(TOKEN);
    });
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
      render(
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
      render(
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
      render(
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

import * as React from "react";
import PropTypes from "prop-types";

export default class ReCAPTCHA extends React.Component {
  constructor() {
    super();
    this.handleExpired = this.handleExpired.bind(this);
    this.handleErrored = this.handleErrored.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleRecaptchaRef = this.handleRecaptchaRef.bind(this);
  }

  getCaptchaFunction(fnName) {
    if (this.props.grecaptcha) {
      if (this.props.grecaptcha.enterprise) {
        return this.props.grecaptcha.enterprise[fnName];
      }
      return this.props.grecaptcha[fnName];
    }
    return null;
  }

  getValue() {
    const getResponse = this.getCaptchaFunction("getResponse");
    if (getResponse && this._widgetId !== undefined) {
      return getResponse(this._widgetId);
    }
    return null;
  }

  getWidgetId() {
    if (this.props.grecaptcha && this._widgetId !== undefined) {
      return this._widgetId;
    }
    return null;
  }

  execute() {
    const execute = this.getCaptchaFunction("execute");
    if (execute && this._widgetId !== undefined) {
      return execute(this._widgetId);
    } else {
      this._executeRequested = true;
    }
  }

  executeAsync() {
    return new Promise((resolve, reject) => {
      this.executionResolve = resolve;
      this.executionReject = reject;
      this.execute();
    });
  }

  reset() {
    const resetter = this.getCaptchaFunction("reset");
    if (resetter && this._widgetId !== undefined) {
      resetter(this._widgetId);
    }
  }

  forceReset() {
    const resetter = this.getCaptchaFunction("reset");
    if (resetter) {
      resetter();
    }
  }

  handleExpired() {
    if (this.props.onExpired) {
      this.props.onExpired();
    } else {
      this.handleChange(null);
    }
  }

  handleErrored() {
    if (this.props.onErrored) {
      this.props.onErrored();
    }
    if (this.executionReject) {
      this.executionReject();
      delete this.executionResolve;
      delete this.executionReject;
    }
  }

  handleChange(token) {
    if (this.props.onChange) {
      this.props.onChange(token);
    }
    if (this.executionResolve) {
      this.executionResolve(token);
      delete this.executionReject;
      delete this.executionResolve;
    }
  }

  explicitRender() {
    const render = this.getCaptchaFunction("render");
    if (render && this._widgetId === undefined) {
      const wrapper = document.createElement("div");
      this._widgetId = render(wrapper, {
        sitekey: this.props.sitekey,
        callback: this.handleChange,
        theme: this.props.theme,
        type: this.props.type,
        tabindex: this.props.tabindex,
        "expired-callback": this.handleExpired,
        "error-callback": this.handleErrored,
        size: this.props.size,
        stoken: this.props.stoken,
        hl: this.props.hl,
        badge: this.props.badge,
        isolated: this.props.isolated,
      });
      this.captcha.appendChild(wrapper);
    }
    if (this._executeRequested && this.props.grecaptcha && this._widgetId !== undefined) {
      this._executeRequested = false;
      this.execute();
    }
  }

  componentDidMount() {
    this.explicitRender();
  }

  componentDidUpdate() {
    this.explicitRender();
  }

  handleRecaptchaRef(elem) {
    this.captcha = elem;
  }

  render() {
    // consume properties owned by the reCATPCHA, pass the rest to the div so the user can style it.
    /* eslint-disable no-unused-vars */
    const {
      sitekey,
      onChange,
      theme,
      type,
      tabindex,
      onExpired,
      onErrored,
      size,
      stoken,
      grecaptcha,
      badge,
      hl,
      isolated,
      ...childProps
    } = this.props;
    /* eslint-enable no-unused-vars */
    return <div {...childProps} ref={this.handleRecaptchaRef} />;
  }
}

ReCAPTCHA.displayName = "ReCAPTCHA";
ReCAPTCHA.propTypes = {
  sitekey: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  grecaptcha: PropTypes.object,
  theme: PropTypes.oneOf(["dark", "light"]),
  type: PropTypes.oneOf(["image", "audio"]),
  tabindex: PropTypes.number,
  onExpired: PropTypes.func,
  onErrored: PropTypes.func,
  size: PropTypes.oneOf(["compact", "normal", "invisible"]),
  stoken: PropTypes.string,
  hl: PropTypes.string,
  badge: PropTypes.oneOf(["bottomright", "bottomleft", "inline"]),
  isolated: PropTypes.bool,
};
ReCAPTCHA.defaultProps = {
  onChange: () => {},
  theme: "light",
  type: "image",
  tabindex: 0,
  size: "normal",
  badge: "bottomright",
};

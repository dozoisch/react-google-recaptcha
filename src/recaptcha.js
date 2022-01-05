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

  getValue() {
    let getResponse = this.props.grecaptcha && this.props.grecaptcha.getResponse;
    if (this.props.grecaptcha.enterprise) {
      getResponse = this.props.grecaptcha.enterprise.getResponse();
    }
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
    const { grecaptcha } = this.props;
    let executer = grecaptcha && grecaptcha.execute;
    if (grecaptcha && grecaptcha.enterprise && grecaptcha.enterprise.execute) {
      executer = grecaptcha.enterprise.execute;
    }
    if (executer && this._widgetId !== undefined) {
      return executer(this._widgetId);
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
    let resetter = this.props.grecaptcha.reset;
    if (this.props.grecaptcha.enterprise.reset) {
      resetter = this.props.grecaptcha.enterprise.reset;
    }
    if (this.props.grecaptcha && this._widgetId !== undefined) {
      resetter(this._widgetId);
    }
  }

  forceReset() {
    if (this.props.grecaptcha) {
      this.props.grecaptcha.reset();
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
    let render = this.props.grecaptcha && this.props.grecaptcha.render;
    if (
      this.props.grecaptcha &&
      this.props.grecaptcha.enterprise &&
      this.props.grecaptcha.enterprise.render
    ) {
      render = this.props.grecaptcha.enterprise.render;
    }
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

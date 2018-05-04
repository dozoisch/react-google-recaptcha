import _extends from "babel-runtime/helpers/extends";
import _objectWithoutProperties from "babel-runtime/helpers/objectWithoutProperties";
import _classCallCheck from "babel-runtime/helpers/classCallCheck";
import _possibleConstructorReturn from "babel-runtime/helpers/possibleConstructorReturn";
import _inherits from "babel-runtime/helpers/inherits";
import React from "react";
import PropTypes from "prop-types";

var ReCAPTCHA = function (_React$Component) {
  _inherits(ReCAPTCHA, _React$Component);

  function ReCAPTCHA() {
    _classCallCheck(this, ReCAPTCHA);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this));

    _this.state = {};
    _this.handleExpired = _this.handleExpired.bind(_this);
    _this.handleRecaptchaRef = _this.handleRecaptchaRef.bind(_this);
    return _this;
  }

  ReCAPTCHA.prototype.getValue = function getValue() {
    if (this.props.grecaptcha && this.state.widgetId !== undefined) {
      return this.props.grecaptcha.getResponse(this.state.widgetId);
    }
    return null;
  };

  ReCAPTCHA.prototype.getWidgetId = function getWidgetId() {
    if (this.props.grecaptcha && this.state.widgetId !== undefined) {
      return this.state.widgetId;
    }
    return null;
  };

  ReCAPTCHA.prototype.execute = function execute() {
    var grecaptcha = this.props.grecaptcha;
    var widgetId = this.state.widgetId;


    if (grecaptcha && widgetId !== undefined) {
      return grecaptcha.execute(widgetId);
    } else {
      this._executeRequested = true;
    }
  };

  ReCAPTCHA.prototype.reset = function reset() {
    if (this.props.grecaptcha && this.state.widgetId !== undefined) {
      this.props.grecaptcha.reset(this.state.widgetId);
    }
  };

  ReCAPTCHA.prototype.handleExpired = function handleExpired() {
    if (this.props.onExpired) {
      this.props.onExpired();
    } else if (this.props.onChange) {
      this.props.onChange(null);
    }
  };

  ReCAPTCHA.prototype.explicitRender = function explicitRender(cb) {
    if (this.props.grecaptcha && this.props.grecaptcha.render && this.state.widgetId === undefined) {
      var wrapper = document.createElement("div");
      var id = this.props.grecaptcha.render(wrapper, {
        sitekey: this.props.sitekey,
        callback: this.props.onChange,
        theme: this.props.theme,
        type: this.props.type,
        tabindex: this.props.tabindex,
        "expired-callback": this.handleExpired,
        size: this.props.size,
        stoken: this.props.stoken,
        badge: this.props.badge
      });
      this.captcha.appendChild(wrapper);

      this.setState({
        widgetId: id
      }, cb);
    }
    if (this._executeRequested && this.props.grecaptcha && this.state.widgetId !== undefined) {
      this._executeRequested = false;
      this.execute();
    }
  };

  ReCAPTCHA.prototype.componentDidMount = function componentDidMount() {
    this.explicitRender();
  };

  ReCAPTCHA.prototype.componentDidUpdate = function componentDidUpdate() {
    this.explicitRender();
  };

  ReCAPTCHA.prototype.componentWillUnmount = function componentWillUnmount() {
    if (this.state.widgetId !== undefined) {
      while (this.captcha.firstChild) {
        this.captcha.removeChild(this.captcha.firstChild);
      }
      this.reset();
    }
  };

  ReCAPTCHA.prototype.handleRecaptchaRef = function handleRecaptchaRef(elem) {
    this.captcha = elem;
  };

  ReCAPTCHA.prototype.render = function render() {
    // consume properties owned by the reCATPCHA, pass the rest to the div so the user can style it.
    /* eslint-disable no-unused-vars */
    var _props = this.props,
        sitekey = _props.sitekey,
        onChange = _props.onChange,
        theme = _props.theme,
        type = _props.type,
        tabindex = _props.tabindex,
        onExpired = _props.onExpired,
        size = _props.size,
        stoken = _props.stoken,
        grecaptcha = _props.grecaptcha,
        badge = _props.badge,
        childProps = _objectWithoutProperties(_props, ["sitekey", "onChange", "theme", "type", "tabindex", "onExpired", "size", "stoken", "grecaptcha", "badge"]);
    /* eslint-enable no-unused-vars */


    return React.createElement("div", _extends({}, childProps, { ref: this.handleRecaptchaRef }));
  };

  return ReCAPTCHA;
}(React.Component);

export default ReCAPTCHA;


ReCAPTCHA.displayName = "ReCAPTCHA";
ReCAPTCHA.propTypes = {
  sitekey: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  grecaptcha: PropTypes.object,
  theme: PropTypes.oneOf(["dark", "light"]),
  type: PropTypes.oneOf(["image", "audio"]),
  tabindex: PropTypes.number,
  onExpired: PropTypes.func,
  size: PropTypes.oneOf(["compact", "normal", "invisible"]),
  stoken: PropTypes.string,
  badge: PropTypes.oneOf(["bottomright", "bottomleft", "inline"])
};
ReCAPTCHA.defaultProps = {
  theme: "light",
  type: "image",
  tabindex: 0,
  size: "normal",
  badge: "bottomright"
};
"use strict";

exports.__esModule = true;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ReCAPTCHA = function (_React$Component) {
  (0, _inherits3.default)(ReCAPTCHA, _React$Component);

  function ReCAPTCHA() {
    (0, _classCallCheck3.default)(this, ReCAPTCHA);

    var _this = (0, _possibleConstructorReturn3.default)(this, _React$Component.call(this));

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
        childProps = (0, _objectWithoutProperties3.default)(_props, ["sitekey", "onChange", "theme", "type", "tabindex", "onExpired", "size", "stoken", "grecaptcha", "badge"]);
    /* eslint-enable no-unused-vars */

    return _react2.default.createElement("div", (0, _extends3.default)({}, childProps, { ref: this.handleRecaptchaRef }));
  };

  return ReCAPTCHA;
}(_react2.default.Component);

exports.default = ReCAPTCHA;


ReCAPTCHA.displayName = "ReCAPTCHA";
ReCAPTCHA.propTypes = {
  sitekey: _propTypes2.default.string.isRequired,
  onChange: _propTypes2.default.func.isRequired,
  grecaptcha: _propTypes2.default.object,
  theme: _propTypes2.default.oneOf(["dark", "light"]),
  type: _propTypes2.default.oneOf(["image", "audio"]),
  tabindex: _propTypes2.default.number,
  onExpired: _propTypes2.default.func,
  size: _propTypes2.default.oneOf(["compact", "normal", "invisible"]),
  stoken: _propTypes2.default.string,
  badge: _propTypes2.default.oneOf(["bottomright", "bottomleft", "inline"])
};
ReCAPTCHA.defaultProps = {
  theme: "light",
  type: "image",
  tabindex: 0,
  size: "normal",
  badge: "bottomright"
};
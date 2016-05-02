"use strict";

var _objectWithoutProperties = require("babel-runtime/helpers/object-without-properties")["default"];

var _extends = require("babel-runtime/helpers/extends")["default"];

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var ReCAPTCHA = _react2["default"].createClass({
  displayName: "reCAPTCHA",
  propTypes: {
    sitekey: _react.PropTypes.string.isRequired,
    onChange: _react.PropTypes.func.isRequired,
    grecaptcha: _react.PropTypes.object,
    theme: _react.PropTypes.oneOf(["dark", "light"]),
    type: _react.PropTypes.oneOf(["image", "audio"]),
    tabindex: _react.PropTypes.number,
    onExpired: _react.PropTypes.func,
    size: _react.PropTypes.oneOf(["compact", "normal"]),
    stoken: _react.PropTypes.string
  },

  getInitialState: function getInitialState() {
    return {};
  },

  getDefaultProps: function getDefaultProps() {
    return {
      theme: "light",
      type: "image",
      tabindex: 0,
      size: "normal"
    };
  },

  getValue: function getValue() {
    if (this.props.grecaptcha && this.state.widgetId !== undefined) {
      return this.props.grecaptcha.getResponse(this.state.widgetId);
    }
    return null;
  },

  reset: function reset() {
    if (this.props.grecaptcha && this.state.widgetId !== undefined) {
      this.props.grecaptcha.reset(this.state.widgetId);
    }
  },

  handleExpired: function handleExpired() {
    if (this.props.onExpired) {
      this.props.onExpired();
    } else if (this.props.onChange) {
      this.props.onChange(null);
    }
  },

  explicitRender: function explicitRender(cb) {
    if (this.props.grecaptcha && this.state.widgetId === undefined) {
      var id = this.props.grecaptcha.render(this.refs.captcha, {
        sitekey: this.props.sitekey,
        callback: this.props.onChange,
        theme: this.props.theme,
        type: this.props.type,
        tabindex: this.props.tabindex,
        "expired-callback": this.handleExpired,
        size: this.props.size,
        stoken: this.props.stoken
      });
      this.setState({
        widgetId: id
      }, cb);
    }
  },

  componentDidMount: function componentDidMount() {
    this.explicitRender();
  },

  componentDidUpdate: function componentDidUpdate() {
    this.explicitRender();
  },

  render: function render() {
    // consume properties owned by the reCATPCHA, pass the rest to the div so the user can style it.
    /* eslint-disable no-unused-vars */
    var _props = this.props;
    var sitekey = _props.sitekey;
    var onChange = _props.onChange;
    var theme = _props.theme;
    var type = _props.type;
    var tabindex = _props.tabindex;
    var onExpired = _props.onExpired;
    var size = _props.size;
    var stoken = _props.stoken;

    var childProps = _objectWithoutProperties(_props, ["sitekey", "onChange", "theme", "type", "tabindex", "onExpired", "size", "stoken"]);

    /* eslint-enable no-unused-vars */
    return _react2["default"].createElement("div", _extends({}, childProps, { ref: "captcha" }));
  }
});

exports["default"] = ReCAPTCHA;
module.exports = exports["default"];
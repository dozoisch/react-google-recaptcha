"use strict";
var React = require("react");
var PropTypes = React.PropTypes;

var ReCAPTCHA = React.createClass({
  displayName: "react-reCAPTCHA",
  propTypes: {
    sitekey: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onloadCallbackName: PropTypes.string.isRequired, // Name on the script tag onload query parameter
    theme: PropTypes.oneOf(["dark", "light"]),
    type: PropTypes.oneOf(["image", "audio"]),
    tabindex: PropTypes.number,
    onLoad: PropTypes.func,
    onExpired: PropTypes.func,
  },

  getDefaultState: function () {
    return {};
  },

  getDefaultProps: function () {
    return {
      theme: "light",
      type: "image",
      tabindex: 0,
      elementId: "react-reCAPTCHA",
    };
  },

  getValue: function () {
    if (typeof grecaptcha !== "undefined" && this.state.widgetId) {
      return grecaptcha.getResponse(this.state.widgetId);
    }
    return null;
  },

  reset: function () {
    if (typeof grecaptcha !== "undefined" && this.state.widgetId) {
      grecaptcha.reset(this.props.widgetId);
    }
  },

  handleExpired: function () {
    if (this.props.onExpired) {
      this.props.onExpired();
    } else if (this.props.onChange) {
      this.props.onChange(null);
    }
  },

  explicitRender: function () {
    var id = grecaptcha.render(this.refs.captcha.getDOMNode(), {
      sitekey: this.props.sitekey,
      callback: this.props.onChange,
      theme: this.props.theme,
      type: this.props.type,
      tabindex: this.props.tabindex,
      "expired-callback": this.handleExpired,
    });
    this.setState({
      widgetId: id,
    });
  },


  handleLoad: function () {
    this.explicitRender();
    if (this.props.onLoad) {
      this.props.onLoad();
    }
  },

  componentDidMount: function () {
    // If script is not loaded, set the callback on window.
    if (typeof grecaptcha === "undefined") {
      window[this.props.onloadCallbackName] = this.handleLoad;
    } else {
      this.handleLoad();
    }
  },

  render: function () {
    return (
      <div ref="captcha" id={this.props.elementId} />
    );
  }
});

module.exports = ReCAPTCHA;

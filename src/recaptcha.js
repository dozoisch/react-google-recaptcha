/*global grecaptcha*/
"use strict";
import React from "react";
const PropTypes = React.PropTypes;

const ReCAPTCHA = React.createClass({
  displayName: "react-reCAPTCHA",
  propTypes: {
    sitekey: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onloadCallbackName: PropTypes.string.isRequired, // Name on the script tag onload query parameter
    theme: PropTypes.oneOf(["dark", "light"]),
    type: PropTypes.oneOf(["image", "audio"]),
    elementId: PropTypes.string,
    tabindex: PropTypes.number,
    onLoad: PropTypes.func,
    onExpired: PropTypes.func,
  },

  getDefaultState() {
    return {};
  },

  getDefaultProps() {
    return {
      theme: "light",
      type: "image",
      tabindex: 0,
      elementId: "react-reCAPTCHA",
    };
  },

  getValue() {
    if (typeof grecaptcha !== "undefined" && this.state.widgetId) {
      return grecaptcha.getResponse(this.state.widgetId);
    }
    return null;
  },

  reset() {
    if (typeof grecaptcha !== "undefined" && this.state.widgetId) {
      grecaptcha.reset(this.state.widgetId);
    }
  },

  handleExpired() {
    if (this.props.onExpired) {
      this.props.onExpired();
    } else if (this.props.onChange) {
      this.props.onChange(null);
    }
  },

  explicitRender() {
    if (typeof grecaptcha !== "undefined") {
      let id = grecaptcha.render(this.refs.captcha.getDOMNode(), {
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
    }
  },

  handleLoad() {
    this.explicitRender();
    if (this.props.onLoad) {
      this.props.onLoad();
    }
  },

  componentDidMount() {
    // If script is not loaded, set the callback on window.
    if (typeof grecaptcha === "undefined") {
      window[this.props.onloadCallbackName] = this.handleLoad;
    } else {
      this.handleLoad();
    }
  },

  render() {
    return (
      <div ref="captcha" id={this.props.elementId} />
    );
  }
});

export default ReCAPTCHA;

import React, { PropTypes } from "react";

const ReCAPTCHA = React.createClass({
  displayName: "reCAPTCHA",
  propTypes: {
    sitekey: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    grecaptcha: PropTypes.object,
    theme: PropTypes.oneOf(["dark", "light"]),
    type: PropTypes.oneOf(["image", "audio"]),
    tabindex: PropTypes.number,
    onExpired: PropTypes.func,
  },

  getInitialState() {
    return {};
  },

  getDefaultProps() {
    return {
      theme: "light",
      type: "image",
      tabindex: 0,
    };
  },

  getValue() {
    if (this.props.grecaptcha && this.state.widgetId) {
      return this.props.grecaptcha.getResponse(this.state.widgetId);
    }
    return null;
  },

  reset() {
    if (this.props.grecaptcha && this.state.widgetId) {
      this.props.grecaptcha.reset(this.state.widgetId);
    }
  },

  handleExpired() {
    if (this.props.onExpired) {
      this.props.onExpired();
    } else if (this.props.onChange) {
      this.props.onChange(null);
    }
  },

  explicitRender(cb) {
    if (this.props.grecaptcha && !this.state.widgetId) {
      this.refs.captcha.getDOMNode();
      let id = this.props.grecaptcha.render(this.refs.captcha.getDOMNode(), {
        sitekey: this.props.sitekey,
        callback: this.props.onChange,
        theme: this.props.theme,
        type: this.props.type,
        tabindex: this.props.tabindex,
        "expired-callback": this.handleExpired,
      });
      this.setState({
        widgetId: id,
      }, cb);
    }
  },

  componentDidMount() {
    this.explicitRender();
  },

  componentDidUpdate() {
    this.explicitRender();
  },

  render() {
    // consume properties owned by the reCATPCHA, pass the rest to the div so the user can style it.
    /* eslint-disable no-unused-vars */
    let { sitekey, onChange, theme, type, tabindex, onExpired, ...childProps } = this.props;
    /* eslint-enable no-unused-vars */
    return (
      <div {...childProps} ref="captcha" />
    );
  }
});

export default ReCAPTCHA;

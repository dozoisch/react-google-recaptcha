import React from "react";
import PropTypes from "prop-types";
import createReactClass from "create-react-class";

const ReCAPTCHA = createReactClass({
  displayName: "reCAPTCHA",
  propTypes: {
    sitekey: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    grecaptcha: PropTypes.object,
    theme: PropTypes.oneOf(["dark", "light"]),
    type: PropTypes.oneOf(["image", "audio"]),
    tabindex: PropTypes.number,
    onExpired: PropTypes.func,
    size: PropTypes.oneOf(["compact", "normal", "invisible"]),
    stoken: PropTypes.string,
    badge: PropTypes.oneOf(["bottomright", "bottomleft ", "inline"]),
  },

  getInitialState () {
    return {};
  },

  getDefaultProps () {
    return {
      theme: "light",
      type: "image",
      tabindex: 0,
      size: "normal",
      badge: "bottomright",
    };
  },

  getValue () {
    if (this.props.grecaptcha && this.state.widgetId !== undefined) {
      return this.props.grecaptcha.getResponse(this.state.widgetId);
    }
    return null;
  },

  execute () {
    const { grecaptcha } = this.props;
    const { widgetId } = this.state;

    if (grecaptcha && widgetId !== undefined) {
      return grecaptcha.execute(widgetId);
    }
  },

  reset () {
    if (this.props.grecaptcha && this.state.widgetId !== undefined) {
      this.props.grecaptcha.reset(this.state.widgetId);
    }
  },

  handleExpired () {
    if (this.props.onExpired) {
      this.props.onExpired();
    } else if (this.props.onChange) {
      this.props.onChange(null);
    }
  },

  explicitRender (cb) {
    if (this.props.grecaptcha && this.state.widgetId === undefined) {
      const id = this.props.grecaptcha.render(this.refs.captcha, {
        sitekey: this.props.sitekey,
        callback: this.props.onChange,
        theme: this.props.theme,
        type: this.props.type,
        tabindex: this.props.tabindex,
        "expired-callback": this.handleExpired,
        size: this.props.size,
        stoken: this.props.stoken,
        badge: this.props.badge,
      });
      this.setState({
        widgetId: id,
      }, cb);
    }
  },

  componentDidMount () {
    this.explicitRender();
  },

  componentDidUpdate () {
    this.explicitRender();
  },

  render () {
    // consume properties owned by the reCATPCHA, pass the rest to the div so the user can style it.
    /* eslint-disable no-unused-vars */
    const { sitekey, onChange, theme, type, tabindex, onExpired, size, stoken, grecaptcha, badge, ...childProps } = this.props;
    /* eslint-enable no-unused-vars */
    return (
      <div {...childProps} ref="captcha" />
    );
  },
});

export default ReCAPTCHA;

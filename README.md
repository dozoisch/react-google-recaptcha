# react-google-recaptcha

[![Build Status][ci.img]][ci.url] [![npm version][npm.img]][npm.url] [![npm downloads][npm.dl.img]][npm.dl.url]

[![Edit react-google-recaptcha example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/1y4zzjq37l)

React component for [Google reCAPTCHA v2][reCAPTCHA].

## Installation

```shell
npm install --save react-google-recaptcha
```

## Usage

All you need to do is [sign up for an API key pair][signup]. You will need the client key then you can use `<ReCAPTCHA />`.

The default usage imports a wrapped component that loads the google recaptcha script asynchronously then instantiates a `reCAPTCHA` the user can then interact with.

Code Example:
```jsx
import ReCAPTCHA from "react-google-recaptcha";

function onChange(value) {
  console.log("Captcha value:", value);
}

ReactDOM.render(
  <ReCAPTCHA
    sitekey="Your client site key"
    onChange={onChange}
  />,
  document.body
);
```

### Component Props

Properties used to customise the rendering:

| Name | Type | Description |
|:---- | ---- | ------ |
| asyncScriptOnLoad | func | *optional* callback when the google recaptcha script has been loaded |
| badge | enum | *optional* `bottomright`, `bottomleft` or `inline`. Positions reCAPTCHA badge. *Only for invisible reCAPTCHA* |
| hl | string | *optional* set the hl parameter, which allows the captcha to be used from different languages, see [reCAPTCHA hl] |
| isolated | bool | *optional* For plugin owners to not interfere with existing reCAPTCHA installations on a page. If true, this reCAPTCHA instance will be part of a separate ID space. *(__default:__ `false`)*
| onChange | func | The function to be called when the user successfully completes the captcha |
| onErrored | func | *optional* callback when the challenge errored, most likely due to network issues. |
| onExpired | func | *optional* callback when the challenge is expired and has to be redone by user. By default it will call the onChange with null to signify expired callback. |
| sitekey | string | The API client key |
| size | enum | *optional* `compact`, `normal` or `invisible`. This allows you to change the size or do an invisible captcha |
| stoken | string | *optional* set the stoken parameter, which allows the captcha to be used from different domains, see [reCAPTCHA secure-token] |
| tabindex | number | *optional* The tabindex on the element *(__default:__ `0`)*
| type | enum | *optional* `image` or `audio` The type of initial captcha *(__defaults:__ `image`)*
| theme | enum | *optional* `light` or `dark` The theme of the widget *(__defaults:__ `light`)*. See [example][docs_theme]

### Component Instance API

The component instance also has some utility functions that can be called. These can be accessed via `ref`.

- `getValue()` returns the value of the captcha field
- `getWidgetId()` returns the recaptcha widget Id
- `reset()` forces reset. See the [JavaScript API doc][js_api]
- `execute()` programmatically invoke the challenge
  - need to call when using `"invisible"` reCAPTCHA - [example below](#invisible-recaptcha)
- `executeAsync()` programmatically invoke the challenge and return a promise that resolves to the token or errors(if encountered).
  - alternative approach to `execute()` in combination with the `onChange()` prop - [example below](#invisible-recaptcha)

Example:
```javascript
const recaptchaRef = React.createRef();
...
onSubmit = () => {
  const recaptchaValue = recaptchaRef.current.getValue();
  this.props.onSubmit(recaptchaValue);
}
render() {
  return (
    <form onSubmit={this.onSubmit} >
      <ReCAPTCHA
        ref={recaptchaRef}
        sitekey="Your client site key"
        onChange={onChange}
      />
    </form>
  )
}
```

### Invisible reCAPTCHA

[▶ Codesandbox invisible example](https://codesandbox.io/s/gifted-cache-10q74jj593)

See the [reCAPTCHA documentation](https://developers.google.com/recaptcha/docs/invisible) to see how to configure it.

With the invisible option, you need to handle things a bit differently. You will need to call the `execute` method yourself.

```jsx
import ReCAPTCHA from "react-google-recaptcha";

const recaptchaRef = React.createRef();

ReactDOM.render(
  <form onSubmit={() => { recaptchaRef.current.execute(); }}>
    <ReCAPTCHA
      ref={recaptchaRef}
      size="invisible"
      sitekey="Your client site key"
      onChange={onChange}
    />
  </form>,
  document.body
);
```

Additionally, you can use the `executeAsync` method to use a promise based approach.

```jsx
import ReCAPTCHA from "react-google-recaptcha";


const ReCAPTCHAForm = (props) => {
  const recaptchaRef = React.useRef();

  const onSubmitWithReCAPTCHA = async () => {
    const token = await recaptchaRef.current.executeAsync();

    // apply to form data
  }

  return (
    <form onSubmit={onSubmitWithReCAPTCHA}>
      <ReCAPTCHA
        ref={recaptchaRef}
        size="invisible"
        sitekey="Your client site key"
      />
    </form>
  )

}

ReactDOM.render(
  <ReCAPTCHAForm />,
  document.body
);
```


### Advanced usage

#### Global properties used by reCaptcha

__useRecaptchaNet__: If google.com is blocked, you can set `useRecaptchaNet` to `true` so that the component uses recaptcha.net instead.

__enterprise__: if you want to use Google Enterprise Recaptcha, instead of the free version, set `enterprise` to `true`.

Example global properties:
```js
window.recaptchaOptions = {
  useRecaptchaNet: true,
  enterprise: true,
};
```

### CSP Nonce support
```js
window.recaptchaOptions = {
  nonce: document.querySelector('meta[name=\'csp-nonce\']').getAttribute('content'),
};
```

#### ReCaptcha loading google recaptcha script manually

You can also use the barebone components doing the following. Using that component will oblige you to manage the grecaptcha dep and load the script by yourself.

```jsx
import { ReCAPTCHA } from "react-google-recaptcha";

const grecaptchaObject = window.grecaptcha // You must provide access to the google grecaptcha object.

render(
  <ReCAPTCHA
    ref={(r) => this.recaptcha = r}
    sitekey="Your client site key"
    grecaptcha={grecaptchaObject}
  />,
  document.body
);
```

#### Hiding the Recaptcha

According to the [google docs](https://developers.google.com/recaptcha/docs/faq#id-like-to-hide-the-recaptcha-badge.-what-is-allowed) you are allowed to hide the badge as long as you include the reCAPTCHA branding visibly in the user flow. Please include the following text:

```
This site is protected by reCAPTCHA and the Google
    <a href="https://policies.google.com/privacy">Privacy Policy</a> and
    <a href="https://policies.google.com/terms">Terms of Service</a> apply.
```

If you wish to hide the badge you must add:

```
.grecaptcha-badge { visibility: hidden; }

```

to your css.



[ci.img]: https://github.com/dozoisch/react-google-recaptcha/actions/workflows/standard-ci.yml/badge.svg?branch=master
[ci.url]: https://github.com/dozoisch/react-google-recaptcha/actions/workflows/standard-ci.yml
[npm.img]: https://badge.fury.io/js/react-google-recaptcha.svg
[npm.url]: http://badge.fury.io/js/react-google-recaptcha
[npm.dl.img]: https://img.shields.io/npm/dm/react-google-recaptcha.svg
[npm.dl.url]: https://www.npmjs.com/package/react-google-recaptcha

[reCAPTCHA]: https://developers.google.com/recaptcha/docs/display
[signup]: http://www.google.com/recaptcha/admin
[docs]: https://developers.google.com/recaptcha
[docs_theme]: https://developers.google.com/recaptcha/docs/faq#can-i-customize-the-recaptcha-widget
[js_api]: https://developers.google.com/recaptcha/docs/display#js_api
[rb]: https://github.com/react-bootstrap/react-bootstrap/
[reCAPTCHA secure-token]: https://developers.google.com/recaptcha/docs/secure_token
[reCAPTCHA hl]: https://developers.google.com/recaptcha/docs/language

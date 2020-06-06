# react-google-recaptcha

[![Build Status][travis.img]][travis.url] [![npm version][npm.img]][npm.url] [![npm downloads][npm.dl.img]][npm.dl.url] [![Dependencies][deps.img]][deps.url]

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
| sitekey | string | The API client key |
| onChange | func | The function to be called when the user successfully completes the captcha |
| theme | enum | *optional* `light` or `dark` The theme of the widget *(__defaults:__ `light`)*. See [example][docs_theme]
| type | enum | *optional* `image` or `audio` The type of initial captcha *(__defaults:__ `image`)*
| tabindex | number | *optional* The tabindex on the element *(__default:__ `0`)*
| onExpired | func | *optional* callback when the challenge is expired and has to be redone by user. By default it will call the onChange with null to signify expired callback. |
| onErrored | func | *optional* callback when the challenge errored, most likely due to network issues. |
| stoken | string | *optional* set the stoken parameter, which allows the captcha to be used from different domains, see [reCAPTCHA secure-token] |
| hl | string | *optional* set the hl parameter, which allows the captcha to be used from different languages, see [reCAPTCHA hl] |
| size | enum | *optional* `compact`, `normal` or `invisible`. This allows you to change the size or do an invisible captcha |
| badge | enum | *optional* `bottomright`, `bottomleft` or `inline`. Positions reCAPTCHA badge. *Only for invisible reCAPTCHA* |

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

[Invisible reCAPTCHA](https://developers.google.com/recaptcha/docs/versions)

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


Example global properties:
```js
window.recaptchaOptions = {
  useRecaptchaNet: true,
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

## Migrate to 2.0

- __options.removeOnUnmount__: *REMOVED* This was only useful for the lang changes. Lang is now changed through the `hl` prop.
- __options.lang__: *REMOVED* Instead pass it as the `hl` prop on the component.


## Notes on Requirements
At least `React@16.4.1` is required due to `forwardRef` usage in the dependency [react-async-script](https://github.com/dozoisch/react-async-script).

## Notes

Pre `1.0.0` and `React < 16.4.1` support details in [0.14.0](https://github.com/dozoisch/react-google-recaptcha/tree/v0.14.0).

[travis.img]: https://travis-ci.org/dozoisch/react-google-recaptcha.svg?branch=master
[travis.url]: https://travis-ci.org/dozoisch/react-google-recaptcha
[npm.img]: https://badge.fury.io/js/react-google-recaptcha.svg
[npm.url]: http://badge.fury.io/js/react-google-recaptcha
[npm.dl.img]: https://img.shields.io/npm/dm/react-google-recaptcha.svg
[npm.dl.url]: https://www.npmjs.com/package/react-google-recaptcha
[deps.img]: https://david-dm.org/dozoisch/react-google-recaptcha.svg
[deps.url]: https://david-dm.org/dozoisch/react-google-recaptcha

[reCAPTCHA]: https://developers.google.com/recaptcha/docs/display
[signup]: http://www.google.com/recaptcha/admin
[docs]: https://developers.google.com/recaptcha
[docs_theme]: https://developers.google.com/recaptcha/docs/faq#can-i-customize-the-recaptcha-widget
[js_api]: https://developers.google.com/recaptcha/docs/display#js_api
[rb]: https://github.com/react-bootstrap/react-bootstrap/
[reCAPTCHA secure-token]: https://developers.google.com/recaptcha/docs/secure_token
[reCAPTCHA hl]: https://developers.google.com/recaptcha/docs/language

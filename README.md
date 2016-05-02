# react-google-recaptcha

[![Build Status][travis.img]][travis.url]
[![npm version][npm.img]][npm.url]
[![Dependencies][deps.img]][deps.url]
[![Dev Dependencies][devdeps.img]][devdeps.url]

Component wrapper for [Google reCAPTCHA v2][reCAPTCHA]

## Installation

```shell
npm install --save react-google-recaptcha
```

### React 0.13
With 0.13, install version 0.4.1
```shell
npm install --save react-google-recaptcha@0.4.1
```

## Usage

All you need to do is [sign up for an API key pair][signup]. You will need the client key.

You can then use the reCAPTCHA. The default require, imports a wrapped component that loads the reCAPTCHA script asynchronously.

```jsx
var React = require("react");
var render = require("react-dom").render
var ReCAPTCHA = require("react-google-recaptcha");

function onChange(value) {
  console.log("Captcha value:", value);
}

render(
    <ReCAPTCHA
      ref="recaptcha"
      sitekey="Your client site key"
      onChange={onChange}
    />,
    document.body
);
```

### Rendering Props

Other properties can be used to customised the rendering.

| Name | Type | Description |
|:---- | ---- | ------ |
| sitekey | string | The API client key |
| onChange | func | The function to be called when the user completes successfully the captcha |
| theme | enum | *optional* `light` or `dark` The them of the widget *(__defaults:__ light)*
| type | enum | *optional* `image` or `audio` The type of initial captcha *(__defaults:__ image)*
| tabindex | number | *optional* The tabindex on the element *(__default:__ 0)*
| onExpired | func | *optional* callback when the challenge is expired and has to be redone by user. By default it will call the onChange with null to signify expired callback. |
| stoken | string | *optional* set the stoken parameter, which allows the captcha to be used from different domains, see [reCAPTCHA secure-token] |

In order to translate the reCaptcha widget you should create a global variable configuring the desire language, if you don't provide it reCaptcha will pick up the user's interface language.

```
window.recaptchaOptions = {
  lang: 'fr'
}
```

## Component API

The component also has some utility functions that can be called.

- `getValue()` returns the value of the captcha field
- `reset()` forces reset. See the [JavaScript API doc][js_api]

### Advanced usage

You can also use the barebone components doing the following. Using that component will oblige you to manage the grecaptcha dep and load the script by yourself.

```jsx
var React = require("react");
var render = require("react-dom").render
var ReCAPTCHA = require("react-google-recaptcha/lib/recaptcha");

var grecaptchaObject = grecaptcha // You must provide access to the google grecaptcha object.

function onChange(value) {
  console.log("Captcha value:", value);
}

render(
    <ReCAPTCHA
      ref="recaptcha"
      sitekey="Your client site key"
      onChange={onChange}
      grecaptcha={grecaptchaObject}
    />,
    document.body
);
```

[travis.img]: https://travis-ci.org/dozoisch/react-google-recaptcha.svg?branch=master
[travis.url]: https://travis-ci.org/dozoisch/react-google-recaptcha
[npm.img]: https://badge.fury.io/js/react-google-recaptcha.svg
[npm.url]: http://badge.fury.io/js/react-google-recaptcha
[deps.img]: https://david-dm.org/dozoisch/react-google-recaptcha.svg
[deps.url]: https://david-dm.org/dozoisch/react-google-recaptcha
[devdeps.img]: https://david-dm.org/dozoisch/react-google-recaptcha/dev-status.svg
[devdeps.url]: https://david-dm.org/dozoisch/react-google-recaptcha#info=devDependencies

[reCAPTCHA]: https://www.google.com/recaptcha
[signup]: http://www.google.com/recaptcha/admin
[docs]: https://developers.google.com/recaptcha
[js_api]: https://developers.google.com/recaptcha/docs/display#js_api
[rb]: https://github.com/react-bootstrap/react-bootstrap/
[reCAPTCHA secure-token]: https://developers.google.com/recaptcha/docs/secure_token

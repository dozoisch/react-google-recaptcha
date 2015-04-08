# react-google-recaptcha

[![Build Status][travis.img]][travis.url]
[![Dependencies][deps.img]][deps.url]
[![Dev Dependencies][devdeps.img]][devdeps.url]

Component wrapper for [Google reCAPTCHA][reCAPTCHA]

## Installation

```shell
npm install --save react-google-recaptcha
```

## Usage

First of all [sign up for an API key pair][signup]. Then add the Google reCAPTCHA script tag to your html.

The property set after `onload` is important and will be needed at render. This props is used to define a global callback, called by the Google script once it is loaded.

See the [Google reCAPTCHA docs][docs] for more info.

```html
<script src="https://www.google.com/recaptcha/api.js?render=explicit&onload=onloadCallback" async defer></script>
```

You can then use the reCAPTCHA

```jsx
var React = require("react");
var ReCATPCHA = require("react-google-recaptcha");

function onChange(value) {
  console.log("Captcha value:", value);
}

React.render(
<ReCATPCHA
  sitekey="Your sitekey"
  onChange={onChange}
  onloadCallbackName="onloadcallback"
/>, document.body);
```

###Rendering Props

Other properties can be used to customised the rendering.

| Name | Type | Description |
|:---- | ---- | ------ |
| sitekey | string | The API client key |
| onChange | func | The function to be called when the user completes successfully the captcha |
| onloadCallbackName | string | The name the script will call onload. **This must be the same provided on script tag.**
| theme | enum | *optional* `light` or `dark` The them of the widget *(__defaults:__ light)*
| type | enum | *optional* `image` or `audio` The type of initial captcha *(__defaults:__ image)*
| tabindex | number | *optional* The tabindex on the element *(__default:__ 0)*
| onLoad | func | *optional* callback called when the widget has rendered
| onExpired | func | *optional* callback when the challenge is expired and has to be redone by user. By default it will call the onChange with null to signify expired callback. |

## Component API

The component also has some utility functions that can be called.

- `getValue()` returns the value of the captcha field
- `reset()` forces reset. See the [JavaScript API doc][js_api]

## To Come Soon
- tests
- examples
- code coverage

*The build is highly inspired by [react-bootstrap][rb]*

[travis.img]: https://travis-ci.org/dozoisch/react-google-recaptcha.svg?branch=master
[travis.url]: https://travis-ci.org/dozoisch/react-google-recaptcha
[deps.img]: https://david-dm.org/dozoisch/react-google-recaptcha.svg
[deps.url]: https://david-dm.org/dozoisch/react-google-recaptcha
[devdeps.img]: https://david-dm.org/dozoisch/react-google-recaptcha/dev-status.svg
[devdeps.url]: https://david-dm.org/dozoisch/react-google-recaptcha#info=devDependencies

[reCAPTCHA]: https://www.google.com/recaptcha
[signup]: http://www.google.com/recaptcha/admin
[docs]: https://developers.google.com/recaptcha
[js_api]: https://developers.google.com/recaptcha/docs/display#js_api
[rb]: https://github.com/react-bootstrap/react-bootstrap/

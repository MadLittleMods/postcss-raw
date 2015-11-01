[![npm version](https://img.shields.io/npm/v/postcss-raw.svg)](https://www.npmjs.com/package/postcss-raw) [![Build Status](https://travis-ci.org/MadLittleMods/postcss-raw.svg)](https://travis-ci.org/MadLittleMods/postcss-raw)

# PostCSS Raw

[PostCSS](https://github.com/postcss/postcss) plugin to output nodes inside the `@raw` at-rule, untouched by other plugins in the plugin stack.

## Latest Version: v0.1.0

### [Changelog](https://github.com/MadLittleMods/postcss-raw/blob/master/CHANGELOG.md)

### Install

`npm install postcss-raw --save-dev`

# Usage

`postcss-raw` is a two-part process. First we inspect(`require('postcss-raw').inspect()`) and record any child nodes in the `@raw` at-rule and remove them from the AST tree. This way other plugins can't touch what was inside. Then when you run the write(`require('postcss-raw').write()`), we put those child nodes back in place without the wrapping `@raw` at-rule.

## Basic Example

```js
var postcss = require('postcss');
var raw = require('postcss-raw');
// ES6 modules:
//import { inspect as rawInspect, write as rawWrite } from 'postcss-raw';

var fs = require('fs');

var mycss = fs.readFileSync('input.css', 'utf8');

// Process your CSS with postcss-reverse-media
var output = postcss([
		raw.inspect(/*options*/),
		// other plugins...
		raw.write(/*options*/)
	])
	.process(mycss)
	.css;

console.log(output);
```

Input:
```css
@raw {
	@import "variables";
	$foo: #f00;
}
```

Output:
```css
@import "variables";
$foo: #f00;
```




# Options

 - `atRuleKeyword`: string - The media query name keyword that applies the plugin.
	  - Default: `'raw'`



# Testing

`npm test`

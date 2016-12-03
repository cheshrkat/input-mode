# Input Mode

Input Mode is a script which detects mouse movements, pointer events and key presses; then sets a data attribute on the body element to indicate mouse or keyboard mode (it does detect touch to some degree but this has not been heavily tested).

The point is you can style separately for mouse and keyboard use.

**Caveat: This is an experimental technique and there could be unforseen side effects.** Please test your implementation carefully.

## Demo

https://cheshrkat.github.io/input-mode/

## Background

It's a classic accessibility vs design situation: you want to put good keyboard affordances in your app or site, but they are ugly and even confusing when mouse users run into them (eg. overflowed elements creating oversized focus outlines).

So what to do? The mouse user really doesn't need these things, they've already worked out they can click. But the keyboard users desperately need them. Hence detecting input mode.

## Setup and usage

1. Import `dist/input-mode.min.js` in your project.
2. Initialise by calling `inputMode();` with optional options object.

```javascript
inputMode({
    'element':	document.getElementById('foo'),
    'attr': 	'data-foo',
    'delay': 	100,
    'default':  'keyboard'
})
```

### Options

| Property Name | Value | Description |  Default  |
| --- | --- | --- | --- |
| `element` | DOM element | DOM element to apply the mode attribute to. | `<body>` |
| `attr` | string | Attribute name to contain the mode strings. | data-inputmode | 
| `delay` | int | Debounce delay in ms | 200 |
| `default` | string | Sets default mode (`mouse`, `keyboard` or `touch`). | `mouse` |


## Usage guidelines

Use the attribute as a scoping CSS selector. For example, while in mouse mode you could suppress the outline on focused elements:

<code>[data-inputmode="mouse"] [tabindex="0"]:focus { outline: none }</code>

It is better to remove things that you know you don't want, rather than suppress things you need and try to put them back later. 

Input Mode is intended for use in cases where mouse users are seeing extraneous affordances; or keyboard users need additional affordances; AND no other option is available.

## Browser support

Tested in: Opera 34, Chrome 47, Firefox 41, IE11, Edge 12. Should work in IE9+ but will break in IE8.

## License &amp; Credits

Open source under the MIT license. 

Created by <a href="https://twitter.com/200okpublic">Ben Buchanan</a> with contributions by <a href="https://twitter.com/clarkpan">Clark Pan</a>.

# color.ts

A tiny color manipulation library for TypeScript.

## Goals

- Provide a small fully typed library for manipulating colors in hex, rgb(a) and hsl(a).
- Provide an object-oriented interface with SCSS-like syntax.
- Handle conversions between formats automatically.

## Installation

1. Install:

```bash
npm i @bluefirex/color-ts
```

2. Use:

```ts
import { Color } from '@bluefirex/color-ts'

const color = Color.fromString('#17a')
                   .withAlpha(0.67)
                   .darken(16)
                   .saturate(8)

console.log(color.cssHSLA, color.cssRGBA, color.cssHex)
```

## Usage

### Number ranges

- For RGB, numbers range from 0-255
- For HSL, numbers range from 0-1

### Create for different formats

```ts
// Hex
Color.fromHex('#17a')
Color.fromHex('#123456')
Color.fromHex('999')

// RGB with alpha of 0.5
Color.fromRGB({
	r: 0,
	g: 125,
	b: 255
}, 0.5)

// HSL with alpha of 0.42
Color.fromHSL({
    h: 0.5,
    s: 1.0,
    l: 1.0
}, 0.42)

// From CSS-like strings
Color.fromString('#DEADBEF')
Color.fromString('rgba(128, 0, 32, 0.2)')
Color.fromString('hsl(42, 13%, 37%)')
```

### Lightness / Darkness

```ts
const color = Color.fromString('#17a')

// Lighten/darken like in SCSS (percentage from 0-100)
let darkened = color.darken(24),
    lightened = color.lighten(24)

// Check if color is considered to be a dark color
let isDark = color.isDark()

// Specific lightness
let withLightness = color.withLightness(0.1337)

// Get the brightness as perceived by a human, 0-255
let perceived = color.perceivedBrightness
```

### Hue

```ts
const color = Color.fromString('#17a')

// Check if color is red or green (signal colors)
let isRed = color.isRedish(),
    isGreen = color.isGreenish()

// Shift hue
let shifted = color.shiftHue(0.125)

// Specific hue
let withHue = color.withHue(0.5)
```

### Saturation

```ts
const color = Color.fromString('#17a')

// Saturate/desaturate like in SCSS (percentage from 0-100)
let saturated = color.saturate(24),
    desaturated = color.desaturate(24)

// Specific saturation
let withSaturation = color.withSaturation(0.2)
```

### Alpha

```ts
const color = Color.fromString('#17a')

// Specific alpha
let withAlpha = color.withAlpha(0.42)
```

### Contrast

This uses the WCAG standard for contrast calculation. If the contrast value exceeds `4.5` it is considered readable.

```ts
const foreground = Color.fromString('#17a'),
    background = Color.fromString('#ffff00')

// Option A:
const resultA = foreground.contrastTo(background)

// Option B:
const resultB = Color.contrast(foreground, background)
```

### Convert into different formats

```ts
const color = Color.fromString('#17a')

// Hex without #
const hexClean = color.hex

// Hex for use with CSS (includes #)
const hex = color.cssHex

// RGB(A) for use with CSS
const rgba = color.cssRGBA

// RGB as an object or array
const rgbArray = color.rgbArray,
    rgbString = color.rgbString,
    rgb = color.rgb

// HSL(A) for use with CSS
const hsla = color.cssHSLA

// HSL as an object or array
const hslArray = color.hslArray,
	hsl = color.hsl

// To and from JSON
const json = color.toJSON(),
    restored = Color.fromJSON(json)
```

### Other helpful functions

#### Mix two colors

```ts
const colorA = Color.fromString('#17a'),
    colorB = Color.fromString('#ff0020')

// Option A:
const mixedA = colorA.mixWith(colorB, 25)

// Option B:
const mixedB = Color.mix(colorA, colorB, 25)
```

#### Check if two colors are similar

```ts
const colorA = Color.fromString('#272727'),
	colorB = Color.fromString('#282828')

console.log(colorA.isSimilarTo(colorB, 0.95)) // true
```

#### Compare lightness of two colors

```ts
const colorA = Color.fromString('#272727'),
	colorB = Color.fromString('#282828')

console.log(colorA.isLighterThan(colorB)) // false
console.log(colorA.isDarkerThan(colorB)) // true
```

## Development

1. Clone repo: `git clone git@github.com:bluefirex/color-ts`
2. Install dependencies (only vitest and vite): `npm i`
3. Make your changes.
4. Run tests: `npm run test`
5. Run build: `npm run build` (do not commit build files unless they are to be released)

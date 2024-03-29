export var ColorType;
(function (ColorType) {
    /**
     * Indicates a CSS-RGB string, e.g. "rgb(255, 128, 0)"
     */
    ColorType[ColorType["rgb"] = 0] = "rgb";
    /**
     * Indicates a CSS-RGBa string, e.g. "rgba(255, 128, 0, 0.42)"
     */
    ColorType[ColorType["rgba"] = 1] = "rgba";
    /**
     * Indicates a CSS-HSL string, e.g. "hsl(160, 96%, 42%)"
     */
    ColorType[ColorType["hsl"] = 2] = "hsl";
    /**
     * Indicates a CSS-HSLa string, e.g. "hsla(160, 96%, 42%, 0.1337)"
     */
    ColorType[ColorType["hsla"] = 3] = "hsla";
    /**
     * Indicates a hex representation (with or without leading #)
     */
    ColorType[ColorType["hex"] = 4] = "hex";
    /**
     * Indicates a named color or some other browser-usable color definition, like CSS definitions á la url() or gradients
     */
    ColorType[ColorType["str"] = 5] = "str";
})(ColorType || (ColorType = {}));
/**
 * A class for working with colors
 * Can transform from and into different formats and perform
 * operations on it, e.g. darken, lighten
 *
 * @author bluefirex
 */
export class Color {
    constructor(hex = null, rgb = null, hsl = null, alpha = 1) {
        this.hexContainer = null;
        this.rgbContainer = null;
        this.hslContainer = null;
        this.toString = () => {
            if (this.hslContainer) {
                return this.cssHSLA;
            }
            else if (this.rgbContainer) {
                return this.cssRGBA;
            }
            else if (this.hexContainer) {
                return this.cssHex;
            }
            // Otherwise, force calculate HSLA and wonder how the fuck we got here…
            return this.cssHSLA;
        };
        if (!(hex || rgb || hsl)) {
            throw new Error('One component must be set');
        }
        if (hex) {
            this.hexContainer = hex;
        }
        else if (rgb) {
            this.rgbContainer = {
                r: rgb.r,
                g: rgb.g,
                b: rgb.b
            };
        }
        else if (hsl) {
            this.hslContainer = {
                h: hsl.h,
                s: hsl.s,
                l: hsl.l,
            };
        }
        this.alpha = alpha;
    }
    /**
     * Create a color from a hex string, with or without leading #
     * @param {string} hex
     * @returns {Color}
     */
    static fromHex(hex) {
        let normalizedHex = Color.normalizeHex(hex);
        if (!normalizedHex) {
            throw new Error('Invalid hex value: ' + hex);
        }
        return new Color(normalizedHex, null, null, 1);
    }
    /**
     * Create a color from an RGB object
     * @param {RGB}    rgb
     * @param {number} alpha
     *
     * @returns {Color}
     */
    static fromRGB(rgb, alpha = 1) {
        return new Color(null, rgb, null, alpha);
    }
    /**
     * Create a color from an HSL object
     * @param {HSL}    hsl
     * @param {number} alpha
     * @returns {Color}
     */
    static fromHSL(hsl, alpha = 1) {
        return new Color(null, null, hsl, alpha);
    }
    /**
     * Create a color object from a string
     * Supported notations:
     *  - hex (with or without #)
     *  - rgb(), rgba()
     *  - hsl(), hsla()
     *
     * @param {string} str
     * @returns {Color}
     */
    static fromString(str) {
        if (str === null) {
            return null;
        }
        if (str instanceof Color) {
            return str;
        }
        let type = Color.detectType(str);
        let stringMatches;
        switch (type) {
            case ColorType.hex:
                return Color.fromHex(str);
            case ColorType.hsl:
                stringMatches = str.match(/hsl\(([\d.]+), ?([\d.]+)%, ?([\d.]+)%\)/);
                if (!stringMatches) {
                    return null;
                }
                return Color.fromHSL({
                    h: (parseInt(stringMatches[1]) % 360) / 360,
                    s: parseFloat(stringMatches[2]) / 100,
                    l: parseFloat(stringMatches[3]) / 100
                });
            case ColorType.hsla:
                stringMatches = str.match(/hsla\(([\d.]+), ?([\d.]+)%, ?([\d.]+)%, ?([\d.]+)\)/);
                if (!stringMatches) {
                    return null;
                }
                return Color.fromHSL({
                    h: (parseInt(stringMatches[1]) % 360) / 360,
                    s: parseFloat(stringMatches[2]) / 100,
                    l: parseFloat(stringMatches[3]) / 100
                }, parseFloat(stringMatches[4]));
            case ColorType.rgb:
                stringMatches = str.match(/rgb\((\d+), ?(\d+), ?(\d+)\)/);
                if (!stringMatches) {
                    return null;
                }
                return Color.fromRGB({
                    r: parseInt(stringMatches[1]),
                    g: parseInt(stringMatches[2]),
                    b: parseInt(stringMatches[3])
                });
            case ColorType.rgba:
                stringMatches = str.match(/rgba\((\d+), ?(\d+), ?(\d+), ?([\d.]+)\)/);
                if (!stringMatches) {
                    return null;
                }
                return Color.fromRGB({
                    r: parseInt(stringMatches[1]),
                    g: parseInt(stringMatches[2]),
                    b: parseInt(stringMatches[3])
                }, parseFloat(stringMatches[4]));
            default:
                return null;
        }
    }
    /**
     * Get a random color (RGB 0, 0, 0 to RGB 255, 255, 255)
     *
     * @returns {Color}
     */
    static random() {
        let r = Math.round(Math.random() * 255), g = Math.round(Math.random() * 255), b = Math.round(Math.random() * 255);
        return Color.fromRGB({
            r,
            g,
            b
        });
    }
    // Operations
    /**
     * Darken the color by a certain percentage (0-100), just like in SCSS
     * @param percentage
     * @returns {Color}
     */
    darken(percentage) {
        return Color.fromHSL({
            h: this.hsl.h,
            s: this.hsl.s,
            l: Math.max(Math.min(this.hsl.l - (percentage / 100), 1), 0)
        }, this.alpha);
    }
    /**
     * Lighten the color by a certain percentage (0-100), just like in SCSS
     *
     * @param percentage
     *
     * @returns {Color}
     */
    lighten(percentage) {
        return this.darken(-percentage);
    }
    /**
     * Saturate the color by a certain percentage (0-100), just like in SCSS
     *
     * @param percentage
     *
     * @returns {Color}
     */
    saturate(percentage) {
        return Color.fromHSL({
            h: this.hsl.h,
            s: Math.max(Math.min(this.hsl.s + (percentage / 100), 1), 0),
            l: this.hsl.l
        }, this.alpha);
    }
    /**
     * Desaturate the color by a certain percentage (0-100), just like in SCSS
     *
     * @param percentage
     *
     * @returns {Color}
     */
    desaturate(percentage) {
        return this.saturate(-percentage);
    }
    /**
     * Shift the hue by a certain amount
     *
     * @param {number} amount   Amount to shift by, 0-1
     *
     * @returns {Color}
     */
    shiftHue(amount) {
        return Color.fromHSL({
            h: (this.hsl.h + amount) % 1,
            s: this.hsl.s,
            l: this.hsl.l
        }, this.alpha);
    }
    /**
     * Get a clone of this color with an alpha value
     *
     * @param {number}  alpha    between 0 and 1
     *
     * @returns {Color}
     */
    withAlpha(alpha = 1) {
        let clone = this.clone();
        clone.alpha = alpha;
        return clone;
    }
    /**
     * Get a clone of this color with a specific hue
     *
     * @param {number}  hue     between 0 and 1
     *
     * @returns {Color}
     */
    withHue(hue = 0) {
        let clone = this.clone();
        clone.hsl.h = hue;
        clone.rgbContainer = null;
        clone.hexContainer = null;
        return clone;
    }
    /**
     * Get a clone of this color with a specific saturation
     *
     * @param {number} saturation   between 0 and 1
     *
     * @returns {Color}
     */
    withSaturation(saturation = 1) {
        let clone = this.clone();
        clone.hsl.s = saturation;
        clone.rgbContainer = null;
        clone.hexContainer = null;
        return clone;
    }
    /**
     * Get a clone of this color with a specific lightness
     *
     * @param {number} lightness    between 0 and 1
     *
     * @returns {Color}
     */
    withLightness(lightness = 1) {
        let clone = this.clone();
        clone.hsl.l = lightness;
        return clone;
    }
    /**
     * Mix this color with another color
     *
     * @param {Color} color     Other color
     * @param {number} weight   Weight between 0 and 100, like SCSS
     *
     * @returns {Color}
     */
    mixWith(color, weight = 50) {
        return Color.mix(this, color, weight);
    }
    /**
     * Get the WCAG contrast ratio to another color
     *
     * @param {Color} color
     *
     * @returns {number}
     */
    contrastTo(color) {
        return Color.contrast(this, color);
    }
    clone() {
        return Color.fromHSL(this.hsl, this.alpha);
    }
    /**
     * Return the perceived brightness
     * The perceived brightness is the brightness value between 0 and 255
     * as perceived by a human in RGB colorspace with alpha = 1.
     *
     * @return {number}
     */
    get perceivedBrightness() {
        return 0.2126 * this.rgb.r + 0.7152 * this.rgb.g + 0.0722 * this.rgb.b;
    }
    /**
     * Is this color darker than a defined limit according to human perception?
     * @returns {boolean}
     */
    isDark() {
        return this.perceivedBrightness <= 120;
    }
    /**
     * Is this color lighter than a defined limit according to human perception?
     * @returns {boolean}
     */
    isLight() {
        return !this.isDark();
    }
    /**
     * Does the color look red to a human?
     *
     * @returns {boolean}
     */
    isRedish() {
        let hue = this.hsl.h, sat = this.hsl.s, light = this.hsl.l;
        // No color is really discernible at this point
        if (light < 0.2 || light >= 0.96) {
            return false;
        }
        let isReddishHue = hue >= 0 && hue <= 0.072 // left side or one part of the circle
            || hue >= 0.933; // right side or the other part of the circle
        if (isReddishHue) {
            return sat > 0.201;
        }
        return false;
    }
    /**
     * Does the color look green to a human?
     *
     * @returns {boolean}
     */
    isGreenish() {
        let hue = this.hsl.h, sat = this.hsl.s, light = this.hsl.l;
        // No color is really discernible at this point
        if (light < 0.2 || light >= 0.96) {
            return false;
        }
        if (hue >= 0.23 && hue <= 0.469) {
            return sat > 0.201;
        }
        return false;
    }
    /**
     * Is this color white?
     *
     * @returns {boolean}
     */
    isWhite() {
        return (this.hsl.s == 1 || this.hsl.s == 0) && this.hsl.l == 1;
    }
    /**
     * Is this color black?
     *
     * @returns {boolean}
     */
    isBlack() {
        return (this.hsl.s == 1 || this.hsl.s == 0) && this.hsl.l == 0;
    }
    /**
     * Is this color similar to another color?
     *
     * @param {Color}   color
     * @param {number}  accuracy    How close the colors have to be, 0-1
     *
     * @returns {boolean}
     */
    isSimilarTo(color, accuracy = 0.99) {
        return Color.areSimilar(this, color, accuracy);
    }
    // Getters
    /**
     * Get as hex string without leading #
     * @returns {string}
     */
    get hex() {
        if (!this.hexContainer) {
            this.calculateHex();
        }
        return this.hexContainer;
    }
    /**
     * Get as a CSS-suitable hex string
     *
     * @returns {string}
     */
    get cssHex() {
        return '#' + this.hex;
    }
    /**
     * Get as RGB object
     * @returns {RGB}
     */
    get rgb() {
        if (!this.rgbContainer) {
            this.calculateRGB();
        }
        return this.rgbContainer;
    }
    /**
     * Get as a CSS-suitable rgba string
     *
     * @returns {string}
     */
    get cssRGBA() {
        return 'rgba(' + this.rgb.r + ', ' + this.rgb.g + ', ' + this.rgb.b + ', ' + this.alpha + ')';
    }
    /**
     * Get the RGB values as a numbers array [R, G, B]
     *
     * @returns {[number, number, number]}
     */
    get rgbArray() {
        return [
            this.rgb.r,
            this.rgb.g,
            this.rgb.b
        ];
    }
    /**
     * Get the RGB values as a string "R, G, B"
     * Useful e.g. for v-bind in Vite, like this:
     * rgba(v-bind("someColor.rgbString"), 0.5)
     *
     * @returns {string}
     */
    get rgbString() {
        const rgb = this.rgb;
        return `${rgb.r}, ${rgb.g}, ${rgb.b}`;
    }
    /**
     * Get as HSL object
     * @returns {HSL}
     */
    get hsl() {
        if (!this.hslContainer) {
            this.calculateHSL();
        }
        return this.hslContainer;
    }
    /**
     * Get as a CSS-suitable hsla string
     *
     * @returns {string}
     */
    get cssHSLA() {
        return 'hsla(' +
            (Math.round(this.hsl.h * 360 * 10000) / 10000) + ', ' +
            (Math.round(this.hsl.s * 100 * 10000) / 10000) + '%, ' +
            (Math.round(this.hsl.l * 100 * 10000) / 10000) + '%, ' +
            this.alpha +
            ')';
    }
    /**
     * Get the HSL values as a numbers array [H, S, L]
     *
     * @returns {[number, number, number]}
     */
    get hslArray() {
        return [
            this.hsl.h,
            this.hsl.s,
            this.hsl.l
        ];
    }
    // Calculators
    calculateHex() {
        if (this.hexContainer) {
            return;
        }
        if (this.rgbContainer) {
            this.hexContainer = Color.rgbToHex(this.rgbContainer);
        }
        else if (this.hslContainer) {
            this.rgbContainer = Color.hslToRgb(this.hslContainer);
            this.calculateHex();
        }
        else {
            throw new Error('Could not calculate hex value');
        }
    }
    calculateRGB() {
        if (this.rgbContainer) {
            return;
        }
        if (this.hexContainer) {
            this.rgbContainer = Color.hexToRgb(this.hexContainer);
        }
        else if (this.hslContainer) {
            this.rgbContainer = Color.hslToRgb(this.hslContainer);
        }
        else {
            throw new Error('Could not calculate RGB values');
        }
    }
    calculateHSL() {
        if (this.hslContainer) {
            return;
        }
        if (this.hexContainer) {
            this.hslContainer = Color.hexToHsl(this.hexContainer);
        }
        else if (this.rgbContainer) {
            this.hslContainer = Color.rgbToHsl(this.rgbContainer);
        }
        else {
            throw new Error('Could not calculate HSL values');
        }
    }
    // Static
    /**
     * Mix two colors like SCSS' mix() function, ignores alpha completely
     *
     * @param color1 Hex Color 1
     * @param color2 Hex Color 2
     * @param weight Percentage from 0 to 100
     */
    static mix(color1, color2, weight = 50) {
        let finalHex = '';
        for (let i = 0; i <= 5; i += 2) {
            let value1 = parseInt(color1.hex.substring(i, i + 2), 16), value2 = parseInt(color2.hex.substring(i, i + 2), 16);
            // Combine a pair of color components (first r, then g, then b) mathematically
            let combinedValue = Math.floor(value2 + (value1 - value2) * (weight / 100.0)), hexCombinedValue = combinedValue.toString(16);
            // If the result is now a single digit, prepend a zero
            while (hexCombinedValue.length < 2) {
                hexCombinedValue = '0' + hexCombinedValue;
            }
            finalHex += hexCombinedValue;
        }
        return Color.fromHex(finalHex);
    }
    /**
     * Shade blend two colors with a given percentage
     * Thanks to http://stackoverflow.com/a/13542669/1486930 for this piece of code.
     * Ignores alpha.
     *
     * @param {Number}            p  Percentage to blend, negative means darken, positive means lighten
     * @param {Color}             c0 Color to blend
     * @param {Color = undefined} c1 Color to blend in, optional
     */
    static shadeBlend(p, c0, c1) {
        let n = p < 0 ? p * -1 : p, u = Math.round, w = parseInt;
        let f = w(c0.hex.slice(1), 16), t = w((c1 ? c1.hex : p < 0 ? "#000000" : "#FFFFFF").slice(1), 16), R1 = f >> 16, G1 = f >> 8 & 0x00FF, B1 = f & 0x0000FF;
        return Color.fromHex((0x1000000 + (u(((t >> 16) - R1) * n) + R1) * 0x10000
            + (u(((t >> 8 & 0x00FF) - G1) * n) + G1) * 0x100
            + (u(((t & 0x0000FF) - B1) * n) + B1)).toString(16).slice(1));
    }
    /**
     * Get the WCAG contrast ratio between two colors
     *
     * @param {Color} c0
     * @param {Color} c1
     *
     * @returns {number}
     */
    static contrast(c0, c1) {
        const lum1 = c0.perceivedBrightness, lum2 = c1.perceivedBrightness, brightest = Math.max(lum1, lum2), darkest = Math.min(lum1, lum2);
        return (brightest + 0.05) / (darkest + 0.05);
    }
    /**
     * Normalize a hex color into a 6-digit hex value without leading hash symbol
     *
     * @param {string} source
     *
     * @returns {string}
     */
    static normalizeHex(source) {
        if (!source || !source.length || source.match(/[G-Zg-z]+/)) {
            return null;
        }
        let normalized = source;
        // Remove hex sign
        if (normalized.charAt(0) == '#') {
            normalized = normalized.substring(1, normalized.length);
        }
        // If it's now only one char we can't work with that
        if (normalized.length < 2) {
            return null;
        }
        // if exactly 2 characters, repeat them like ababab
        if (normalized.length == 2) {
            let a = normalized.charAt(0), b = normalized.charAt(1);
            normalized = a + b + a + b + a + b;
        }
        else if (normalized.length == 3) {
            // If exactly 3 characters, it's the short code. 17a -> 1177aa
            let r = normalized.charAt(0), g = normalized.charAt(1), b = normalized.charAt(2);
            normalized = r + r + g + g + b + b;
        }
        else if (normalized.length != 6) {
            // If it's not normalized by now it was invalid
            return null;
        }
        return normalized;
    }
    /**
     * Check whether two colors are similar to each other
     *
     * @param {Color}   color1
     * @param {Color}   color2
     * @param {number}  accuracy    How close the colors have to be, 0-1
     *
     * @returns {boolean}
     */
    static areSimilar(color1, color2, accuracy = 0.99) {
        const hueDiff = Math.abs(color1.hsl.h - color2.hsl.h), satDiff = Math.abs(color1.hsl.s - color2.hsl.s), lightDiff = Math.abs(color1.hsl.l - color2.hsl.l);
        const invertedAccuracy = 1 - accuracy;
        return hueDiff <= invertedAccuracy && satDiff <= invertedAccuracy && lightDiff <= invertedAccuracy;
    }
    toJSON() {
        if (this.rgbContainer) {
            return {
                ...this.rgb,
                alpha: this.alpha,
            };
        }
        else if (this.hslContainer) {
            return {
                ...this.hsl,
                alpha: this.alpha,
            };
        }
        else {
            return {
                hex: this.hex,
            };
        }
    }
    static fromJSON(json) {
        if (!json) {
            return null;
        }
        let parsed;
        if (typeof (json) == 'string') {
            parsed = JSON.parse(json);
        }
        else {
            parsed = json;
        }
        if (parsed.hex) {
            return Color.fromHex(parsed.hex);
        }
        else if (parsed.h) {
            return Color.fromHSL(parsed, parsed.alpha);
        }
        else if (parsed.r) {
            return Color.fromRGB(parsed, parsed.alpha);
        }
        else {
            return null;
        }
    }
    /* CONVERTERS */
    /**
     * Convert RGB to HSL
     * @param {RGB} rgb
     * @returns {HSL}
     */
    static rgbToHsl(rgb) {
        let { r, g, b } = rgb;
        r /= 255;
        g /= 255;
        b /= 255;
        let max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;
        if (max == min) {
            h = s = 0; // achromatic
        }
        else {
            let d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
            }
            h /= 6;
        }
        return { h, s, l };
    }
    /**
     * Convert rgb to a hex string without leading #
     * @param {RGB} rgb Color
     * @returns {string} without #
     */
    static rgbToHex(rgb) {
        return rgb.r.toString(16).padStart(2, '0') +
            rgb.g.toString(16).padStart(2, '0') +
            rgb.b.toString(16).padStart(2, '0');
    }
    /**
     * Convert hex (with or without leading #) to HSL
     * @param {string} hex
     * @returns {HSL}
     */
    static hexToHsl(hex) {
        if (!hex) {
            return {
                h: 0,
                s: 0,
                l: 0
            };
        }
        let rgb = Color.hexToRgb(hex);
        return Color.rgbToHsl(rgb);
    }
    /**
     * Convert HSL to RGB
     * @param {HSL} hsl
     * @returns {RGB}
     */
    static hslToRgb(hsl) {
        let r, g, b;
        if (hsl.s == 0) {
            r = g = b = hsl.l; // achromatic
        }
        else {
            let hue2rgb = (p, q, t) => {
                if (t < 0)
                    t += 1;
                if (t > 1)
                    t -= 1;
                if (t < 1 / 6)
                    return p + (q - p) * 6 * t;
                if (t < 1 / 2)
                    return q;
                if (t < 2 / 3)
                    return p + (q - p) * (2 / 3 - t) * 6;
                return p;
            };
            let q = hsl.l < 0.5 ? hsl.l * (1 + hsl.s) : hsl.l + hsl.s - hsl.l * hsl.s;
            let p = 2 * hsl.l - q;
            r = hue2rgb(p, q, hsl.h + 1 / 3);
            g = hue2rgb(p, q, hsl.h);
            b = hue2rgb(p, q, hsl.h - 1 / 3);
        }
        return {
            r: Math.round(r * 255),
            g: Math.round(g * 255),
            b: Math.round(b * 255),
        };
    }
    /**
     * Convert hex (with or without leading #) to RGB
     * @param {string} hex
     * @returns {RGB}
     */
    static hexToRgb(hex) {
        if (hex.charAt(0) == '#') {
            hex = hex.substring(1);
        }
        return {
            r: parseInt(hex.substring(0, 2), 16),
            g: parseInt(hex.substring(2, 4), 16),
            b: parseInt(hex.substring(4, 6), 16),
        };
    }
    /**
     * Detect the type of color of a string
     *
     * @param {string | undefined | null} str
     *
     * @returns {ColorType}
     */
    static detectType(str) {
        if (str === null || str === undefined) {
            return null;
        }
        let normalized = String(str);
        let firstThreeChars = normalized.length >= 3 ? normalized.substring(0, 3) : '', firstFourChars = normalized.length >= 4 ? normalized.substring(0, 4) : '';
        if (Color.normalizeHex(normalized)) {
            return ColorType.hex;
        }
        else if (firstFourChars === 'rgba') {
            return ColorType.rgba;
        }
        else if (firstThreeChars === 'rgb') {
            return ColorType.rgb;
        }
        else if (firstFourChars === 'hsla') {
            return ColorType.hsla;
        }
        else if (firstThreeChars === 'hsl') {
            return ColorType.hsl;
        }
        else {
            return ColorType.str;
        }
    }
}
Color.PERCEIVED_BRIGHTNESS_THRESHOLD = 155;
Color.WHITE = Color.fromHex('#ffffff');
Color.BLACK = Color.fromHex('#000000');
Color.TRANSPARENT = Color.fromHSL({ h: 0, s: 0, l: 0 }, 0);

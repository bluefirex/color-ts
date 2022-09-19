/**
 * An RGB color
 */
export interface RGB {
    /**
     * Red, 0 to 255
     */
    r: number;
    /**
     * Green, 0 to 255
     */
    g: number;
    /**
     * Blue, 0 to 255
     */
    b: number;
}
/**
 * An HSL color
 */
export interface HSL {
    /**
     * Hue, 0 to 1 relative to 360
     */
    h: number;
    /**
     * Saturation, 0 to 1
     */
    s: number;
    /**
     * Lightness, 0 to 1
     */
    l: number;
}
export declare enum ColorType {
    /**
     * Indicates a CSS-RGB string, e.g. "rgb(255, 128, 0)"
     */
    rgb = 0,
    /**
     * Indicates a CSS-RGBa string, e.g. "rgba(255, 128, 0, 0.42)"
     */
    rgba = 1,
    /**
     * Indicates a CSS-HSL string, e.g. "hsl(160, 96%, 42%)"
     */
    hsl = 2,
    /**
     * Indicates a CSS-HSLa string, e.g. "hsla(160, 96%, 42%, 0.1337)"
     */
    hsla = 3,
    /**
     * Indicates a hex representation (with or without leading #)
     */
    hex = 4,
    /**
     * Indicates a named color or some other browser-usable color definition, like CSS definitions á la url() or gradients
     */
    str = 5
}
/**
 * A class for working with colors
 * Can transform from and into different formats and perform
 * operations on it, e.g. darken, lighten
 *
 * @author bluefirex
 */
export declare class Color {
    static readonly PERCEIVED_BRIGHTNESS_THRESHOLD = 155;
    static readonly WHITE: Color;
    static readonly BLACK: Color;
    static readonly TRANSPARENT: Color;
    protected hexContainer: string | null;
    protected rgbContainer: RGB | null;
    protected hslContainer: HSL | null;
    alpha: number;
    /**
     * Create a color from a hex string, with or without leading #
     * @param {string} hex
     * @returns {Color}
     */
    static fromHex(hex: string): Color;
    /**
     * Create a color from an RGB object
     * @param {RGB}    rgb
     * @param {number} alpha
     *
     * @returns {Color}
     */
    static fromRGB(rgb: RGB, alpha?: number): Color;
    /**
     * Create a color from an HSL object
     * @param {HSL}    hsl
     * @param {number} alpha
     * @returns {Color}
     */
    static fromHSL(hsl: HSL, alpha?: number): Color;
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
    static fromString(str: string | Color | null): Color | null;
    /**
     * Get a random color (RGB 0, 0, 0 to RGB 255, 255, 255)
     *
     * @returns {Color}
     */
    static random(): Color;
    protected constructor(hex?: string | null, rgb?: RGB | null, hsl?: HSL | null, alpha?: number);
    /**
     * Darken the color by a certain percentage (0-100), just like in SCSS
     * @param percentage
     * @returns {Color}
     */
    darken(percentage: any): Color;
    /**
     * Lighten the color by a certain percentage (0-100), just like in SCSS
     *
     * @param percentage
     *
     * @returns {Color}
     */
    lighten(percentage: any): Color;
    /**
     * Saturate the color by a certain percentage (0-100), just like in SCSS
     *
     * @param percentage
     *
     * @returns {Color}
     */
    saturate(percentage: number): Color;
    /**
     * Desaturate the color by a certain percentage (0-100), just like in SCSS
     *
     * @param percentage
     *
     * @returns {Color}
     */
    desaturate(percentage: number): Color;
    /**
     * Shift the hue by a certain amount
     *
     * @param {number} amount   Amount to shift by, 0-1
     *
     * @returns {Color}
     */
    shiftHue(amount: number): Color;
    /**
     * Get a clone of this color with an alpha value
     *
     * @param {number}  alpha    between 0 and 1
     *
     * @returns {Color}
     */
    withAlpha(alpha?: number): Color;
    /**
     * Get a clone of this color with a specific hue
     *
     * @param {number}  hue     between 0 and 1
     *
     * @returns {Color}
     */
    withHue(hue?: number): Color;
    /**
     * Get a clone of this color with a specific saturation
     *
     * @param {number} saturation   between 0 and 1
     *
     * @returns {Color}
     */
    withSaturation(saturation?: number): Color;
    /**
     * Get a clone of this color with a specific lightness
     *
     * @param {number} lightness    between 0 and 1
     *
     * @returns {Color}
     */
    withLightness(lightness?: number): Color;
    /**
     * Mix this color with another color
     *
     * @param {Color} color     Other color
     * @param {number} weight   Weight between 0 and 100, like SCSS
     *
     * @returns {Color}
     */
    mixWith(color: Color, weight?: number): Color;
    /**
     * Get the WCAG contrast ratio to another color
     *
     * @param {Color} color
     *
     * @returns {number}
     */
    contrastTo(color: Color): number;
    clone(): Color;
    /**
     * Return the perceived brightness
     * The perceived brightness is the brightness value between 0 and 255
     * as perceived by a human in RGB colorspace with alpha = 1.
     *
     * @return {number}
     */
    get perceivedBrightness(): number;
    /**
     * Is this color darker than a defined limit according to human perception?
     * @returns {boolean}
     */
    isDark(): boolean;
    /**
     * Is this color lighter than a defined limit according to human perception?
     * @returns {boolean}
     */
    isLight(): boolean;
    /**
     * Does the color look red to a human?
     *
     * @returns {boolean}
     */
    isRedish(): boolean;
    /**
     * Does the color look green to a human?
     *
     * @returns {boolean}
     */
    isGreenish(): boolean;
    /**
     * Get as hex string without leading #
     * @returns {string}
     */
    get hex(): string;
    /**
     * Get as a CSS-suitable hex string
     *
     * @returns {string}
     */
    get cssHex(): string;
    /**
     * Get as RGB object
     * @returns {RGB}
     */
    get rgb(): RGB;
    /**
     * Get as a CSS-suitable rgba string
     *
     * @returns {string}
     */
    get cssRGBA(): string;
    /**
     * Get the RGB values as a numbers array [R, G, B]
     *
     * @returns {number[]}
     */
    get rgbArray(): number[];
    /**
     * Get as HSL object
     * @returns {HSL}
     */
    get hsl(): HSL;
    /**
     * Get as a CSS-suitable hsla string
     *
     * @returns {string}
     */
    get cssHSLA(): string;
    /**
     * Get the HSL values as a numbers array [H, S, L]
     *
     * @returns {number[]}
     */
    get hslArray(): number[];
    protected calculateHex(): void;
    protected calculateRGB(): void;
    protected calculateHSL(): void;
    /**
     * Mix two colors like SCSS' mix() function, ignores alpha completely
     *
     * @param color1 Hex Color 1
     * @param color2 Hex Color 2
     * @param weight Percentage from 0 to 100
     */
    static mix(color1: Color, color2: Color, weight?: number): Color;
    /**
     * Shade blend two colors with a given percentage
     * Thanks to http://stackoverflow.com/a/13542669/1486930 for this piece of code.
     * Ignores alpha.
     *
     * @param {Number}            p  Percentage to blend, negative means darken, positive means lighten
     * @param {Color}             c0 Color to blend
     * @param {Color = undefined} c1 Color to blend in, optional
     */
    static shadeBlend(p: any, c0: Color, c1: Color): Color;
    /**
     * Get the WCAG contrast ratio between two colors
     *
     * @param {Color} c0
     * @param {Color} c1
     *
     * @returns {number}
     */
    static contrast(c0: Color, c1: Color): number;
    /**
     * Normalize a hex color into a 6-digit hex value without leading hash symbol
     *
     * @param {string} source
     *
     * @returns {string}
     */
    static normalizeHex(source: string): string | null;
    toString: () => string;
    toJSON(): {
        [key: string]: string | number;
    };
    static fromJSON(json: string | {
        [key: string]: string | number;
    }): Color | null;
    /**
     * Convert RGB to HSL
     * @param {RGB} rgb
     * @returns {HSL}
     */
    static rgbToHsl(rgb: RGB): HSL;
    /**
     * Convert rgb to a hex string without leading #
     * @param {RGB} rgb Color
     * @returns {string} without #
     */
    static rgbToHex(rgb: RGB): string;
    /**
     * Convert hex (with or without leading #) to HSL
     * @param {string} hex
     * @returns {HSL}
     */
    static hexToHsl(hex: string): HSL;
    /**
     * Convert HSL to RGB
     * @param {HSL} hsl
     * @returns {RGB}
     */
    static hslToRgb(hsl: HSL): RGB;
    /**
     * Convert hex (with or without leading #) to RGB
     * @param {string} hex
     * @returns {RGB}
     */
    static hexToRgb(hex: string): RGB;
    /**
     * Detect the type of color of a string
     *
     * @param {string | undefined | null} str
     *
     * @returns {ColorType}
     */
    static detectType(str: string | undefined | null): ColorType;
}

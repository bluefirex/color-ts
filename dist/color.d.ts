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
/**
 * A YUV (YPbPr) color
 */
export interface YUV {
    /**
     * Luma, 16 to 235
     */
    y: number;
    /**
     * Blue minus luma, 16 to 240
     */
    u: number;
    /**
     * Red minus luma, 16 to 240
     */
    v: number;
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
     * Indicates a YUV representation, currently unused as yuv has no CSS string equivalent
     */
    yuv = 5,
    /**
     * Indicates a named color or some other browser-usable color definition, like CSS definitions á la url() or gradients
     */
    str = 6
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
    protected yuvContainer: YUV | null;
    alpha: number;
    /**
     * Create a color from a hex string, with or without leading #
     */
    static fromHex(hex: string): Color;
    /**
     * Create a color from an RGB object
     */
    static fromRGB(rgb: RGB, alpha?: number): Color;
    /**
     * Create a color from an HSL object
     */
    static fromHSL(hsl: HSL, alpha?: number): Color;
    /**
     * Create a color from an YUV object
     */
    static fromYUV(yuv: YUV, alpha?: number): Color;
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
     * Parse a numeric string or percentage into a number
     * e.g.: "0.1", "10%" -> 0.1
     */
    private static parseAlpha;
    /**
     * Get a random color (RGB 0, 0, 0 to RGB 255, 255, 255)
     *
     * @returns {Color}
     */
    static random(): Color;
    protected constructor(hex?: string | null, rgb?: RGB | null, hsl?: HSL | null, yuv?: YUV | null, alpha?: number);
    /**
     * Darken the color by a certain percentage (0-100), just like in SCSS
     */
    darken(percentage: number): Color;
    /**
     * Lighten the color by a certain percentage (0-100), just like in SCSS
     */
    lighten(percentage: number): Color;
    /**
     * Check if this color is lighter than the passed color
     */
    isLighterThan(color: Color): boolean;
    /**
     * Check if this color is darker than the passed color
     */
    isDarkerThan(color: Color): boolean;
    /**
     * Saturate the color by a certain percentage (0-100), just like in SCSS
     */
    saturate(percentage: number): Color;
    /**
     * Desaturate the color by a certain percentage (0-100), just like in SCSS
     */
    desaturate(percentage: number): Color;
    /**
     * Shift the hue by an amount between 0-1
     */
    shiftHue(amount: number): Color;
    /**
     * Get a clone of this color with an alpha value between 0 and 1
     */
    withAlpha(alpha?: number): Color;
    /**
     * Get a clone of this color with a specific hue between 0 and 1
     */
    withHue(hue?: number): Color;
    /**
     * Get a clone of this color with a specific saturation between 0 and 1
     */
    withSaturation(saturation?: number): Color;
    /**
     * Get a clone of this color with a specific lightness between 0 and 1
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
     */
    contrastTo(color: Color): number;
    /**
     * Clone this color
     */
    clone(): Color;
    /**
     * Return the perceived brightness
     * The perceived brightness is the brightness value between 0 and 255
     * as perceived by a human in RGB colorspace with alpha = 1.
     */
    get perceivedBrightness(): number;
    /**
     * Is this color darker than a defined limit according to human perception?
     */
    isDark(): boolean;
    /**
     * Is this color lighter than a defined limit according to human perception?
     */
    isLight(): boolean;
    /**
     * Does the color look red to a human?
     */
    isRedish(): boolean;
    /**
     * Does the color look green to a human?
     */
    isGreenish(): boolean;
    /**
     * Is this color white?
     */
    isWhite(): boolean;
    /**
     * Is this color black?
     */
    isBlack(): boolean;
    /**
     * Is this color similar to another color?
     *
     * @param {Color}   color       Color to compare to
     * @param {number}  accuracy    How close the colors have to be, 0-1
     *
     * @returns {boolean}
     */
    isSimilarTo(color: Color, accuracy?: number): boolean;
    /**
     * Get as hex string without leading #
     */
    get hex(): string;
    /**
     * Get as a CSS-suitable hex string
     */
    get cssHex(): string;
    /**
     * Get as RGB object
     */
    get rgb(): RGB;
    /**
     * Get as a CSS-suitable rgba string
     */
    get cssRGBA(): string;
    /**
     * Get the RGB values as a numbers array [R, G, B]
     */
    get rgbArray(): [number, number, number];
    /**
     * Get the RGB values as a string "R, G, B"
     * Useful e.g. for v-bind in Vite, like this:
     * rgba(v-bind("someColor.rgbString"), 0.5)
     */
    get rgbString(): string;
    /**
     * Get as HSL object
     */
    get hsl(): HSL;
    /**
     * Get as a CSS-suitable hsla string
     */
    get cssHSLA(): string;
    /**
     * Get the HSL values as a numbers array [H, S, L]
     */
    get hslArray(): [number, number, number];
    /**
     * Get as YUV object
     */
    get yuv(): YUV;
    protected calculateHex(): void;
    protected calculateRGB(): void;
    protected calculateHSL(): void;
    protected calculateYUV(): void;
    /**
     * Mix two colors like SCSS' mix() function, ignores alpha completely
     *
     * @param {Color}   color1  Hex Color 1
     * @param {Color}   color2  Hex Color 2
     * @param {number}  weight  Percentage from 0 to 100
     */
    static mix(color1: Color, color2: Color, weight?: number): Color;
    /**
     * Shade blend two colors with a given percentage
     * Thanks to http://stackoverflow.com/a/13542669/1486930 for this piece of code.
     * Ignores alpha.
     *
     * @param {Number}  p   Percentage to blend, negative means darken, positive means lighten
     * @param {Color}   c0  Color to blend
     * @param {Color}   c1  Color to blend in, optional
     */
    static shadeBlend(p: number, c0: Color, c1: Color): Color;
    /**
     * Get the WCAG contrast ratio between two colors
     */
    static contrast(c0: Color, c1: Color): number;
    /**
     * Normalize a hex color into a 6-digit hex value without leading hash symbol
     */
    static normalizeHex(source: string): string | null;
    /**
     * Check whether two colors are similar to each other, based on their YUV representation
     *
     * @param {Color}   color1
     * @param {Color}   color2
     * @param {number}  accuracy    How close the colors have to be, 0-1
     *
     * @returns {boolean}
     */
    static areSimilar(color1: Color, color2: Color, accuracy?: number): boolean;
    /**
     * Convert this color into a string
     * Uses whatever format is available in this priority:
     * - cssHSLA
     * - cssRGBA
     * - cssHex
     */
    toString: () => string;
    /**
     * Convert this color into an object for use as JSON
     * Uses whatever format is available in this priority:
     * - HSLA
     * - RGBA
     * - Hex
     *
     * Use {@link Color.fromJSON} to restore from JSON
     */
    toJSON(): {
        [key: string]: string | number;
    };
    /**
     * Restore an instance of {@link Color} from a JSON object created by {@link Color.toJSON}
     */
    static fromJSON(json: string | Record<string, string | number>): Color | null;
    /**
     * Convert RGB to HSL
     */
    static rgbToHsl(rgb: RGB): HSL;
    /**
     * Convert rgb to a hex string without leading #
     */
    static rgbToHex(rgb: RGB): string;
    /**
     * Convert hex (with or without leading #) to HSL
     */
    static hexToHsl(hex: string): HSL;
    /**
     * Convert HSL to RGB
     */
    static hslToRgb(hsl: HSL): RGB;
    /**
     * Convert hex (with or without leading #) to RGB
     */
    static hexToRgb(hex: string): RGB;
    /**
     * Convert YUV to RGB
     * Thanks to https://stackoverflow.com/a/17934865/1486930
     */
    static yuvToRgb(yuv: YUV): RGB;
    /**
     * Convert RGB to YUV
     * Thanks to https://stackoverflow.com/a/17934865/1486930
     */
    static rgbToYuv(rgb: RGB): YUV;
    /**
     * Detect the type of color of a string
     *
     * @param {string | undefined | null} str
     *
     * @returns {ColorType}
     */
    static detectType(str: string | undefined | null): ColorType;
    private static modulo;
}

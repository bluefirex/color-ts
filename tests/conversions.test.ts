import { describe, it, expect } from 'vitest'
import { Color } from '../src'

const examples: any[] = [
	{
		rgb: { r: 255, g: 0, b: 0 },
		yuv: { y: 16.257, u: 127.852, v: 128.439 },
		hsl: { h: 0, s: 1, l: 0.5 },
		hex: 'ff0000',
	},
	{
		rgb: { r: 0, g: 255, b: 0 },
		yuv: { y: 16.504, u: 127.709, v: 127.632 },
		hsl: { h: 0.3333333333333333, s: 1, l: 0.5 },
		hex: '00ff00',
	},
	{
		rgb: { r: 0, g: 0, b: 255 },
		yuv: { y: 16.098, u: 128.439, v: 127.929 },
		hsl: { h: 0.6666666666666666, s: 1, l: 0.5 },
		hex: '0000ff'
	},
	{
		rgb: { r: 141, g: 187, b: 54 },
		yuv: { y: 16.53245882352941, u: 127.7977294117647, v: 127.95783921568628 },
		hsl: { h: 0.22431077694235588, s: 0.5518672199170124, l: 0.4725490196078431 },
		hex: '8dbb36'
	}
]

// Hex Source
describe('hex->rgb', () => {
	it('should convert Hex to RGB', () => {
		for (const example of examples) {
			const result = Color.hexToRgb(example.hex)
			expect(result, example.hex).toEqual(example.rgb)
		}
		
		// Try with hash in front, too
		expect(Color.hexToRgb('#ffffff')).toEqual({
			r: 255,
			g: 255,
			b: 255
		})
	})
})

describe('hex->hsl', () => {
	it('should convert Hex to HSL', () => {
		for (const example of examples) {
			const result = Color.hexToHsl(example.hex)
			expect(result, example.hex).toEqual(example.hsl)
		}
	})
})

// RGB Source
describe('rgb->hex', () => {
	it('should convert RGB to Hex (without #)', () => {
		for (const example of examples) {
			const result = Color.rgbToHex(example.rgb)
			expect(result, example.rgb).toEqual(example.hex)
		}
	})
})

describe('rgb->hsl', () => {
	it('should convert RGB to HSL', () => {
		for (const example of examples) {
			const result = Color.rgbToHsl(example.rgb)
			expect(result, example.rgb).toEqual(example.hsl)
		}
	})
})

describe('rgb->yuv', () => {
	it('should convert RGB to YUV', () => {
		for (const example of examples) {
			const result = Color.rgbToYuv(example.rgb)
			expect(result, example.rgb).toEqual(example.yuv)
		}
	})
})

// HSL Source
describe('hsl->rgb', () => {
	it('should convert HSL to RGB', () => {
		for (const example of examples) {
			const result = Color.hslToRgb(example.hsl)
			expect(result, example.hsl).toEqual(example.rgb)
		}
	})
})

// YUV Source
describe('yuv->rgb', () => {
	it('should convert YUV to RGB', () => {
		for (const example of examples) {
			const result = Color.yuvToRgb(example.yuv)
			expect(result, example.yuv).toEqual(example.rgb)
		}
	})
})

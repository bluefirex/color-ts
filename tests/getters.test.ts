import { expect, describe, it } from 'vitest'
import { Color, YUV } from '../src'

describe('cssHex', () => {
	it('should return a CSS-compatible hex string', () => {
		const color = Color.fromHex('#17a')
		expect(color.cssHex).toBe('#1177aa')
	})
})

describe('cssHSLA', () => {
	it('should return a CSS-compatible hsla string', () => {
		const color = Color.fromHex('#17a')
		expect(color.cssHSLA).toBe('hsla(200, 81.8182%, 36.6667%, 1)')
	})
})

describe('hslArray', () => {
	it('should return an array of the form [H, S, L|', () => {
		const color = Color.fromHex('#17a')
		expect(color.hslArray).toEqual([0.5555555555555555, 0.8181818181818182, 0.36666666666666664])
	})
})

describe('cssRGBA', () => {
	it('should return a CSS-compatible rgba string', () => {
		const color = Color.fromHex('#17a')
		expect(color.cssRGBA).toBe('rgba(17, 119, 170, 1)')
	})
})

describe('rgbArray', () => {
	it('should return an array of the form [R, G, B|', () => {
		const color = Color.fromHex('#17a')
		expect(color.rgbArray).toEqual([17, 119, 170])
	})
})

describe('rgbString', () => {
	it('should return a string of the form "R, G, B"', () => {
		const color = Color.fromHex('#17a')
		expect(color.rgbString).toEqual('17, 119, 170')
	})
})

import { describe, it, expect } from 'vitest'
import { Color } from '../src'

describe('mix', () => {
	it('should mix opaque black and white with 50% to grey', () => {
		const c1 = Color.fromString('#000')
		const c2 = Color.fromString('#fff')
		const mixed = c1.mixWith(c2, 50)
		
		expect(mixed).toBeInstanceOf(Color)
		expect(mixed.rgb.r).toEqual(127)
		expect(mixed.rgb.g).toEqual(127)
		expect(mixed.rgb.b).toEqual(127)
		expect(mixed.alpha).toEqual(1.0)
	})
	
	it('should mix transparent black and opaque black at 25%', () => {
		const c1 = Color.fromString('#000').withAlpha(1.0)
		const c2 = Color.fromString('#000').withAlpha(0.0)
		const mixed = c1.mixWith(c2, 25)
		
		expect(mixed).toBeInstanceOf(Color)
		expect(mixed.rgb.r).toEqual(0)
		expect(mixed.rgb.g).toEqual(0)
		expect(mixed.rgb.b).toEqual(0)
		expect(mixed.alpha).toEqual(0.25)
	})
	
	it('should mix transparent black and opaque black at 50%', () => {
		const c1 = Color.fromString('#000').withAlpha(1.0)
		const c2 = Color.fromString('#000').withAlpha(0.0)
		const mixed = c1.mixWith(c2, 50)
		
		expect(mixed).toBeInstanceOf(Color)
		expect(mixed.rgb.r).toEqual(0)
		expect(mixed.rgb.g).toEqual(0)
		expect(mixed.rgb.b).toEqual(0)
		expect(mixed.alpha).toEqual(0.5)
	})
	
	it('should mix transparent black and opaque black at 75%', () => {
		const c1 = Color.fromString('#000').withAlpha(1.0)
		const c2 = Color.fromString('#000').withAlpha(0.0)
		const mixed = c1.mixWith(c2, 75)
		
		expect(mixed).toBeInstanceOf(Color)
		expect(mixed.rgb.r).toEqual(0)
		expect(mixed.rgb.g).toEqual(0)
		expect(mixed.rgb.b).toEqual(0)
		expect(mixed.alpha).toEqual(0.75)
	})
	
	it('should mix green and red', () => {
		const c1 = Color.fromString('#0000ff').withAlpha(1.0)
		const c2 = Color.fromString('#ff0000').withAlpha(1.0)
		const mixed = c1.mixWith(c2, 50)
		
		expect(mixed).toBeInstanceOf(Color)
		expect(mixed.rgb.r).toEqual(127)
		expect(mixed.rgb.g).toEqual(0)
		expect(mixed.rgb.b).toEqual(127)
		expect(mixed.alpha).toEqual(1.0)
	})
	
	it('should mix transparent green and transparent blue', () => {
		const c1 = Color.fromString('#00ff00').withAlpha(0.0)
		const c2 = Color.fromString('#0000ff').withAlpha(0.0)
		const mixed = c1.mixWith(c2, 50)
		
		expect(mixed).toBeInstanceOf(Color)
		expect(mixed.rgb.r).toEqual(0)
		expect(mixed.rgb.g).toEqual(127)
		expect(mixed.rgb.b).toEqual(127)
		expect(mixed.alpha).toEqual(0.0)
	})
})

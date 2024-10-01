import { expect, describe, it } from 'vitest'
import { Color, YUV } from '../src'

describe('contrastTo', () => {
	it('should return >=10 for black and white', () => {
		const c1 = Color.BLACK
		const c2 = Color.WHITE
		expect(c1.contrastTo(c2)).toBeGreaterThanOrEqual(10)
	})
	
	it('should return between 2 and 3 for #17a and white', () => {
		const c1 = Color.fromHex('#17a')
		const c2 = Color.WHITE
		
		expect(c1.contrastTo(c2))
			.toBeGreaterThanOrEqual(2)
			.toBeLessThanOrEqual(3)
	})
	
	it('should return between 0 and 1 for equal colors', () => {
		const c1 = Color.fromHex('#17a')
		const c2 = Color.fromHex('#e0e0e0')
		
		expect(c1.contrastTo(c1), c1.cssHex)
			.toBeGreaterThanOrEqual(0)
			.toBeLessThanOrEqual(1)
		
		expect(c2.contrastTo(c2), c2.cssHex)
			.toBeGreaterThanOrEqual(0)
			.toBeLessThanOrEqual(1)
	})
})

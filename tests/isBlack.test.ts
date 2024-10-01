import { describe, it, expect } from 'vitest'
import { Color } from '../src'

describe('isBlack', () => {
	it('should return true for black colors', () => {
		const examples = [
			Color.fromString('#000'),
			Color.fromString('rgba(0, 0, 0, 0.5)'),
			Color.fromString('hsl(0, 0%, 0%)'),
			Color.fromString('#fff').darken(100)
		]
		
		for (let color of examples) {
			expect(color.isBlack(), color.cssHex).toEqual(true)
		}
	})
	
	it('should return false for non-black colors', () => {
		const examples = [
			Color.fromString('#fff'),
			Color.fromString('#17a'),
			Color.fromString('hsl(24, 0.5%, 1.5%)'),
			Color.fromString('#000').lighten(10)
		]
		
		for (let color of examples) {
			expect(color.isBlack(), color.cssHex).toEqual(false)
		}
	})
})

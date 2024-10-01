import { describe, it, expect } from 'vitest'
import { Color } from '../src'

describe('isWhite', () => {
	it('should return true for white colors', () => {
		const examples = [
			Color.fromString('#fff'),
			Color.fromString('rgba(255, 255, 255, 0.5)'),
			Color.fromString('hsl(0, 0%, 100%)'),
			Color.fromString('#000').lighten(100)
		]
		
		for (let color of examples) {
			expect(color.isWhite(), color.cssHex).toEqual(true)
		}
	})
	
	it('should return false for non-white colors', () => {
		const examples = [
			Color.fromString('#000'),
			Color.fromString('#17a'),
			Color.fromString('hsl(24, 99%, 99%)'),
			Color.fromString('#fff').darken(10)
		]
		
		for (let color of examples) {
			expect(color.isWhite(), color.cssHex).toEqual(false)
		}
	})
})

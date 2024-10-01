import { describe, it, expect } from 'vitest'
import { Color } from '../src'

const darkColors = [
	'#000',
	'#2b2b2b',
	'#777',
	'#17a'
]

const lightColors = [
	'#fff',
	'#e0e0e0',
	'#99aaff',
]

describe('isDark', () => {
	it('should return true for dark colors', () => {
		for (let example of darkColors) {
			expect(Color.fromString(example).isDark()).toBe(true)
		}
	})
	
	it('should return false for light colors', () => {
		for (let example of lightColors) {
			expect(Color.fromString(example).isDark()).toBe(false)
		}
	})
})

describe('isLight', () => {
	it('should return true for light colors', () => {
		for (let example of lightColors) {
			expect(Color.fromString(example).isLight()).toBe(true)
		}
	})
	
	it('should return false for dark colors', () => {
		for (let example of darkColors) {
			expect(Color.fromString(example).isLight()).toBe(false)
		}
	})
})

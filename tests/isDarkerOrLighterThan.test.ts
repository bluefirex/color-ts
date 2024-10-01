import { expect, describe, it } from 'vitest'
import { Color, YUV } from '../src'

const examples = [
	{
		c1: Color.fromHex('#000'),
		c2: Color.fromHex('#fff'),
	},
	{
		c1: Color.fromHex('#272727'),
		c2: Color.fromHex('#c0c0c0'),
	},
	{
		c1: Color.fromHex('#17a'),
		c2: Color.fromHex('#1489c4'),
	},
]

describe('isDarkerThan', () => {
	it('should return true if the passed color is lighter', () => {
		for (let example of examples) {
			expect(example.c1.isDarkerThan(example.c2), example.c1.cssHex).toBe(true)
		}
	})
	
	it('should return false if the passed color is not lighter', () => {
		for (let example of examples) {
			expect(example.c2.isDarkerThan(example.c1), example.c2.cssHex).toBe(false)
		}
	})
})

describe('isLighterThan', () => {
	it('should return true if the passed color is darker', () => {
		for (let example of examples) {
			expect(example.c2.isLighterThan(example.c1), example.c2.cssHex).toBe(true)
		}
	})
	
	it('should return false if the passed color is not darker', () => {
		for (let example of examples) {
			expect(example.c1.isLighterThan(example.c2), example.c1.cssHex).toBe(false)
		}
	})
})

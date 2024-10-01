import { describe, it, expect } from 'vitest'
import { Color } from '../src'

describe('areSimilar', () => {
	it('should return true for similar colors', () => {
		const examples = [
			{
				c1: Color.fromString('#000'),
				c2: Color.fromString('#000'),
				accuracy: 1.0
			},
			{
				c1: Color.fromString('#000'),
				c2: Color.fromString('#010101'),
				accuracy: 0.9
			},
			{
				c1: Color.fromString('#000'),
				c2: Color.fromString('#050505'),
				accuracy: 0.9
			},
			{
				c1: Color.fromString('#000'),
				c2: Color.fromString('#080808'),
				accuracy: 0.9
			},
			{
				c1: Color.fromString('#ff0000'),
				c2: Color.fromString('#fe0000'),
				accuracy: 0.9
			},
			{
				c1: Color.fromString('#ff0000'),
				c2: Color.fromString('#aa0000'),
				accuracy: 0.8
			},
			{
				c1: Color.fromString('#0000ff'),
				c2: Color.fromString('#000055'),
				accuracy: 0.6
			},
		]
		
		for (let example of examples) {
			expect(example.c1.isSimilarTo(example.c2, example.accuracy)).toBe(true)
		}
	})
	
	it('should return false for non-similar colors', () => {
		const examples = [
			{
				c1: Color.fromString('#000'),
				c2: Color.fromString('#080808'),
				accuracy: 1.0
			},
			{
				c1: Color.fromString('#000'),
				c2: Color.fromString('#090909'),
				accuracy: 0.98
			},
			{
				c1: Color.fromString('#ff00ff'),
				c2: Color.fromString('#00ff55'),
				accuracy: 0.3
			},
			{
				c1: Color.fromString('#ff0000'),
				c2: Color.fromString('#00ffff'),
				accuracy: 0.2
			},
			{
				c1: Color.fromString('#000'),
				c2: Color.fromString('#fff'),
				accuracy: 0.15
			}
		]
		
		for (let example of examples) {
			expect(example.c1.isSimilarTo(example.c2, example.accuracy)).toBe(false)
		}
	})
})

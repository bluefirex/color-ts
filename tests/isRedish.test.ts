import { describe, it, expect } from 'vitest'
import { Color } from '../src'

describe('isRedish', () => {
	it('should return true for red-ish colors', () => {
		const examples = [
			'hsl(340, 100%, 50%)',
			'hsl(350, 100%, 50%)',
			'hsl(0, 100%, 50%)',
			'hsl(20, 100%, 50%)',
			'hsl(22, 100%, 50%)',
			
			'hsl(0, 100%, 90%)',
			'hsl(0, 100%, 80%)',
			'hsl(0, 100%, 70%)',
			'hsl(0, 100%, 60%)',
			'hsl(0, 100%, 25%)',
			'hsl(0, 100%, 20%)',
			'hsl(0, 50%, 20%)',
			'hsl(0, 30%, 20%)',
		]
		
		for (let example of examples) {
			expect(Color.fromString(example).isRedish()).toBe(true)
		}
	})
	
	it('should return false for other colors', () => {
		const examples = [
			'hsl(40, 100%, 50%)',
			'hsl(60, 100%, 50%)',
			'hsl(80, 100%, 50%)',
			'hsl(100, 100%, 50%)',
			'hsl(120, 100%, 50%)',
			'hsl(140, 100%, 50%)',
			'hsl(160, 100%, 50%)',
			'hsl(180, 100%, 50%)',
			'hsl(200, 100%, 50%)',
			'hsl(220, 100%, 50%)',
			'hsl(240, 100%, 50%)',
			'hsl(260, 100%, 50%)',
			'hsl(280, 100%, 50%)',
			'hsl(300, 100%, 50%)',
			'hsl(320, 100%, 50%)',
			'hsl(330, 100%, 50%)',
			
			'hsl(0, 100%, 99%)',
			'hsl(0, 100%, 100%)',
			'hsl(0, 5%, 80%)',
			'hsl(0, 5%, 60%)',
			'hsl(0, 5%, 40%)',
			'hsl(0, 5%, 20%)',
			'hsl(0, 5%, 0%)',
		]
		
		for (let example of examples) {
			expect(Color.fromString(example).isRedish()).toBe(false)
		}
	})
})

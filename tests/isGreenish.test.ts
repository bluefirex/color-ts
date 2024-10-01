import { describe, it, expect } from 'vitest'
import { Color } from '../src'

describe('isGreenish', () => {
	it('should return true for green-ish colors', () => {
		const examples = [
			'hsl(90, 100%, 50%)',
			'hsl(100, 100%, 50%)',
			'hsl(120, 100%, 50%)',
			'hsl(130, 100%, 50%)',
			'hsl(140, 100%, 50%)',
			'hsl(150, 100%, 50%)',
			'hsl(160, 100%, 50%)',
		]
		
		for (let example of examples) {
			expect(Color.fromString(example).isGreenish(), example).toBe(true)
		}
	})
	
	it('should return false for other colors', () => {
		const examples = [
			'hsl(180, 100%, 50%)',
			'hsl(200, 100%, 50%)',
			'hsl(220, 100%, 50%)',
			'hsl(240, 100%, 50%)',
			'hsl(260, 100%, 50%)',
			'hsl(280, 100%, 50%)',
			'hsl(300, 100%, 50%)',
			'hsl(320, 100%, 50%)',
			'hsl(330, 100%, 50%)',
			'hsl(350, 100%, 50%)',
			'hsl(00, 100%, 50%)',
			'hsl(20, 100%, 50%)',
			'hsl(40, 100%, 50%)',
			'hsl(60, 100%, 50%)',
			'hsl(80, 100%, 50%)',
			
			'hsl(120, 100%, 99%)',
			'hsl(120, 100%, 100%)',
			'hsl(120, 5%, 80%)',
			'hsl(120, 5%, 60%)',
			'hsl(120, 5%, 40%)',
			'hsl(120, 5%, 20%)',
			'hsl(120, 5%, 0%)',
		]
		
		for (let example of examples) {
			expect(Color.fromString(example).isGreenish(), example).toBe(false)
		}
	})
})

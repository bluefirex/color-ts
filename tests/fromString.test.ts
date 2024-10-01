import { describe, it, expect } from 'vitest'
import { Color } from '../src'

describe('fromString', () => {
	it('should parse hex colors', () => {
		const examples = {
			'#000': '#000000',
			'#fff': '#ffffff',
			'#f0f0f0': '#f0f0f0',
			'#17a': '#1177aa',
			'#17a7df': '#17a7df'
		}
		
		for (let source in examples) {
			const target = examples[source]
			const color = Color.fromString(source)
			
			expect(color, source).toBeInstanceOf(Color)
			expect(color.cssHex, source).toEqual(target)
		}
	})
	
	it('should parse rgb colors', () => {
		const examples = {
			'rgb(0, 0, 0)': '#000000',
			'rgb(255, 255, 255)': '#ffffff',
			'rgb(240, 240, 240)': '#f0f0f0',
			'rgb(17, 119, 170)': '#1177aa',
			'rgb(23, 167, 223)': '#17a7df'
		}
		
		for (let source in examples) {
			const target = examples[source]
			const color = Color.fromString(source)
			
			expect(color, source).toBeInstanceOf(Color)
			expect(color.cssHex, source).toEqual(target)
		}
	})
	
	it('should parse rgba colors', () => {
		const examples = {
			'rgba(0, 0, 0, 1)': 'rgba(0, 0, 0, 1)',
			'rgba(255, 255, 255, 0.5)': 'rgba(255, 255, 255, 0.5)',
			'rgba(240, 240, 240, 0.25)': 'rgba(240, 240, 240, 0.25)',
			'rgba(17, 119, 170, 10%)': 'rgba(17, 119, 170, 0.1)',
			'rgba(23, 167, 223, 0.999)': 'rgba(23, 167, 223, 0.999)'
		}
		
		for (let source in examples) {
			const target = examples[source]
			const color = Color.fromString(source)
			
			expect(color, source).toBeInstanceOf(Color)
			expect(color.cssRGBA, source).toEqual(target)
		}
	})
	
	it('should parse hsl colors', () => {
		const examples = {
			'hsl(0, 0%, 0%)': 'hsla(0, 0%, 0%, 1)',
			'hsl(0, 100%, 100%)': 'hsla(0, 100%, 100%, 1)',
			'hsl(0, 0%, 94%)': 'hsla(0, 0%, 94%, 1)',
			'hsl(204, 69%, 36.7%)': 'hsla(204, 69%, 36.7%, 1)',
			'hsl(196, 82%, 48%)': 'hsla(196, 82%, 48%, 1)'
		}
		
		for (let source in examples) {
			const target = examples[source]
			const color = Color.fromString(source)
			
			expect(color, source).toBeInstanceOf(Color)
			expect(color.cssHSLA, source).toEqual(target)
		}
	})
	
	it('should parse hsla colors', () => {
		const examples = {
			'hsla(0, 0%, 0%, 0.5)': 'hsla(0, 0%, 0%, 0.5)',
			'hsla(0, 100%, 100%, 0.3)': 'hsla(0, 100%, 100%, 0.3)',
			'hsla(0, 0%, 94%, 20%)': 'hsla(0, 0%, 94%, 0.2)',
			'hsla(204, 69%, 36.7%, 0.5)': 'hsla(204, 69%, 36.7%, 0.5)',
			'hsla(196, 82%, 48%, 1.0)': 'hsla(196, 82%, 48%, 1)'
		}
		
		for (let source in examples) {
			const target = examples[source]
			const color = Color.fromString(source)
			
			expect(color, source).toBeInstanceOf(Color)
			expect(color.cssHSLA, source).toEqual(target)
		}
	})
	
	it('should return the input if it is a Color', () => {
		const color = Color.fromString('#ff0000')
		expect(Color.fromString(color)).toBe(color)
	})
	
	it('should return null for invalid inputs', () => {
		const examples: string[] = [
			null,
			undefined,
			'whaaat',
			3.141,
			Math.MAX_SAFE_INTEGER,
			{},
			[]
		]
		
		for (let example of examples) {
			expect(Color.fromString(example)).toBeNull()
		}
	})
})

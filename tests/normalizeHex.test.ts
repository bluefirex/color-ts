import { describe, it, expect } from 'vitest'
import { Color } from '../src'

describe('normalizeHex', () => {
	it('should remove a hash in front', () => {
		const examples = {
			'#272727': '272727',
			'#ffffff': 'ffffff',
			'#000000': '000000',
			'#7f7f7f': '7f7f7f',
		}
		
		for (let example in examples) {
			expect(Color.normalizeHex(example)).toEqual(examples[example])
		}
	})
	
	it('should convert ab to ababab', () => {
		const examples = {
			'27': '272727',
			'ff': 'ffffff',
			'00': '000000',
			'7f': '7f7f7f',
		}
		
		for (let example in examples) {
			expect(Color.normalizeHex(example)).toEqual(examples[example])
		}
	})
	
	it('should convert abb to aabbcc', () => {
		const examples = {
			'17a': '1177aa',
			'000': '000000',
			'fff': 'ffffff',
			'0fc': '00ffcc',
		}
		
		for (let example in examples) {
			expect(Color.normalizeHex(example)).toEqual(examples[example])
		}
	})
	
	it('should leave abcdef alone', () => {
		const examples = {
			'17a7df': '17a7df',
			'000000': '000000',
			'ffffff': 'ffffff',
			'00ffcc': '00ffcc',
		}
		
		for (let example in examples) {
			expect(Color.normalizeHex(example)).toEqual(examples[example])
		}
	})
	
	it('should return null for invalid inputs', () => {
		const examples = [
			null,
			undefined,
			'',
			'1',
			{},
			[],
			'##27'
		]
		
		for (let example of examples) {
			expect(Color.normalizeHex(example)).toBeNull()
		}
	})
})

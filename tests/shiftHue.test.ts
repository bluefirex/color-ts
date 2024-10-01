import { describe, it, expect } from 'vitest'
import { Color } from '../src'

describe('shiftHue', () => {
	it('should shift the hue by the specified amount', () => {
		const c1 = Color.fromHex('#0000ff').shiftHue(0.3)
		expect(c1.hsl.h).toEqual(0.9666666666666666)
		
		const c2 = Color.fromHex('#0000ff').shiftHue(-0.3)
		expect(c2.hsl.h).toEqual(0.3666666666666667)
		
		const c3 = Color.fromHex('#0ff0ff').shiftHue(-0.1)
		expect(c3.hsl.h).toEqual(0.41041666666666665)
	})
	
	it('should loop back to 0 if it exceeds -0 or 1', () => {
		const c1 = Color.fromHex('#ff0000').shiftHue(0.5)
		expect(c1.hsl.h).toEqual(0.5)
		
		const c2 = Color.fromHex('#ff0000').shiftHue(-0.3)
		expect(c2.hsl.h).toEqual(0.7)
	})
})

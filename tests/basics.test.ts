import { expect, describe, it } from 'vitest'
import { Color, YUV } from '../src'

describe('Basics', () => {
	it('should throw if no color components are set', () => {
		expect(() => {
			new (Color as any)()
		}).toThrow('One component must be set')
	})
	
	it('should create a color from YUV', () => {
		const yuv: YUV = {
			y: 16,
			u: 100,
			v: 100
		}
		
		const color = Color.fromYUV(yuv)
		expect(color.yuv).toEqual(yuv)
	})
	
	it('should create a color from hex', () => {
		const hex = '#17a7df'
		
		const color = Color.fromHex(hex)
		expect(color.cssHex).toEqual(hex)
	})
	
	it('should fail to create a color from an invalid hex', () => {
		const hex = '##1'
		
		expect(() => {
			Color.fromHex(hex)
		}).toThrow('Invalid hex value: ' + hex)
	})
})

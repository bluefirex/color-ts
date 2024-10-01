import { describe, it, expect } from 'vitest'
import { Color } from '../src'

describe('toJSON', () => {
	it('should return an object suitable for JSON', () => {
		const color = Color.fromHex('#1177aa')
		// Try to encode and make sure no error is thrown
		JSON.stringify(color)
	})
})

describe('fromJSON', () => {
	it('should return a Color from a JSON object', () => {
		const color = Color.fromHex('#1177aa')
		const json = color.toJSON()
		expect(Color.fromJSON(json)).toBeInstanceOf(Color)
	})
	
	it('should return a Color from a JSON string', () => {
		const color = Color.fromHex('#1177aa')
		const json = JSON.stringify(color.toJSON())
		expect(Color.fromJSON(json).cssHex).toEqual(color.cssHex)
	})
	
	it('should return null ifor invalid JSON', () => {
		expect(Color.fromJSON(null)).toBeNull()
        expect(Color.fromJSON('')).toBeNull()
	})
})

describe('toJSON -> fromJSON', () => {
	it('should result in the same color', () => {
		const color = Color.fromHex('#1177aa')
        const json = color.toJSON()
        const newColor = Color.fromJSON(json)
		
        expect(newColor.cssHex).toEqual(color.cssHex)
        expect(newColor.cssRGBA).toEqual(color.cssRGBA)
        expect(newColor.cssHSLA).toEqual(color.cssHSLA)
	})
})

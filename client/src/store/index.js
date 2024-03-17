import { proxy } from 'valtio'

const state = proxy({
	intro: true,
	color: '#811C43',
	isLogoTexture: true,
	isFullTexture: false,
	logoDecal: './under_armour.png',
	fullDecal: './under_armour.png',
})
export default state

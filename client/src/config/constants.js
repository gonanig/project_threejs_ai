import { swatch, fileIcon, ai, logoShirt, stylishShirt } from '../assets'

export const EditorTabs = [
	{
		name: 'colorpicker',
		icon: swatch,
	},
	{
		name: 'filepicker',
		icon: fileIcon,
	},
	{
		name: 'aipicker',
		icon: ai,
	},
]

export const FilterTabs = [
	{
		name: 'logoShirt',
		icon: logoShirt,
		tip: 'Click here for style or delete logo',
	},
	{
		name: 'stylishShirt',
		icon: stylishShirt,
		tip: 'Click here for style full shirt',
	},
]

export const DecalTypes = {
	logo: {
		stateProperty: 'logoDecal',
		filterTab: 'logoShirt',
	},
	full: {
		stateProperty: 'fullDecal',
		filterTab: 'stylishShirt',
	},
}

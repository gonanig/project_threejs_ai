import React from 'react'
import { SketchPicker } from 'react-color'
import { useSnapshot } from 'valtio'

import state from '../store'

const ColorPicker = () => {
	const snap = useSnapshot(state)

	return (
		<div className='absolute left-full ml-3'>
			<SketchPicker
				color={snap.color}
				disableAlpha
				presetColors={[
					'#ABB378',
					'#2CCCE4',
					'#811C43',
					'#B83545',
					'#CEADFE',
					'#FDFCFA',
					'#FBE09C',
					'#EFBD4E',
					'#60C670',
					'#5F123D',
					'#FF8A65',
					'#726DE8',
				]}
				onChange={(color) => (state.color = color.hex)}
			/>
		</div>
	)
}

export default ColorPicker

import React from 'react'

import CustomButton from './CustomButton'

const AIPicker = ({ prompt, setPrompt, generatingImg, handleSubmit }) => {
	return (
		<div className='aipicker-container'>
			<textarea
				placeholder='Ask AI..'
				rows={5}
				value={prompt}
				onChange={(e) => setPrompt(e.target.value)}
				className='aipicker-textared'
			/>
			<div className='flex flex-wrap gap-3'>
				{generatingImg ? (
					<CustomButton
						type='outline'
						title='Asking Ai...'
						customStyles='text-xs'
					/>
				) : (
					<>
						<CustomButton
							type='outline'
							title='AI Logo'
							handleClick={() => handleSubmit(prompt, 'logo')}
							customStyles='text-xs'
						/>
						<CustomButton
							type='filled'
							title='AI Full'
							handleClick={() => handleSubmit(prompt, 'full')}
							customStyles='text-xs'
						/>
					</>
				)}
			</div>
		</div>
	)
}

export default AIPicker

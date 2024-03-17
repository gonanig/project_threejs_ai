import React, { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useSnapshot } from 'valtio'

import state from '../store'
import config from '../config/config'
import { download } from '../assets'
import { downloadCanvasToImage, reader } from '../config/helpers'
import { EditorTabs, FilterTabs, DecalTypes } from '../config/constants'
import { fadeAnimation, slideAnimation } from '../config/motion'
import {
	AIPicker,
	ColorPicker,
	CustomButton,
	FilePicker,
	Tab,
} from '../components'

const Customizer = () => {
	const snap = useSnapshot(state)

	const [file, setFile] = useState('')

	const [prompt, setPrompt] = useState('')
	const [generatingImage, setGeneratingImage] = useState(false)
	const [activeEditorTab, setActiveEditorTab] = useState('')
	const [activeFilterTab, setActiveFilterTab] = useState({
		logoShirt: true,
		stylishShirt: false,
	})

	// show tab content depend on the active tab
	const generateTabContent = () => {
		switch (activeEditorTab) {
			case 'colorpicker':
				return <ColorPicker />
			case 'filepicker':
				return <FilePicker file={file} setFile={setFile} readFile={readFile} />
			case 'aipicker':
				return (
					<AIPicker
						prompt={prompt}
						setPrompt={setPrompt}
						generatingImg={generatingImage}
						handleSubmit={handleSubmit}
					/>
				)
			default:
				return null
		}
	}
	const handleDecals = (type, result) => {
		const decalType = DecalTypes[type]
		state[decalType.stateProperty] = result
		if (!activeFilterTab[decalType.filterTab]) {
			handleActiiveFilterTab(decalType.filterTab)
		}
	}

	const handleSubmit = async (prompt, type) => {
		console.log(prompt)
		if (!prompt) return alert('Please enter a prompt')

		try {
			setGeneratingImage(true)
			const response = await fetch(config.backendUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ prompt }),
			})
			const data = await response.json()
			handleDecals(type, `data: image/png;base64,${data.photo}`)
		} catch (error) {
			alert(error)
		} finally {
			setGeneratingImage(false)
			setActiveEditorTab('')
		}
	}

	const handleActiiveFilterTab = (tabName) => {
		switch (tabName) {
			case 'logoShirt':
				state.isLogoTexture = !activeFilterTab[tabName]
				break
			case 'stylishShirt':
				state.isFullTexture = !activeFilterTab[tabName]
				break
			default:
				state.isFullTexture = false
				state.isLogoTexture = true
		}
		setActiveFilterTab((prevState) => {
			return {
				...prevState,
				[tabName]: !prevState[tabName],
			}
		})
	}

	const readFile = (type) => {
		reader(file).then((result) => {
			handleDecals(type, result)
			setActiveEditorTab('')
		})
	}

	return (
		<AnimatePresence>
			{!snap.intro && (
				<>
					<motion.div
						key='custom'
						className='absolute top-0 left-0 z-10'
						{...slideAnimation('left')}
					>
						<div className='flex items-center min-h-screen'>
							<div className='editortabs-container tabs'>
								{EditorTabs.map((tab) => (
									<Tab
										key={tab.name}
										tab={tab}
										handleClick={() => {
											setActiveEditorTab(tab.name)
										}}
									/>
								))}
								{generateTabContent()}
							</div>
						</div>
					</motion.div>
					<motion.div
						className='absolute z-10 top-5 right-5'
						{...fadeAnimation}
					>
						<CustomButton
							type='filled'
							title='Back'
							handleClick={() => (state.intro = true)}
							customStyles='w-fit px-4 py-2.5 font-bold text-sm '
						/>
					</motion.div>
					<motion.div
						className='filtertabs-container'
						{...slideAnimation('up')}
					>
						{FilterTabs.map((tab) => (
							<Tab
								key={tab.name}
								tab={tab}
								isFilterTab
								isActiveTab={activeFilterTab[tab.name]}
								handleClick={() => {
									handleActiiveFilterTab(tab.name)
								}}
							/>
						))}
						<Tab
							tab={{ name: 'Save and Download', icon: download }}
							handleClick={downloadCanvasToImage}
						>
							<img src={download} />
						</Tab>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	)
}

export default Customizer
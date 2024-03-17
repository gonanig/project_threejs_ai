import { motion, AnimatePresence } from 'framer-motion'
import { useSnapshot } from 'valtio'

import state from '../store'
import { CustomButton } from '../components'
import {
	headContainerAnimation,
	headContentAnimation,
	headTextAnimation,
	slideAnimation,
} from '../config/motion'

const Home = () => {
	const snap = useSnapshot(state)
	return (
		<AnimatePresence>
			{snap.intro && (
				<motion.section className='home' {...slideAnimation('left')}>
					<motion.header {...slideAnimation('down')}>
						<img
							src='./threejs.png'
							alt='logo'
							className='w-8 h-8 object-contain'
						/>
					</motion.header>

					<motion.div className='home-content' {...headContainerAnimation}>
						<motion.div {...headTextAnimation}>
							<h1 className='head-text'>
								UNLEASH <br className='xl:block hidden' />
								YOUR
								<br className='xl:block hidden' /> IDEA.
							</h1>
						</motion.div>
						<motion.div
							{...headContentAnimation}
							className='flex flex-col gap-5'
						>
							<p
								text-center
								className='max-w-md text-md font-normal text-gray-600 text-base'
							>
								Designing your high quality custom garment takes minutes.
								<strong> Who knows... </strong>
								<br className='xl:block hidden' />
								it could be the start of a custom fashion adventure that changes
								everything.
							</p>
							<CustomButton
								type='filled'
								title='Customize'
								handleClick={() => (state.intro = false)}
								customStyles='w-fit px-4 py-2.5 font-bold text-sm '
							/>
						</motion.div>
					</motion.div>
				</motion.section>
			)}
		</AnimatePresence>
	)
}

export default Home

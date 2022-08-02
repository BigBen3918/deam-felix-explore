import React from 'react'
import { copyToClipboard } from '../useStore'
import Icons from './Icons'

export default {
	Copy: ({text, title, round, big}: {text: string, title?: string, round?: boolean, big?: boolean})=>{
		const [active, setActive] = React.useState(false)

		const onCopy = () => {
			copyToClipboard(text)
			setActive(true)
			setTimeout(()=>setActive(false), 5000)
		}

		return (active ? (
			<span className='d-middle gray'>
				<Icons.Check size = {big ? 20 : 16} />
				<span className='ml'>Copied</span>
			</span>
		) : (
			<span className={`${!!round ? 'btn btn-icon' : 'd-middle'}  cmd`} onClick={onCopy} title={title}>
				<Icons.Copy />
			</span>
		))
	}
}
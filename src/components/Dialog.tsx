import React from 'react'

interface DialogProps {
	children?: any
	onClose: Function
}

const Dialog = ({children, onClose}: DialogProps) => {
	return (
		<div className="modal">
			<div className="modal-overlay"></div>
			<div className="modal-container">
				<div style={{ textAlign: 'right' }}>
					<a className="modal-close" onClick={() => onClose()}>&times;</a>
				</div>
				{children}
			</div>
		</div>
	)
}

export default Dialog
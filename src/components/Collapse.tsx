import React from "react";
import Icons from "./Icons";

interface CollapseStatus {
	isOpen:			boolean
}

interface CollapseProps {
	header:			any
	children:		any
	isOpen?:		boolean
}

const Collapse = ({ header, children, isOpen }: CollapseProps) => {
	const [status, setStatus] = React.useState<CollapseStatus>({
		isOpen:		isOpen ? true : false
	})

	const onOpen = () => setStatus({isOpen: !status.isOpen})

	return (
		<div className="panel m-b-2">
			<div className="panel-header flex justify-content-between" onClick={onOpen}>
				{header}
				{status.isOpen ? (<Icons.ArrowDown />) : (<Icons.ArrowRight />)}
			</div>
			{status.isOpen && (<div className="content">{children}</div>)}
		</div>
	)
}

export default Collapse;
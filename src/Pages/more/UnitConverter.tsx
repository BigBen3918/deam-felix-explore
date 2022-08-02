import React from "react"
import { Link } from "react-router-dom"
import { isNumber } from "util"
import Icons from "../../components/Icons"
import { config } from "../../useStore"

interface UnitInputProps {
	value:			number
	unit:			number
	onChange:		any
}

const unitInputFieldStyle = {
	display:			"flex",
	justifyContent:		"space-between",
	alignItems:			"center",
	marginBottom:		"5px",
	overflow:			"hidden",
	border: 			"1px solid var(--border)",
	borderRadius: 		"10px",
}

const copyBtnStyle = {
	borderRight:		"1px solid var(--border)",
	padding:			"10px 20px"
}

const unitInputStyle = {
	"flex":				"1",
	padding:			"10px"
}

const labelStyle = {
	borderLeft:			"1px solid var(--border)",
	width:				"100px",
	padding:			"10px 0px 15px 15px"
}

const getUnit = (n:number) => {
	switch(n) {
		case -6:
			return "Wei"
		case -5:
			return "KWei"
		case -4:
			return "MWei"
		case -3:
			return "GWei"
		case -2:
			return "Szabo"
		case -1:
			return "Finney"
		case 0:
			return "Ether"
		case 1:
			return "KEther"
		case 2:
			return "MEther"
		case 3:
			return "GEther"
		case 4:
			return "TEther"
	}
}

const UnitInput = ({
	value,
	unit,
	onChange
}:UnitInputProps) => {
	return (
		<div style={unitInputFieldStyle}>
			<div style={copyBtnStyle}><a href="#"><Icons.Copy /></a></div>
			<input type="text" style={unitInputStyle} value={value} onChange = {(e) => onChange(e, unit)} />
			<label style={labelStyle} className="gray">{getUnit(unit)} 10<sup>({unit})</sup></label>
		</div>
	)
}

interface UnitConverterStatus {
	price: number
}

const UnitConverter = () => {
	const [status, setStatus] = React.useState<UnitConverterStatus>({
		price: 1
	})

	const resetPrice = () => {
		setStatus({
			price: 0
		})
	}

	const onChange = (e, unit) => {
		if(!isNaN(Number(e.target.value))) {
			setStatus({ price: Number(e.target.value) * 10 ** unit })
		}
	}

	return (
		<div className="unit-converter">
			<section className="container">
				<h3>Unit Converter</h3>
				<p className="gray m-b-2">{config.symbol} is often used in different denominations of its currency, such as Wei for interacting with smart contracts and Gwei for calculating gas prices. Use our Unit Converter to esaily convert between them! For more info on unit conversion, read our <Link to="/deam-unit-converter">knowledge base article</Link>.</p>
				<div className="panel">
					<div className="text-align-right"><a href="#" onClick={resetPrice}>Reset</a></div>
					<div>
						{
							new Array(10).fill(0).map((i, k) => (
								<UnitInput key={k} value={status.price} unit={k * 3} onChange={onChange} />
							))
						}
					</div>
				</div>
			</section>
		</div>
	)
}

export default UnitConverter
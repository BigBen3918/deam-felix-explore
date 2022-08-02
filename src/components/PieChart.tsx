import React, { PureComponent, useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Sector, Legend, Tooltip, ResponsiveContainer } from 'recharts';

export interface FieldObject {
	name:               (i:any)=>string
	value:              (i:any)=>number
	color?:             string
}

// interface PieChartProps {
//     fields:             FieldObject
//     data:               Array<any>
//     isTooltip?:         boolean
// }

interface PieChartStatus {
	data:               Array<any>
	activeIndex:        number
}

const PieFormChart = ({
	fields,
	data,
	isTooltip=true,
	colors
}) => {
	const [status, setStatus] = useState<PieChartStatus>({
		data:           [],
		activeIndex:    0
	});

	const renderActiveShape = (props) => {
		// const RADIAN = Math.PI / 180;
		const { cx, cy, /* midAngle,  */innerRadius, outerRadius, startAngle, endAngle, fill } = props;
		// const sin = Math.sin(-RADIAN * midAngle);
		// const cos = Math.cos(-RADIAN * midAngle);
		// const sx = cx + (outerRadius + 10) * cos;
		// const sy = cy + (outerRadius + 10) * sin;
		// const mx = cx + (outerRadius + 30) * cos;
		// const my = cy + (outerRadius + 30) * sin;
		// const ex = mx + (cos >= 0 ? 1 : -1) * 22;
		// const ey = my;
		// const textAnchor = cos >= 0 ? 'start' : 'end';
	  
		return (
		  <g>
			<Sector
			  cx={cx}
			  cy={cy}
			  innerRadius={innerRadius}
			  outerRadius={outerRadius}
			  startAngle={startAngle}
			  endAngle={endAngle}
			  fill={fill}
			/>
			<Sector
			  cx={cx}
			  cy={cy}
			  startAngle={startAngle}
			  endAngle={endAngle}
			  innerRadius={outerRadius + 6}
			  outerRadius={outerRadius + 10}
			  fill={fill}
			/>
		  </g>
		);
	  };

	useEffect(()=>{
		let jsonData:FieldObject[] = [];
		data.map((i, k) => {
			jsonData.push({
				name:           fields.name(i),
				value:          fields.value(i),
				color:          colors[k]
			});
		})
		setStatus({...status, data: [...jsonData]});
	}, []); 

	const onPieEnter = (_, index) => {
		setStatus({
			...status,
			activeIndex: index,
		});
	};

	return (
		<ResponsiveContainer width="100%" height={400}>
			<PieChart width={400} height={400}>
				<Pie
					activeIndex={status.activeIndex}
					activeShape={renderActiveShape}
					dataKey="value"
					isAnimationActive={false}
					data={status.data}
					cx="50%"
					cy="50%"
					outerRadius={80}
					fill="#8884d8"
					label
					onMouseEnter={onPieEnter}
				>
					{status.data.map((i, k) => (
						<Cell key={`cell-${k}`} fill={i.color||"red"} />
					))}
				</Pie>
				{isTooltip && (<Tooltip />)}
			</PieChart>
		</ResponsiveContainer>
	);
}

export default PieFormChart
import React from 'react';
import './DescriptionTable.css'

function DescriptionTable({backgroundColor, study}) {
	return (
		<div style={{backgroundColor: backgroundColor}} className="description">
			<h3>{study.mechanism}</h3>
			<iframe width="420" height="315"
				src="https://www.youtube.com/watch?v=BtN-goy9VOY&ab_channel=Kurzgesagt%E2%80%93InaNutshell">
			</iframe>
		</div>
	)
}

export default DescriptionTable;
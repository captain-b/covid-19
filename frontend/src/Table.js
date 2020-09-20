import React from 'react';
import './Table.css'

function Table({countries}) {
	return (
		<div className="table">
			{
				countries.map(({country, cases}) => (
					<tr>
						<td>{country}</td>
						<td>{cases.today}</td>
					</tr>
				))
			}
		</div>
	)
}

export default Table;
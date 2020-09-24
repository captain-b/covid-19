import React from 'react';
import './Table.css'
import numeral from 'numeral';

function Table({countries}) {
	return (
		<div className="table">
			{
				countries.map(({country, cases, flag}) => (
					<tr>
						<td><img className="flag-img" src={flag} alt="Country Flag"/><div className="flag-name">{country}</div></td>
						<td><strong>{numeral(cases.today).format('0,0')}</strong></td>
					</tr>
				))
			}
		</div>
	)
}

export default Table;
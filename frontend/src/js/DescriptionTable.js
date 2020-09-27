import React from 'react';
import './../css/DescriptionTable.css'
import './../css/App.css';

function DescriptionTable({i, backgroundColor, study, isSelected, ...props}) {
	const sponsorsElement = study.sponsors.length > 1 ? <div className="description__header__titles_description2__sponsors"><div style={{color: 'black', display: 'inline'}}>Sponsors: </div>{study.sponsors.join(', ')}</div> : <div className="description__header__titles_description2__sponsors"><div style={{color: 'black', display: 'inline'}}>Sponsor: </div>{study.sponsors}</div> 
	const institutionsElement = study.institutions.length > 1 ? <div className="description__header__titles_description2__institutions"><div style={{color: 'black', display: 'inline'}}>Institutions: </div>{study.institutions.join(', ')}</div> : <div className="description__header__titles_description2__institutions"><div style={{color: 'black', display: 'inline'}}>Institution: </div>{study.institutions}</div> 

	return (
		<div style={{backgroundColor: backgroundColor}} className="description">
			<div className="description__header" onClick={props.onClick}>
				<div className="description__header__titles">
					<h3 className="header">{i + 1}. {study.mechanism}</h3>
					<img style={{width: '25px', height: '25px'}} className={`description__header__titles__toggle_button${isSelected ? '__selected' : ''}`} src="https://img.icons8.com/fluent-systems-regular/96/000000/low-importance.png"/>
				</div>
				<div className="separator__line"></div>
				<div className="description__header__titles_descriptions">
					<div  className="description__header__titles_description1">
						<div className="description__header__titles_description1__candidates"><div style={{color: 'black', display: 'inline'}}>Candidate:</div> {study.candidate}</div>
						<div className="description__header__titles_description1__phase"><div style={{color: 'black', display: 'inline'}}>Trial: </div>{study.trialPhase}</div>
					</div>
					<div  className="description__header__titles_description2">
						{sponsorsElement}
						{institutionsElement}
					</div>
				</div>
			</div>
			<div className={isSelected ? 'description__details__box__selected' : 'description__details__box'}>
				<div className="description__details__box__data">
					<div className="description__details_title">Details:</div>
					<div className="description__details">{study.details.replace('Background: ', '')}</div>
				</div>
			</div>
		</div>
	)
}

export default DescriptionTable;
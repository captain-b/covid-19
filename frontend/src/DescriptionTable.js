import React from 'react';
import './DescriptionTable.css'

function DescriptionTable({backgroundColor, study, isSelected, ...props}) {
	const sponsorsElement = study.sponsors.length > 1 ? <div className="description__header__titles_description2__sponsors">Sponsors: {study.sponsors.join(', ')}</div> : <div className="description__header__titles_description2__sponsors">Sponsor: {study.sponsors}</div> 
	const institutionsElement = study.institutions.length > 1 ? <div className="description__header__titles_description2__institutions">Institutions: {study.institutions.join(', ')}</div> : <div className="description__header__titles_description2__institutions">Institution: {study.institutions}</div> 

	return (
		<div style={{backgroundColor: backgroundColor}} className="description">
			<div className="description__header" onClick={props.onClick}>
				<div className="description__header__titles">
					<h3>{study.mechanism}</h3>
					<img className={`description__header__titles__toggle_button${isSelected ? '__selected' : ''}`} src="https://img.icons8.com/fluent-systems-regular/96/000000/low-importance.png"/>
				</div>
				<div className="separator__line"></div>
				<div className="description__header__titles_descriptions">
					<div  className="description__header__titles_description1">
						<div className="description__header__titles_description1__candidates">Candidate: {study.candidate}</div>
						<div className="description__header__titles_description1__phase">Trial: {study.trialPhase}</div>
					</div>
					<div  className="description__header__titles_description2">
						{sponsorsElement}
						{institutionsElement}
					</div>
				</div>
			</div>
			<div className={isSelected ? 'description__details__box__selected' : 'description__details__box'}>
				<div className="description__details_title">Details:</div>
				<div className="description__details">{study.details.replace('Background: ', '')}</div>
			</div>
		</div>
	)
}

export default DescriptionTable;
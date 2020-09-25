import React from 'react';
import './YouTubeTable.css'

function YouTubeTable({backgroundColor}) {
	return (
		<div style={{backgroundColor: backgroundColor}} className="youtube">
			<iframe style={{borderRadius: '8px'}}  width="100%" height="315" src="https://www.youtube-nocookie.com/embed/BtN-goy9VOY" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
		</div>
	)
}

export default YouTubeTable;
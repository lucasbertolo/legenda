import React from 'react';

const Gradient = (props) => {
	return(
			<div className='visual'>
					<span 
						id='gradient'
						style={{
							background: props.background, 
						}}
					>
					</span>
				</div>
	)	
}

export default Gradient;
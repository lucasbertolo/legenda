import React from 'react';
import LinhaCor from './LinhaCor';

const TabelaCores = (props) => {

		const lista = props.data.map((row, index) => {
				return (
					<div key={index}>
						<LinhaCor 
							nome={row.id} 
							background={row.gradient} 
							editColor={props.editColor} 
							deleteColor={props.deleteColor}
						/>
					</div>
				)
			})

		return(
			<div className='lista-cor'>
				{lista}
			</div>
		)		
}

export default TabelaCores;
import React from 'react';

const Buttons = (props) => {
	return(
		<div className='save'>
			<button onClick={props.onSubmit} id='btn-submit'>Salvar</button>
			<button onClick={props.handleContainer}>Cancelar</button>
		</div>
	)
}

export default Buttons;
import React from 'react';

const LinhaCor = (props) => {
	return(
		<div className='linha-cor'>
				<p className='lname'>{props.nome}</p>
				<div 
					className='legenda'
					style={{background: props.background}}
				>
				</div>
				<i id={props.nome}onClick={props.editColor} className="fa fa-edit icon"></i>
				<i id={props.nome} onClick={props.deleteColor} className="fa fa-trash icon"></i>
		</div>
	)
}

export default LinhaCor;

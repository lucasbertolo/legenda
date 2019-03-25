import React from 'react';


const Cores = (props) => {
		return(
			<div className='row-cor'>	
				<input 
					type='color' 
					name="color" 
					id={props.id} 
					onChange={props.setInputColor} 
					placeholder='Digite uma cor' 
					onClick={props.cleanInput}	
					value={props.background}
					style={{background: props.background}}				
				/>
				<span>
					<i className="fa fa-trash icon" onClick={props.deleteRow} id={props.id}></i>
				</span>
			</div>
		);		
}

export default Cores;
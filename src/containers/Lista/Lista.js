import React from 'react';
import TabelaCores from '../../components/TabelaCores';


class Lista extends React.Component{
	//Faz a lista na hora que o componente é montado
	componentDidMount(){
		this.props.fetchData();
	}

		render(){
			return(
				<div className='lista container' id={this.props.render}>
					<div className='titulo-cor'>
						<h3>Nome</h3>
						<h3>Pré-visualização</h3>
					</div>
					<TabelaCores 
						data={this.props.data}
						editColor={this.props.editColor}
						deleteColor={this.props.deleteColor}
					/>
					<div className='cadastro-btn'>
						<button onClick={this.props.addColor} id='cadastro-btn'>Cadastrar Gradiente</button>
					</div>
				</div>
			);
		}
}

export default Lista;

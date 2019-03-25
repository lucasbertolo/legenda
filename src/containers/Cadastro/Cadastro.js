import React, {Component} from 'react';
import Cores from '../../components/Cores';
import Gradient from '../../components/Gradient';
import Buttons from '../../components/Buttons';

class Cadastro extends Component{
	constructor(props){
		super(props);
	}

	//Inicia o gradiente com o state inicial
	componentDidMount(){
		this.setGradient();
	}

	//Adiciona nova linha de cor 
	addRow = () => {
			const {colorList} = this.props;

			const lastIndex = colorList.slice(-1);
			const id = lastIndex[0].id;					
			const n = id.slice(-1);						

			const btn = document.querySelector('#btn-add');

			const newID = `color${Number(n) + 1}`;

			if(newID === 'color10'){
				btn.disabled = true;
				this.props.handleMessage('Limite de cores excedido');  
				return;
			}

			colorList.push({cor: '#fff', id: newID}); 
			this.props.handleColorList(colorList)

		}

		//deleta Linha de cor
		deleteRow = (e) => {
			const row = e.target.id;
			const {colorList} = this.props;
			const index = colorList.findIndex(x => x.id === row);	

			colorList.splice(index,1); 

			this.props.handleColorList(colorList);
			this.setGradient();

		}

		//atualiza gradiente com as cores das linhas
	setGradient = () => {
		const {colorList} = this.props;

		const array = colorList.map((color) => {
			return color.cor
		})

		let string = 
		`
			linear-gradient(to right,
			${array.toString()}
			)
		`		
		this.props.handleGradient(string)

	}

	//atualiza background das linhas 
	setInputColor = (e) => {
		const input = e.target;
		const color = e.target.value;
		const {colorList} = this.props;		
		const index = colorList.findIndex(x => x.id === input.id); 

		colorList[index] = {cor: color, id: input.id}; 	

		this.props.handleColorList(colorList);
		
		this.setGradient();

	}
	render(){
		const {colorList, name, gradient, handleName} = this.props;
		const rows = colorList.map((row, index)=> {
			return(
				<div key={`color${index}`} id={`divcolor${index}`}>
					<Cores
						background={colorList[index].cor}
						id={colorList[index].id}
						setInputColor={this.setInputColor}
						deleteRow={this.deleteRow}
					/>					
				</div>
			)
		})
		return(
			<main className='container cadastro'>
				<div className='nome'>
					<input type='text' 
						placeholder='Nome *' 
						id='nome-cor' 
						value={name}
						onChange={handleName}
					/>
				</div>
				<Gradient 
					background={gradient}
				/>
				<div className='cores'>
					{rows}
					<div className='add'>
 						<button onClick={this.addRow} id='btn-add'>
 							<i className="fa fa-plus">&nbsp;&nbsp;Cor</i>
 						</button>
					</div>
				</div>				

				<Buttons 
					onSubmit={this.props.onSubmit} 
					handleContainer={this.props.handleContainer}
				/>

				<p className='message'>{this.props.message}</p>
			</main>
		)
	}
}

export default Cadastro;
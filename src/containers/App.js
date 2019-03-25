import React, { Component } from 'react';
import Lista from './Lista/Lista';
import Cadastro from './Cadastro/Cadastro';
import '../assets/main.css';


const initialState = {
		data: [],
		color: '',
		colorList: [{cor: '#fff', id:'color0'}, {cor: '#fff', id:'color1'}],
		name: '',
		gradient: '',
		message: '',
		container: true,
		mode: 'post',
		url: 'https://lbjsondb.herokuapp.com/cores',
}

class App extends Component {
	constructor(){
		super();
		this.state = initialState;
	}
	
	//Busca as cores cadastradas para fazer a lista
	fetchData = () =>{
		fetch('https://lbjsondb.herokuapp.com/cores')
			.then(resp => resp.json())
			.then(array => {
				this.setState({
					data: array
				});
			})
	}

	//Salva valores no db.json
	onSubmit = () => {  
      const {colorList,name,gradient,mode, url} = this.state;

      if(name.length === 0){
      	this.setState({message: 'Campo(s) vazio!'});
      } else{
	       fetch(url, {
	          method: mode,
	          headers: {'Content-Type': 'application/json'},
	          body: JSON.stringify({
	           	colorList: colorList,
	            gradient: gradient,
	            id: name,
	          })
	        })        
	          .catch(err => {
	            this.setState({message: 'ops, algo deu errado'});
	          });
	           this.setState({
	           	container: true,
				url: initialState.url
	           }) ; 

	           window.setTimeout(() =>{ this.fetchData() }, 1000);	
      }
    }

    //deleta cor no db.jsom
    deleteColor = (e) => {
	    const name = e.target.id;
		const {data} = this.state;
			if (window.confirm("Deseja deletar a cor?")) {
  				fetch(`https://lbjsondb.herokuapp.com/cores/${name}`, {
		          method: 'delete',
		          headers: {'Content-Type': 'application/json'}		 
	       		 })    
	          		.catch(err => {
	            		console.log('ops, algo deu errado');
	          		});

	         window.setTimeout(() =>{ this.fetchData() }, 1000);

			} else {
			  
			}
				       
    }

    //abre janela de cadastro de cor em branco
	addColor = () =>{
		this.setState({
			colorList: initialState.colorList,
			name: initialState.name,
			gradient: initialState.gradient,
			message: initialState.message,
			color: initialState.color,
			container: false,
			mode: 'post',
			url: initialState.url
		})

	}

	//abre janela de cor com dados anteriores
	editColor = (e) => {
		const name = e.target.id;
		const {data} = this.state;
		const index = data.findIndex(x => x.id === name);

		this.setState({
			colorList: data[index].colorList,
			name: data[index].id,
			gradient: data[index].gradient,
			container: false,
			mode: 'put',
			url: 'https://lbjsondb.herokuapp.com/cores/' + name
		})
	}
	//atualiza lista de cores
	handleColorList = (cl) => {
		this.setState({colorList: cl})
	}

	//atualiza mensagem
	handleMessage = (msg) => {
		this.setState({message: msg})
	}

	//atualiza gradiente string
	handleGradient = (string) => {
		this.setState({gradient: string})
	}

	//atualiza nome da cor
	handleName = (e) => {
		this.setState({name: e.target.value});
	}

	//reabre container com a lista
	handleContainer = (e) => {
		this.setState({
			container: true,
			url: initialState.url
		})
	}

	  render() {
	    return (
	      <div className="wrapper">

	        {this.state.container ?
	        			 <Lista 
	        	         	data={this.state.data}
	        	         	editColor={this.editColor}
	        	         	addColor={this.addColor}
	        	         	fetchData={this.fetchData}
	        	         	deleteColor={this.deleteColor}
	        	         />
	        	         :
	        	         <Cadastro 
	        	         	color={this.state.color}
	        	         	colorList={this.state.colorList}
	        	         	name={this.state.name}
	        	         	message={this.state.message}
	        	         	gradient={this.state.gradient}
	        	         	handleName={this.handleName}
	        	         	handleGradient={this.handleGradient}
	        	         	handleColorList={this.handleColorList}
	        	         	handleMessage={this.handleMessage}
	        	         	handleContainer={this.handleContainer}
	        	         	onSubmit={this.onSubmit}
	        	         />
	        }
	      </div>
	    );
	  }
}

export default App;

document.getElementById('formulario').addEventListener('submit', cadastraVeiculo);//Pegando os dados do furmulario, quando o botão 'submit' for iniciado, a funcão cadastraVeiculo vai se chamada.

	

function cadastraVeiculo(e){ 
	var modeloCarro = document.getElementById('modeloCarro').value;
	var placaCarro = document.getElementById('placaCarro').value;
	var time = new Date();

 	
	carro = {
		modelo: modeloCarro,
		placa: placaCarro,
		hora: time.getHours(),
		minutos: time.getMinutes() 
	}
 
	//localStorage.setItem('teste', 'Hello World');// armazenando os dados (Kay 'teste', value 'hello...')
	//localStorage.removeItem('teste'); // removendo o storage, passando a kay
	//console.log(localStorage.getItem('teste')); // imprimindo no console o valor
 	

	if(localStorage.getItem('patio2') === null)
	{
		var carros = [];
		carros.push(carro);
		localStorage.setItem('patio2', JSON.stringify(carros));// retornando como string (JSON.stringify)

	}else{
		var carros = JSON.parse(localStorage.getItem('patio2')); // retornando como array (JSON.prase)
		carros.push(carro); 
		if(validaDados() === false) return false;// valida dados
		localStorage.setItem('patio2', JSON.stringify(carros));

	} 
	document.getElementById('formulario').reset();
	mostraPatio(); 
	e.preventDefault();
}

function apagarVeiculo(placa){
	var carros = JSON.parse(localStorage.getItem('patio2'));
	for(var  i = 0; i < carros.length; i++)
	{
		if(carros[i].placa == placa)
		{
			carros.splice(i, 1);

		}
		localStorage.setItem('patio2', JSON.stringify(carros));
	}

	mostraPatio();
}

function mostraPatio(){
		var carros = JSON.parse(localStorage.getItem('patio2'));
		var carrosResultado = document.getElementById('resultados'); 
		carrosResultado.innerHTML = '';

		for(var i = 0; i < carros.length; i++){ // i igual a zero, enquanto (i) for menor que quantidade de carros, o (i) vai reseber + 1,(.length) conta o array.
			var modelo = carros[i].modelo;
			var placa = carros[i].placa;
			var hora = carros[i].hora;
			var minutos = carros[i].minutos;

			carrosResultado.innerHTML += '<tr><td>' + modelo +
										'</td><td>' + placa +
										'</td><td>' + hora + ':' +minutos +
										'</td><td> <button class="btn btn-danger" onclick="apagarVeiculo(\'' +placa +'\')">Finalizar</button></td>'+
										'</tr>';

		}
}

function validaDados(){
	var modeloCarro = document.getElementById('modeloCarro').value;
	var placaCarro = document.getElementById('placaCarro').value;

	if(!modeloCarro && !placaCarro)
	{
		alert("Por favor, preencha todos os campos");
		return false;
	}

	var carros = JSON.parse(localStorage.getItem('patio2'));
 	for(var i = 0; i < carros.length; i++)
 	{
 		if(placaCarro == carros[i].placa)
 		{
 			alert('Carro ja cadastrado !!'); 
 			return false;
 		}
 	}
}

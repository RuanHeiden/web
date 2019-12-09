document.getElementById('formularioPessoa').addEventListener('submit', cadastraPessoa); 

function cadastraPessoa(e)
{   
	var nomePessoa = document.getElementById('nomePessoa').value;
	var emailPessoa = document.getElementById('emailPessoa').value;
	var idadePessoa = document.getElementById('idadePessoa').value;
	var sexoPessoa = document.getElementById('sexoPessoa').value;
	var estadoPessoa = document.getElementById('estadoPessoa').value;

 	

	pessoa = {
		nome: nomePessoa,
		email: emailPessoa,
		idade: idadePessoa,
		sexo: sexoPessoa,
		estado: estadoPessoa
	} 


	if(localStorage.getItem('Pessoas') === null)
	{
		var pessoaAdicionada = [];
		pessoaAdicionada.push(pessoa);
		localStorage.setItem('Pessoas', JSON.stringify(pessoaAdicionada));// retornando como string (JSON.stringify)

	}else{
		var pessoaAdicionada = JSON.parse(localStorage.getItem('Pessoas')); // retornando como array (JSON.prase)
		pessoaAdicionada.push(pessoa); 
		if(validaCampos() === false) return false; 
		localStorage.setItem('Pessoas', JSON.stringify(pessoaAdicionada)); 
	} 
} 

function removePessoa(email)
{
		var pessoas = JSON.parse(localStorage.getItem('Pessoas')); 
		for(var i = 0; i < pessoas.length; i++)
		{ 
			if(pessoas[i].email == email){   
				pessoas.splice(i, 1); 
			} 
		localStorage.setItem('Pessoas', JSON.stringify(pessoas));

		}
	imprimiTabela();
} 
 
function imprimiTabela(){ 
	
	var pessoas = JSON.parse(localStorage.getItem('Pessoas'));
	var pessoasResultados = document.getElementById('resultados');
	pessoasResultados.innerHTML = '';

  
		for(var i = 0; i < pessoas.length; i++){
			var nome = pessoas[i].nome;
			var email = pessoas[i].email;
			var idade = pessoas[i].idade;
			var sexo = pessoas[i].sexo;
			var estado = pessoas[i].estado; 

			pessoasResultados.innerHTML += '<tr><td>' + nome +
											'</td><td>' + email +
											'</td><td>' + idade + 
											'</td><td>' + sexo + 
											'</td><td>' + estado +
											'</td><td> <button class="btn btn-danger" onclick="removePessoa(\'' + email +'\')">Excluir</button></td>'
											'</tr>';
		}
} 

function validaCampos(){

	var nomeVali = document.getElementById('nomePessoa').value;
	var emailVali = document.getElementById('emailPessoa').value;
	var idadeVali = document.getElementById('idadePessoa').value; 
	var sexoVali = document.getElementById('sexoPessoa').value;
	var estadoVali = document.getElementById('estadoPessoa').value;

	
	if(!nomeVali && !emailVali && !idadeVali && !estadoVali)
	{ 
		alert("Informe todos os dados !!");
		return false;
	}

 			console.log(emailVali);
	var pessoas = JSON.parse(localStorage.getItem('Pessoas'));

	for(var i = 0; i < pessoas.length; i++){ 
		if(emailVali == pessoas[i].email) 
		{
			alert("E-mail informado já foi cadastrado !!");
			return false;
		}
	} 
}

 
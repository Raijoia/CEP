// fetch faz a requisição, parâmetro obrigatório é o link da API
// then(então) faz a conversão dos dados das respostas(promises), colocando a reposta como um arquivo JSON, retornando as respostas como um object
// segundo then usado para imprimir o resultado
// catch(pegue), usamos o catch para se caso der algum erro no cep, pegar o erro e mostrar
// finally, independente da resposta, irá imprimir oque for colocado nele 
// var consultaCep = fetch('https://viacep.com.br/ws/01001000/json/')
// .then(resposta => resposta.json())
// .then(r => { 
//   if (r.erro) {
//     // arrumando a mensagem de erro
//     throw Error('Esse cep não existe')
//   } else
//   console.log(r)
//   })
// .catch(erro => console.log(erro)) 
// .finally(mensagem => console.log('Processamento concluído'));
// console.log(consultaCep)
// let ceps = ['01001000', '01001001', '02132110']
// let conj = ceps.map(valores => buscaEndereco(valores)) // retorna como promise
// Promise.all(conj).then(respostas => console.log(respostas)) // converte todas as promises

// ------------------------------------------------------------------------------------------------

// Fazendo uma função assíncrona
// await espera uma promessa para ser executado
async function buscaEndereco(cep) {
  var mensagem = document.getElementById("erro");
  mensagem.innerHTML = ''
  // tente isso
  try {
    var consultaCep = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    var consultaConvert = await consultaCep.json();
    // se der erro, colocar essa mensagem no erro
    if (consultaConvert.erro) {
      throw Error('CEP não existente!');
    }

    // pegando no html
    var cidade = document.getElementById('cidade');
    var logradouro = document.getElementById('endereco');
    var estado = document.getElementById('estado');
    var bairro = document.getElementById('bairro');

    // mudando o valor para o resultado da API
    cidade.value = consultaConvert.localidade
    logradouro.value = consultaConvert.logradouro
    estado.value = consultaConvert.uf
    bairro.value = consultaConvert.bairro

    console.log(consultaConvert);
    return consultaConvert
  } catch (erro) { // caso der erro, pega o erro
    mensagem.innerHTML = `<p>O CEP inserido é inválido</p>`
    console.log(erro)
  }
}

var cep = document.getElementById('cep')
// focusout => quando a pessoa tirar o focu do input de cep(clicar fora do input)
cep.addEventListener('focusout', () => buscaEndereco(cep.value));


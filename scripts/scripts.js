/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getList = async () => {
  let url = 'http://127.0.0.1:5000/get_produtos';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.produtos.forEach(item => insertList(item.codigo, item.nome, item.tipo, item.valor, item.descricao))
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Chamada da função para carregamento inicial dos dados
  --------------------------------------------------------------------------------------
*/
getList()


/*
  --------------------------------------------------------------------------------------
  Função para colocar um item na lista do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/
const postItem = async (inputProduto, inputTipo, inputValor, inputDescricao) => {
  const formData = new FormData();
  formData.append('nome', inputProduto);
  formData.append('tipo', inputTipo);
  formData.append('valor', inputValor);
  formData.append('descricao', inputDescricao);

  let url = 'http://127.0.0.1:5000/add_produto';
  fetch(url, {
    method: 'post',
    body: formData
  })
    .then((response) => response.json())
    .then((data) => {
      insertList(data.codigo, data.nome, data.tipo, data.valor, data.descricao)
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}


/*
  --------------------------------------------------------------------------------------
  Função para criar um botão close para cada item da lista
  --------------------------------------------------------------------------------------
*/
const insertButton = (parent) => {
  let span = document.createElement("button");
  let txt = document.createTextNode("Delete");
  span.className = "close btn btn-danger";
  span.appendChild(txt);
  parent.appendChild(span);
}


/*
  --------------------------------------------------------------------------------------
  Função para remover um item da lista de acordo com o click no botão close
  --------------------------------------------------------------------------------------
*/
const removeElement = () => {
  let close = document.getElementsByClassName("close");
  // var table = document.getElementById('myTable');
  let i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const nomeItem = div.getElementsByTagName('td')[0].innerHTML
      if (confirm("Você tem certeza?")) {
        div.remove()
        deleteItem(nomeItem)
        alert("Removido!")
      }
    }
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para deletar um item da lista do servidor via requisição DELETE
  --------------------------------------------------------------------------------------
*/
const deleteItem = (item) => {
  console.log(item)
  let url = 'http://127.0.0.1:5000/del_produto?codigo=' + item;
  fetch(url, {
    method: 'delete'
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para adicionar um novo item com nome, quantidade e valor 
  --------------------------------------------------------------------------------------
*/
const newItem = () => {
  let nomeProduto = document.getElementById("nomeProduto").value;
  let tipoProduto = document.getElementById("tipoProduto").value;
  let valorProduto = document.getElementById("valorProduto").value;
  let descricaoProduto = document.getElementById("descricaoProduto").value;

  if (nomeProduto === '') {
    alert("Forneça o nome do produto");
  } else if (tipoProduto === 'Selecione') {
    alert("Forneça o tipo do produto");
  } else if(isNaN(valorProduto) || valorProduto < 1){
    alert("Forneça um valor");
  }else {
    // insertList(nomeProduto, tipoProduto, valor, descricao)
    postItem(nomeProduto, tipoProduto, valorProduto, descricaoProduto)
    alert("Item adicionado!");
  }
}


/*
  --------------------------------------------------------------------------------------
  Função para inserir items na lista apresentada
  --------------------------------------------------------------------------------------
*/
const insertList = (codigo, nome, tipo, valor, descricao) => {
  var item = [codigo, nome, tipo, valor, descricao]
  var table = document.getElementById('tableBody');
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
  }
  insertButton(row.insertCell(-1))
  document.getElementById("nomeProduto").value = "";
  document.getElementById("tipoProduto").value = "Selecione";
  document.getElementById("valorProduto").value = "";
  document.getElementById("descricaoProduto").value = "";

  removeElement()
}
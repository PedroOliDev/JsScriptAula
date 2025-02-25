let total = 0;

document.getElementById("cep").addEventListener("blur", function() {
    let cep = this.value.replace(/\D/g, ""); // Remove caracteres não numéricos

    if (cep.length !== 8) {
        alert("CEP inválido! Digite um CEP com 8 números.");
        return;
    }

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(data => {
            if (data.erro) {
                alert("CEP não encontrado!");
                return;
            }

            // Preenche os dados na tela
            document.getElementById("endereco").textContent = `Rua: ${data.logradouro || "-"}`;
            document.getElementById("bairro").textContent = `Bairro: ${data.bairro || "-"}`;
            document.getElementById("cidade").textContent = `Cidade: ${data.localidade || "-"}`;
            document.getElementById("estado").textContent = `Estado: ${data.uf || "-"}`;

            // Obtém a alíquota de ICMS com base no estado
            let aliquotasICMS = {
                "SP": 18, "RJ": 20, "MG": 18, "ES": 17, "RS": 17,
                "PR": 18, "SC": 17, "BA": 19, "PE": 18, "CE": 18
            };
            let aliquota = aliquotasICMS[data.uf] || 17; // Padrão 17% se não estiver listado
            document.getElementById("icms").textContent = `ICMS: ${aliquota}%`;

            document.getElementById("infocep").style.display = 'block';
            document.getElementById("compra").dataset.icms = aliquota;
        })

});


function limparCarrinho() {
    const carrinho = document.querySelector('.carrinho ul');
    carrinho.innerHTML = '';
    total = 0;
    document.getElementById('totalcarrinho').textContent = total.toFixed(2);
}

function adicionarItem(nome, preco) {
    const carrinho = document.querySelector('.carrinho ul');
    const novoItem = document.createElement('li');
    novoItem.textContent = `${nome} - R$ ${preco}`;
    carrinho.appendChild(novoItem);

    total += preco;
    document.getElementById('totalcarrinho').textContent = total.toFixed(2);
}

let interval;

function finalizarCompra() {

    document.getElementById('formulariocompra').style.display = 'block';
    clearInterval(interval);

    if (total === 0 || isNaN(total)) {
        alert('Adicione itens ao carrinho antes de finalizar a compra!');
        return; }
    if (validarConta() == false) {
        return;
    }
    else {
    if (total > 0) {
        iniciarProgresso();

    }

}

function iniciarProgresso() {

    
    
    const valor1 = parseFloat(document.getElementById('preco1').value);
    const valor2 = parseFloat(document.getElementById('preco2').value);
    const valor3 = parseFloat(document.getElementById('preco3').value);

    
    const totalProgress = valor3 - valor1; 

    if (isNaN ( valor2 <= valor1) || (valor3 <= valor1)) {
        alert('Por favor, insira valores válidos onde Preço 2 ou 3 seja maior que Valor 1.');
        return;
        }

    const progressBar = document.getElementById('progress-bar');
    progressBar.style.display = 'block'; 
    let atual = 0; 

    
    progressBar.style.width = '0%';
    progressBar.textContent = '0%';

    interval = setInterval(() => {
        
        atual += totalProgress / 100; 

        if (atual >= totalProgress) {
            atual = totalProgress;
            clearInterval(interval); 
            alert('Compra finalizada com sucesso!');
        }

        
        const percent = ((atual / totalProgress) * 100).toFixed(2);

        
        progressBar.style.width = percent + '%';
        progressBar.textContent = percent + '%';
    }, 50);
}
}

function validarConta() {
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const numero = document.getElementById('numero').value;
    const cep = document.getElementById('cep').value;
    
    if (nome === '' || email === '' || numero === '' || cep === '') {
        alert('Preencha todos os campos para criar sua conta');
        return false;
    }
    
    return true;
}

document.getElementById("compra").addEventListener("click", function() {
    let valorBase = total;
    let aliquota = parseFloat(this.dataset.icms) || 17; // Padrão 17% caso não tenha sido carregado
    let valorFinal = valorBase + (valorBase * (aliquota / 100));
    
    document.getElementById("totalcarrinho").textContent = `${valorFinal.toFixed(2)}`;
});

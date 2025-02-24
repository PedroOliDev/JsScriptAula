let total = 0;

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
    if (total === 0) {
        alert('Adicione itens ao carrinho antes de finalizar a compra!');
        return;
    } else {
        iniciarProgresso();
        
    }
}

function iniciarProgresso() {
    clearInterval(interval);
    
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


                // Adicione o código JavaScript para adicionar itens ao carrinho e calcular o total aqui
                let total = 0

                function limparCarrinho() {
                    const carrinho = document.querySelector('.carrinho ul')
                    carrinho.innerHTML = ''
                    total = 0
                    document.getElementById('totalcarrinho').textContent = total.toFixed(2)
                }


                function adicionarItem(nome, preco) {
                    const carrinho = document.querySelector('.carrinho ul')
                    const novoItem = document.createElement('li')
                    novoItem.textContent = `${nome} - R$ ${preco}`
                    carrinho.appendChild(novoItem)

                    total += preco
                    document.getElementById('totalcarrinho').textContent = total.toFixed(2)
                }

                function finalizarCompra() {
                    if (total === 0) {
                        alert('Adicione itens ao carrinho antes de finalizar a compra!')
                        return
                    }
                    else {
                        alert('Compra finalizada com sucesso!')
                    }
                
                }

        
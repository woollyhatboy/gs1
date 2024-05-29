document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('formulario-viagem');
    const listaViagens = document.getElementById('lista-viagens');
    const buscaInput = document.getElementById('busca');
    
    formulario.addEventListener('submit', (event) => {
        event.preventDefault();
        const nomeViagem = document.getElementById('nome-viagem').value;
        const destino = document.getElementById('destino').value;
        const data = document.getElementById('data').value;
        const descricao = document.getElementById('descricao').value;
        const valor = document.getElementById('valor').value;

        const viagem = {
            id: Date.now(),
            nomeViagem,
            destino,
            data,
            descricao,
            valor
        };

        salvarViagem(viagem);
        exibirViagens();
        formulario.reset();
    });

    buscaInput.addEventListener('input', exibirViagens);

    function salvarViagem(viagem) {
        const viagens = obterViagens();
        viagens.push(viagem);
        localStorage.setItem('viagens', JSON.stringify(viagens));
    }

    function obterViagens() {
        const viagens = localStorage.getItem('viagens');
        return viagens ? JSON.parse(viagens) : [];
    }

    function exibirViagens() {
        const viagens = obterViagens();
        const termoBusca = buscaInput.value.toLowerCase();
        listaViagens.innerHTML = '';

        viagens.filter(viagem => viagem.nomeViagem.toLowerCase().includes(termoBusca))
               .forEach(viagem => {
                    const viagemItem = document.createElement('div');
                    viagemItem.classList.add('viagem-item');
                    viagemItem.innerHTML = `
                        <h3>${viagem.nomeViagem}</h3>
                        <p><strong>Destino:</strong> ${viagem.destino}</p>
                        <p><strong>Data:</strong> ${viagem.data}</p>
                        <p><strong>Descrição:</strong> ${viagem.descricao}</p>
                        <p><strong>Valor:</strong> R$ ${viagem.valor}</p>
                        <p><strong>Doação:</strong> R$ ${(viagem.valor * 0.20).toFixed(2)} será doado para a preservação dos oceanos</p>
                        <button onclick="deletarViagem(${viagem.id})">Excluir</button>
                    `;
                    listaViagens.appendChild(viagemItem);
               });
    }

    window.deletarViagem = function(id) {
        let viagens = obterViagens();
        viagens = viagens.filter(viagem => viagem.id !== id);
        localStorage.setItem('viagens', JSON.stringify(viagens));
        exibirViagens();
    };

    exibirViagens();

    
    document.addEventListener('click', (event) => {
        const drop = document.createElement('div');
        drop.className = 'water-drop';
        drop.style.left = `${event.clientX}px`;
        drop.style.top = `${event.clientY}px`;
        document.body.appendChild(drop);

        setTimeout(() => {
            drop.remove();
        }, 600);
    });
});


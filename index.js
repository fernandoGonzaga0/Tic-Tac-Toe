// Constantes para os elementos do DOM
const button_start = document.getElementById('button-start');
const current_player = document.getElementById('current-player');
const buttons = document.querySelectorAll('.board-button');

// Variáveis globais
let first_player = '';
let second_player = '';
let turno = 0; // Controla o turno (0 para Jogador 1, 1 para Jogador 2)
let tabuleiro = ['', '', '', '', '', '', '', '', '']; // Array para representar o tabuleiro

// Função para adicionar 'X' ou 'O' ao botão clicado
function jogar(ev) {
    const botaoClicado = ev.currentTarget;
    const indice = Array.from(buttons).indexOf(botaoClicado); // Obtém o índice do botão clicado

    // Verifica se o botão já foi clicado
    if (tabuleiro[indice] !== '') {
        alert('Este botão já foi clicado!');
        return;
    }

    // Define o símbolo ('X' ou 'O') com base no turno
    const simbolo = turno % 2 === 0 ? 'X' : 'O';
    botaoClicado.innerText = simbolo;
    tabuleiro[indice] = simbolo; // Atualiza o array tabuleiro

    // Verifica se há um vencedor
    if (verificarVitoria(simbolo)) {
        alert(`Jogador ${simbolo === 'X' ? first_player : second_player} venceu!`);
        reiniciarJogo();
        return;
    }

    // Verifica se houve empate
    if (turno === 8) {
        alert('Empate!');
        reiniciarJogo();
        return;
    }

    // Alterna o turno
    turno++;
    current_player.value = turno % 2 === 0 ? first_player : second_player;
}

// Função para verificar vitória
function verificarVitoria(simbolo) {
    const combinacoesVitoria = [
        [0, 1, 2], // Linha 1
        [3, 4, 5], // Linha 2
        [6, 7, 8], // Linha 3
        [0, 3, 6], // Coluna 1
        [1, 4, 7], // Coluna 2
        [2, 5, 8], // Coluna 3
        [0, 4, 8], // Diagonal 1
        [2, 4, 6]  // Diagonal 2
    ];

    for (const combinacao of combinacoesVitoria) {
        const [a, b, c] = combinacao;
        if (tabuleiro[a] === simbolo && tabuleiro[b] === simbolo && tabuleiro[c] === simbolo) {
            return true; // Há um vencedor
        }
    }

    return false; // Ninguém venceu ainda
}

// Função para reiniciar o jogo
function reiniciarJogo() {
    tabuleiro = ['', '', '', '', '', '', '', '', '']; // Limpa o tabuleiro
    turno = 0; // Reinicia o turno
    buttons.forEach(botao => {
        botao.innerText = ''; // Limpa o texto dos botões
    });
    current_player.value = first_player; // Define o jogador atual como o primeiro jogador
}

// Adiciona o evento de clique a cada botão
buttons.forEach(botao => {
    botao.addEventListener('click', jogar);
});

// Função para iniciar o jogo
function tic_tac_toe() {
    first_player = document.getElementById('first-player').value;
    second_player = document.getElementById('second-player').value;

    // Validação de que nenhum dos inputs está vazio
    if (first_player === '' || second_player === '') {
        alert('Insira os dois jogadores!');
        return;
    }

    alert('Jogo começando...');
    current_player.value = first_player; // Define o jogador atual como o primeiro jogador
}

// Adiciona o evento de clique ao botão "START"
button_start.addEventListener('click', tic_tac_toe);
import React, { useState } from 'react';
import './App.css'; // CSS atualizado
import coche from './carro.jpeg'; // Importa a imagem do carro
import cabra from './cabra.png'; // Importa a imagem da cabra


// Componente para representar uma porta
const Door = ({ number, onClick, isSelected, isDisabled, isOpen, isDimmed, showButton, buttonText, onButtonClick, image }) => {
  const doorClass = `door ${isSelected ? 'door-selected' : ''} ${isDimmed ? 'door-dimmed' : ''}`;


  return (
    <div className="door-container">
      <div className={`door-frame ${isOpen ? 'door-revealed' : ''}`}>
        {isOpen ? (
          <div className="door-open">
            <img src={image} alt="Conteúdo da porta" className="treasure-image" />
          </div>
        ) : (
          <div className={doorClass} onClick={isDisabled ? null : onClick}>
            {!isOpen && showButton && (
              <button className="choice-button" onClick={onButtonClick}>
                {buttonText}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};


// Função principal da aplicação
function App() {
  // Estado inicial para o índice da porta que contém o prêmio
  const [tesouroIndex, setTesouroIndex] = useState(Math.floor(Math.random() * 3));
  // Estado para a porta selecionada pelo usuário
  const [portaSelecionada, setPortaSelecionada] = useState(null);
  // Estado que indica se o jogo acabou
  const [jogoAcabou, setJogoAcabou] = useState(false);
  // Estado que indica se todas as portas foram reveladas
  const [portasReveladas, setPortasReveladas] = useState(false);
  // Estado para a porta alternativa oferecida pela aplicação
  const [portaAlternativa, setPortaAlternativa] = useState(null);
  // Estado que controla se o usuário pode trocar a escolha
  const [podeTrocar, setPodeTrocar] = useState(false);
  // Contagem de vitórias
  const [contagemVitorias, setContagemVitorias] = useState(0);
  // Contagem de derrotas
  const [contagemDerrotas, setContagemDerrotas] = useState(0);
  // Estado para a escolha final do usuário
  const [escolhaFinal, setEscolhaFinal] = useState(null);
  // Estado para a porta revelada pela aplicação
  const [portaRevelada, setPortaRevelada] = useState(null);
  // Estado para saber se a porta foi aberta
  const [portaAberta, setPortaAberta] = useState(false);
  // Estado para a porta final selecionada
  const [portaSelecionadaFinal, setPortaSelecionadaFinal] = useState(null);
  // Novo estado para a porta descartada
  const [portaDescartada, setPortaDescartada] = useState(null);


  // Calcula a porcentagem de vitórias
  const totalJogos = contagemVitorias + contagemDerrotas;
  const porcentagemVitorias = totalJogos > 0 ? ((contagemVitorias / totalJogos) * 100).toFixed(2) : 0;


  // Função chamada ao clicar em uma porta
  const handleDoorClick = (index) => {
    if (!jogoAcabou && portaSelecionada === null) {
      setPortaSelecionada(index);


      if (index === tesouroIndex) {
        // Se a porta selecionada contém o prêmio, revela uma porta aleatória que não foi escolhida
        const outrasPortas = [...Array(3).keys()].filter(i => i !== index);
        const portaAleatoria = outrasPortas[Math.floor(Math.random() * outrasPortas.length)];
        setPortaAlternativa(portaAleatoria);
        setPortaRevelada(outrasPortas.find(i => i !== portaAleatoria));
        setPortaAberta(true);
      } else {
        // Se a porta selecionada não contém o prêmio, revela a porta que não foi escolhida e não é a porta com o prêmio
        setPortaAlternativa(tesouroIndex);
        setPortaRevelada([...Array(3).keys()].find(i => i !== index && i !== tesouroIndex));
        setPortaAberta(true);
      }


      setPodeTrocar(true);
    }
  };


  // Função chamada para confirmar a decisão do usuário (trocar ou manter a escolha)
  const handleDecision = (trocar) => {
    const escolha = trocar ? portaAlternativa : portaSelecionada;
    setEscolhaFinal(escolha);
    setPortaSelecionadaFinal(escolha); // Estabelece a porta selecionada final
    setPortaDescartada(trocar ? portaSelecionada : portaAlternativa); // Define a porta descartada
    setJogoAcabou(true);


    if (escolha === tesouroIndex) {
      setContagemVitorias(contagemVitorias + 1);
    } else {
      setContagemDerrotas(contagemDerrotas + 1);
    }


    // Revela todas as portas no final do jogo
    setPortasReveladas(true);
  };


  // Função para reiniciar o jogo
  const resetGame = () => {
    setPortaSelecionada(null);
    setPortaSelecionadaFinal(null); // Reinicia a porta selecionada final
    setJogoAcabou(false);
    setPortasReveladas(false);
    setPortaAlternativa(null);
    setPodeTrocar(false);
    setTesouroIndex(Math.floor(Math.random() * 3));
    setEscolhaFinal(null);
    setPortaRevelada(null);
    setPortaAberta(false);
    setPortaDescartada(null); // Reinicia a porta descartada
  };


  return (
    <div className="app">
      <h1>Jogo das 3 Portas</h1>
      <h2>Detrás de umha destas portas há um esplêndido carro, e detrás das outras duas... um par de cabras.</h2>
      <h2>Escolhe umha, e das restantes duas, vamos descartar umha que contenha umha cabra. Entom poderás mudar a tua aposta final, se queres.</h2>
      <div className="doors">
        {[...Array(3)].map((_, index) => (
          <Door
            key={index}
            number={index + 1}
            onClick={() => handleDoorClick(index)}
            isSelected={index === portaSelecionada || index === portaSelecionadaFinal} // Marca a porta selecionada final
            isOpen={portasReveladas && (index === tesouroIndex || index === portaRevelada) || (index === portaRevelada && portaAberta)}
            isDisabled={jogoAcabou || podeTrocar}
            isDimmed={podeTrocar && index !== portaSelecionada && index !== portaAlternativa && index !== portaDescartada} // Desativa a porta descartada
            showButton={podeTrocar && (index === portaSelecionada || index === portaAlternativa)}
            buttonText={index === portaSelecionada ? "Manter escolha" : "Trocar de porta"}
            onButtonClick={() => handleDecision(index === portaAlternativa)}
            image={index === tesouroIndex ? coche : (index === portaRevelada || index === portaDescartada ? cabra : cabra)} // Exibe a imagem do carro ou da cabra conforme o estado
          />
        ))}
      </div>


      {jogoAcabou && (
        <div className="result">
          {escolhaFinal === tesouroIndex ? 'Parabéns, ganhache o carro!' : 'Conforma-te com umha cabra...'}
        </div>
      )}


      {jogoAcabou && (
        <button className="reset-button" onClick={resetGame}>
          Jogar novamente
        </button>
      )}


      <div className="scoreboard">
        <p>Partidas jogadas: {contagemVitorias + contagemDerrotas}</p>
        <p>Vitórias: {contagemVitorias}</p>
        <p>Porcentagem de Vitórias: {porcentagemVitorias}%</p>
      </div>
      <div className="footer">
        <p className="footer-text">
          Este jogo testa o <strong><a href="https://pt.wikipedia.org/wiki/Problema_de_Monty_Hall" target="_blank" rel="noopener noreferrer">problema de Monty Hall</a></strong>. Joga várias vezes usando a mesma estratégia para verificar se os resultados coincidem com a teoria de probabilidades.
        </p>
        <p className="footer-text">
          <strong>Resultados esperados:</strong><br />
          Se  <strong> sempre mantés a porta</strong>, ganharás <strong>33%</strong> das vezes.<br />
          Se  <strong> sempre trocas a porta</strong>, ganharás <strong>67%</strong> das vezes.
        </p>
      </div>
    </div>
  );
}


export default App;
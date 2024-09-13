// App.js
import React, { useState } from 'react';
import './App.css'; // CSS atualizado
import coche from './carro.jpeg'; // Importa a imagem do carro
import cabra from './cabra.png'; // Importa a imagem da cabra

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

function App() {
  const [tesouroIndex, setTesouroIndex] = useState(Math.floor(Math.random() * 3));
  const [portaSelecionada, setPortaSelecionada] = useState(null);
  const [jogoAcabou, setJogoAcabou] = useState(false);
  const [portasReveladas, setPortasReveladas] = useState(false);
  const [portaAlternativa, setPortaAlternativa] = useState(null);
  const [podeTrocar, setPodeTrocar] = useState(false);
  const [contagemVitorias, setContagemVitorias] = useState(0);
  const [contagemDerrotas, setContagemDerrotas] = useState(0);
  const [escolhaFinal, setEscolhaFinal] = useState(null);
  const [portaRevelada, setPortaRevelada] = useState(null);
  const [portaAberta, setPortaAberta] = useState(false); 

  const totalJogos = contagemVitorias + contagemDerrotas;
  const porcentagemVitorias = totalJogos > 0 ? ((contagemVitorias / totalJogos) * 100).toFixed(2) : 0;

  const handleDoorClick = (index) => {
    if (!jogoAcabou && portaSelecionada === null) {
      setPortaSelecionada(index);

      // Determinar cuál puerta se revelará inmediatamente (ni seleccionada ni ofrecida)
      if (index === tesouroIndex) {
        const outrasPortas = [...Array(3).keys()].filter(i => i !== index);
        const portaAleatoria = outrasPortas[Math.floor(Math.random() * outrasPortas.length)];
        setPortaAlternativa(portaAleatoria);
        // Revelar la otra puerta inmediatamente
        setPortaRevelada(outrasPortas.find(i => i !== portaAleatoria));
        setPortaAberta(true);
      } else {
        setPortaAlternativa(tesouroIndex);
        // Revelar la puerta descartada inmediatamente
        setPortaRevelada([...Array(3).keys()].find(i => i !== index && i !== tesouroIndex));
        setPortaAberta(true);
      }

      setPodeTrocar(true);
    }
  };

  const handleDecision = (trocar) => {
    const escolha = trocar ? portaAlternativa : portaSelecionada;
    setEscolhaFinal(escolha);
    setJogoAcabou(true);

    if (escolha === tesouroIndex) {
      setContagemVitorias(contagemVitorias + 1);
    } else {
      setContagemDerrotas(contagemDerrotas + 1);
    }

    // Revelar todas as portas no final
    setPortasReveladas(true);
  };

  const resetGame = () => {
    setPortaSelecionada(null);
    setJogoAcabou(false);
    setPortasReveladas(false);
    setPortaAlternativa(null);
    setPodeTrocar(false);
    setTesouroIndex(Math.floor(Math.random() * 3));
    setEscolhaFinal(null);
    setPortaRevelada(null);
    setPortaAberta(false); // Reiniciar el estado de la puerta descartada
  };

  return (
    <div className="app">
      <h1>Jogo das 3 Portas</h1>
      <h3>Detrás de umha destas portas há um esplêndido carro, e detrás das outras duas... um par de cabras.</h3>
      <h3>Escolhe umha, e das restantes duas, vamos descartar umha que contenha umha cabra. Entom poderás mudar a tua aposta final, se queres.</h3>
      <div className="doors">
        {[...Array(3)].map((_, index) => (
          <Door
            key={index}
            number={index + 1}
            onClick={() => handleDoorClick(index)}
            isSelected={portaSelecionada === index}
            isOpen={portasReveladas && (index === tesouroIndex || index === portaRevelada) || (index === portaRevelada && portaAberta)} // Revelar puerta descartada inmediatamente
            isDisabled={jogoAcabou || podeTrocar}
            isDimmed={podeTrocar && index !== portaSelecionada && index !== portaAlternativa}
            showButton={podeTrocar && (index === portaSelecionada || index === portaAlternativa)}
            buttonText={index === portaSelecionada ? "Manter escolha" : "Trocar de porta"}
            onButtonClick={() => handleDecision(index === portaAlternativa)}
            image={index === portaRevelada || index !== tesouroIndex ? cabra : coche} // Mostrar cabra si es revelada
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
